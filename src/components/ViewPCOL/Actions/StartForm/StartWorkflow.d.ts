import { z } from "zod";
import "./StartForm.css";
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
    OrgReviewer: z.ZodObject<{
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
    }>;
    PCO: z.ZodObject<{
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
    }>;
    Distributor: z.ZodObject<{
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
    }>;
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
}>;
export type WorkflowDetails = z.infer<typeof WorkflowDetails>;
declare const StartWorkflow: () => import("react/jsx-runtime").JSX.Element;
export default StartWorkflow;
