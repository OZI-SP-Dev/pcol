import { spPCOL } from "src/api/PCOL/usePCOL";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { subWebContext } from "src/api/SPWebContext";
import { useState } from "react";

interface SortParams {
  sortColumn: string | number | undefined;
  sortDirection: "ascending" | "descending";
}

const defaultSortParams: SortParams = {
  sortColumn: "Created",
  sortDirection: "ascending",
};

export interface PCOLFilter {
  column: string;
  filter: string | Date | number;
  modifier?: string;
  queryString: string;
}

const PagedPCOLs = z.array(
  spPCOL.pick({
    Id: true,
    Title: true,
    Modified: true,
    Subject: true,
    Contract: true,
    Stage: true,
  })
);

type PagedPCOLs = z.infer<typeof PagedPCOLs>;
const PAGESIZE = 10;

export interface PagedResult {
  items: PagedPCOLs;
  hasNextPage: boolean;
}

export const usePagedPCOLs = (
  subSite: string,
  page = 0,
  sortParams = defaultSortParams,
  filterParams: PCOLFilter[],
  allItems = false
) => {
  const queryClient = useQueryClient();

  // This holds the iterator object, so we can iterate as we reach a new page
  const [iterator, setIterator] = useState<AsyncIterator<spPCOL[], void>>();

  return useQuery({
    queryKey: [
      "paged-PCOLs",
      subSite,
      sortParams,
      filterParams,
      page,
      allItems,
    ],
    queryFn: async () => {
      // If we're at page 0 then query SharePoint
      if (page === 0) {
        // Create the query
        const query = firstPageQuery(
          subSite,
          sortParams,
          filterParams,
          allItems
        );

        // Create a new iterator
        const firstPageIterator = query[Symbol.asyncIterator]();

        // Get the first page
        const result = await firstPageIterator.next();

        // Save the iterator so we can use it for next page
        setIterator(firstPageIterator);

        return {
          items: result.value,
          hasNextPage: !result.done && result.value.length === PAGESIZE,
        };
      } else {
        // Try to get data for current page from cache
        const cachedData = queryClient.getQueryData<PagedResult>([
          "paged-PCOLs",
          subSite,
          sortParams,
          filterParams,
          page,
          allItems,
        ]);

        // Return the cached data if we already got this page
        if (cachedData) {
          return cachedData;
        }

        // We haven't gotten this page yet
        if (iterator) {
          // Get the current page
          const result = await iterator.next();

          if (result?.value?.length && result.value.length > 0)
            // We know there isn't a new page if it returns done, or if it returns less than the page size
            return {
              items: result.value,
              hasNextPage: !result.done && result.value.length === PAGESIZE,
            };
        }
        // Something is wrong, so just return empty
        return {
          items: [],
          hasNextPage: false,
        };
      }
    },
    // results must remain cached
    // if results are not kept in cache a scenario may arise where you are on
    //  a page > 1, but we no logner have the data, and the iterator only progresses forward
    gcTime: Infinity,
    select: (data: PagedResult) => {
      return {
        ...data,
        items: PagedPCOLs.parse(data.items),
      };
    },
    placeholderData: keepPreviousData,
  });
};

// Create the base query for items which will be used to get first page
// and the iterator to iterate the future pages
const firstPageQuery = (
  subSite: string,
  sortParams: SortParams,
  filterParams: PCOLFilter[],
  allItems: boolean
) => {
  const requestedFields = "Id,Modified,Title,Subject,Contract,Stage";

  let queryString = "ContentType eq 'PCOLDocSet'";
  if (!allItems) {
    queryString += " and Stage ne 'Complete' and Stage ne 'Cancelled'";
  }

  filterParams.forEach((filter) => {
    queryString += ` and ${filter.queryString}`;
  });

  return subWebContext(subSite)
    .web.lists.getByTitle("PCOLs")
    .items.select(requestedFields)
    .filter(queryString)
    .orderBy(
      sortParams.sortColumn?.toString() || "Created",
      sortParams.sortDirection !== "descending"
    )
    .orderBy("Id", true) // Include this or non-unique sort values can cause issues
    .top(PAGESIZE);
};
