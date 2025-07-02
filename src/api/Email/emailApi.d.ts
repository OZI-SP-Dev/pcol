export declare const useSendEmail: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    pcolId: string;
    To: string[];
    Subject: string;
    Body: string;
    CC?: string[] | undefined;
    BCC?: string[] | undefined;
}, unknown>;
