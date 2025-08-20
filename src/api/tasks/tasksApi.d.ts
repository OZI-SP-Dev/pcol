import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/batching";
import { z } from "zod";
declare const Task: z.ZodObject<{
    Id: z.ZodNumber;
    Title: z.ZodString;
    pcolId: z.ZodNumber;
    Person: z.ZodObject<{
        Id: z.ZodNumber;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: number;
        Title: string;
        EMail: string;
    }, {
        Id: number;
        Title: string;
        EMail: string;
    }>;
    Role: z.ZodString;
    Status: z.ZodOptional<z.ZodString>;
    SkippedBy: z.ZodOptional<z.ZodObject<{
        Id: z.ZodNumber;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: number;
        Title: string;
        EMail: string;
    }, {
        Id: number;
        Title: string;
        EMail: string;
    }>>;
    Modified: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    Id: number;
    Title: string;
    pcolId: number;
    Role: string;
    Person: {
        Id: number;
        Title: string;
        EMail: string;
    };
    Modified?: Date | undefined;
    Status?: string | undefined;
    SkippedBy?: {
        Id: number;
        Title: string;
        EMail: string;
    } | undefined;
}, {
    Id: number;
    Title: string;
    pcolId: number;
    Role: string;
    Person: {
        Id: number;
        Title: string;
        EMail: string;
    };
    Modified?: Date | undefined;
    Status?: string | undefined;
    SkippedBy?: {
        Id: number;
        Title: string;
        EMail: string;
    } | undefined;
}>;
export type Task = z.infer<typeof Task>;
export declare const useTasks: (subSite: string, pcolId: number) => import("@tanstack/react-query").UseQueryResult<{
    Id: number;
    Title: string;
    pcolId: number;
    Role: string;
    Person: {
        Id: number;
        Title: string;
        EMail: string;
    };
    Modified?: Date | undefined;
    Status?: string | undefined;
    SkippedBy?: {
        Id: number;
        Title: string;
        EMail: string;
    } | undefined;
}[], Error>;
export declare const useAddTasks: (subSite: string, pcolId: number) => import("@tanstack/react-query").UseMutationResult<void, Error, {
    PCO: {
        Id: string;
        Title: string;
        EMail: string;
    } | null;
    Distributor: {
        Id: string;
        Title: string;
        EMail: string;
    } | null;
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
    } | null;
}, unknown>;
export declare const useUpdateTask: (subSite: string, pcolId: number, taskId: number) => import("@tanstack/react-query").UseMutationResult<any, Error, string, unknown>;
export {};
