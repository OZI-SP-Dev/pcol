export declare const useSendEmail: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    Subject: string;
    pcolId: string;
    To: string[];
    Body: string;
    CC?: string[] | undefined;
    BCC?: string[] | undefined;
}, unknown>;
