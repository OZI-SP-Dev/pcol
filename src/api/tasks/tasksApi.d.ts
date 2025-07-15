import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
export declare const useTasks: (subSite: string, pcolId: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    pcolId: string;
    Role: string;
    Person: {
        Id: number;
        Title: string;
        EMail: string;
    };
    Status?: string | undefined;
    Modified?: Date | undefined;
    SkippedBy?: {
        Id: number;
        Title: string;
        EMail: string;
    } | undefined;
}[], Error>;
export declare const useAddTasks: (subSite?: string, pcolId?: string) => import("@tanstack/react-query").UseMutationResult<void, Error, {
    ParallelReviewers: {
        Id: string;
        Title: string;
        EMail: string;
    }[];
    SerialReviewers: {
        Id: string;
        Title: string;
        EMail: string;
    }[];
    OrgReviewer: {
        Id: string;
        Title: string;
        EMail: string;
    };
    PCO: {
        Id: string;
        Title: string;
        EMail: string;
    };
    Distributor: {
        Id: string;
        Title: string;
        EMail: string;
    };
}, unknown>;
