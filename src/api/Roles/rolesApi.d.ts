import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
export declare const useProgramRoles: (subSite?: string) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    user: {
        Id: number;
        Title: string;
        EMail: string;
    };
}[] | null, Error>;
export declare const useMyRoles: (subSite?: string) => {
    isPKAdmin: boolean;
    isAdmin: boolean;
    isCO: boolean;
    isDistributor: boolean;
    isReviewer: boolean;
};
