import { useMutation, useQuery } from "@tanstack/react-query";
import { subWebContext } from "src/api/SPWebContext";
import { z } from "zod";
import "@pnp/sp/items";

const SequenceOffset = z.array(
  z.object({
    Id: z.number().int().positive(),
    Title: z.coerce.number().int(),
  })
);

type SequenceOffset = z.infer<typeof SequenceOffset>;

const useSequenceOffset = (program: string) => {
  return useQuery({
    queryKey: ["SequenceOffset", program],
    queryFn: () =>
      subWebContext(program)
        .web.lists.getByTitle("SequenceOffset")
        .items.top(1)
        .orderBy("Id", false)(),
    select: (data: SequenceOffset) => SequenceOffset.parse(data),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useGetSequenceNumber = (program: string) => {
  const sequenceOffset = useSequenceOffset(program);

  return useMutation({
    mutationFn: async (title: string) => {
      const offset = sequenceOffset.data?.[0].Title || 0;
      const newSequenceNumber = await subWebContext(program)
        .web.lists.getByTitle("SequenceNumber")
        .items.add({ Title: title });
      const sequence = newSequenceNumber.Id - offset;

      return sequence;
    },
  });
};
