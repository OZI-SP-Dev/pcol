import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
export declare const usePKMemberGroup: () => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
}, Error>;
export declare const useProgramMemberGroup: (subSite: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
}, Error>;
export declare const useProgramOwnerGroup: (subSite: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
}, Error>;
