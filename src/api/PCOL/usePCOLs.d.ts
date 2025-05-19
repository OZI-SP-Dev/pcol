interface SortParams {
    sortColumn: string | number | undefined;
    sortDirection: "ascending" | "descending";
}
export interface PCOLFilter {
    column: string;
    filter: string | Date | number;
    modifier?: string;
    queryString: string;
}
export declare const usePagedPCOLs: (subSite: string, page: number | undefined, sortParams: SortParams | undefined, filterParams: PCOLFilter[], allItems?: boolean) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    Modified: Date;
    Subject: string | null;
    Contract: string;
    Stage: string;
}[], Error>;
export {};
