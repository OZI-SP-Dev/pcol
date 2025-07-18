export declare const useSendEmail: () => import("@tanstack/react-query").UseMutationResult<any, Error, {
    pcolId: string;
    Subject: string;
    To: string[];
    Body: string;
    Program: string;
    CC?: string[] | undefined;
    BCC?: string[] | undefined;
}, unknown>;
