import { z } from "zod";
import { spWebContext } from "src/api/SPWebContext";
import { useMutation } from "@tanstack/react-query";

const spEmail = z.object({
  pcolId: z.string(),
  To: z.array(z.string()),
  CC: z.array(z.string()).optional(),
  BCC: z.array(z.string()).optional(),
  Subject: z.string(),
  Body: z.string(),
});

type spEmail = z.infer<typeof spEmail>;

export const useSendEmail = () => {
  return useMutation({
    mutationFn: async (pcolEmail: spEmail) => {
      const logEmail = {
        Title: pcolEmail.pcolId.toString(),
        To: pcolEmail.To.join(";"),
        CC: pcolEmail.CC?.join(";"),
        BCC: pcolEmail.BCC?.join(";"),
        Subject: pcolEmail.Subject,
        Body: pcolEmail.Body.replace(/\n/g, "\r\n<BR />"),
      };

      return spWebContext.web.lists.getByTitle("emails").items.add(logEmail);
    },
  });
};
