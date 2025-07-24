import { z } from "zod";
import "./StartForm.css";
import { Dispatch, SetStateAction } from "react";
declare const WorkflowDetails: z.ZodObject<{
    ParallelReviewers: z.ZodArray<z.ZodObject<{
        Id: z.ZodString;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: string;
        Title: string;
        EMail: string;
    }, {
        Id: string;
        Title: string;
        EMail: string;
    }>, "many">;
    SerialReviewers: z.ZodArray<z.ZodObject<{
        Id: z.ZodString;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: string;
        Title: string;
        EMail: string;
    }, {
        Id: string;
        Title: string;
        EMail: string;
    }>, "many">;
    OrgReviewer: z.ZodNullable<z.ZodObject<{
        Id: z.ZodString;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: string;
        Title: string;
        EMail: string;
    }, {
        Id: string;
        Title: string;
        EMail: string;
    }>>;
    PCO: z.ZodNullable<z.ZodObject<{
        Id: z.ZodString;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: string;
        Title: string;
        EMail: string;
    }, {
        Id: string;
        Title: string;
        EMail: string;
    }>>;
    Distributor: z.ZodNullable<z.ZodObject<{
        Id: z.ZodString;
        Title: z.ZodString;
        EMail: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        Id: string;
        Title: string;
        EMail: string;
    }, {
        Id: string;
        Title: string;
        EMail: string;
    }>>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type WorkflowDetails = z.infer<typeof WorkflowDetails>;
declare const StartWorkflow: ({ setOpen, }: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => import("react/jsx-runtime").JSX.Element;
export default StartWorkflow;
