import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/comments/item";
import { subWebContext } from "src/api/SPWebContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const spNoteItem = z.array(
  z.object({
    Title: z.string().max(255, "Title must be 255 characters or less"),
    Id: z.number(),
  })
);

type spNoteItem = z.infer<typeof spNoteItem>;

const useNoteItem = (program: string, pcolId: number) => {
  return useQuery({
    queryKey: ["noteItem", pcolId],
    queryFn: () => getNoteItem(program, pcolId),
    select: selectNoteId,
    staleTime: Infinity, // Prevent refetch
    gcTime: Infinity, // Prevent garbage collection
  });
};

const getNoteItem = async (program: string, pcolId: number) => {
  return subWebContext(program)
    .web.lists.getByTitle("notes")
    .items.filter(`Title eq ${pcolId}`)<spNoteItem>();
};

const selectNoteId = (noteItems: spNoteItem) => spNoteItem.parse(noteItems)[0];

export const useNotes = (program: string, pcolId: number) => {
  const noteItem = useNoteItem(program, pcolId);
  const noteId = noteItem.data?.Id;

  const hasNoteError = noteItem.error instanceof Error;
  const returnFunction =
    hasNoteError || !noteId
      ? () => Promise.reject(noteItem.error || new Error("Note item not found")) // If we erred trying to get noteItem, then return that error
      : () => getNotes(program, noteId); // If we successfuly got the noteItem, then return the Notes

  return useQuery({
    queryKey: ["notes", pcolId],
    queryFn: returnFunction,
  });
};

const getNotes = async (program: string, noteId: number) => {
  return subWebContext(program)
    .web.lists.getByTitle("notes")
    .items.getById(noteId)
    .comments();
};

export const useAddNote = (program: string, pcolId: number) => {
  const queryClient = useQueryClient();
  const noteItem = useNoteItem(program, pcolId);
  const noteId = Number(noteItem.data?.Id);
  return useMutation({
    mutationFn: async (newNote: string) => {
      return subWebContext(program)
        .web.lists.getByTitle("notes")
        .items.getById(noteId)
        .comments.add(newNote);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["notes", pcolId] });
    },
  });
};
