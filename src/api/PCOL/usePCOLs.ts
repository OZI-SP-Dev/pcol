import { spPCOL } from "src/api/PCOL/usePCOL";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { z } from "zod";
import { subWebContext } from "src/api/SPWebContext";

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

export const usePagedPCOLs = (
  subSite: string,
  page = 0,
  sortParams = defaultSortParams,
  filterParams: PCOLFilter[],
  allItems = false
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [
      "paged-PCOLs",
      subSite,
      sortParams,
      filterParams,
      page,
      allItems,
    ],
    queryFn: () => {
      let skiptoken = 0;

      if (page > 0) {
        const data: PagedPCOLs =
          queryClient.getQueryData([
            "paged-PCOLs",
            subSite,
            sortParams,
            filterParams,
            page - 1,
            allItems,
          ]) || [];

        skiptoken = Number(data[data.length - 1].Id);
      }

      return getPagedPCOLs(
        subSite,
        skiptoken,
        sortParams,
        filterParams,
        allItems
      );
    },
    // results must remain cached
    // if results are not kept in cache a scenario may arise where you are on
    //  a page > 1, but the previous page has been removed from cache. The
    //  query function depends on the previous page's results. Going "back"
    //  would result in page-1 actually holding the results for page 0.
    gcTime: Infinity,
    select: (data: PagedPCOLs) => PagedPCOLs.parse(data),
    placeholderData: keepPreviousData,
  });
};

const getPagedPCOLs = async (
  subSite: string,
  skiptoken: number,
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
    .skip(skiptoken)
    .top(10)<spPCOL[]>(); // Page Size
};
