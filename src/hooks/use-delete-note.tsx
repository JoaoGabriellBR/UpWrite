import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

const useDeleteNote = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteNote = async (noteId: any) => {
    await fetch(`/api/notes/noteId?id=${noteId}`, {
      method: "DELETE",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
    toast({
      title: "Nota excluida",
      description: "Sua nota foi excluida permanentemente com sucesso.",
      variant: "default",
    });
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi excluida. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleDeleteNote = useCallback(
    (noteId: any) => {
      mutate(noteId);
    },
    [mutate]
  );

  return { handleDeleteNote, isPendingDelete };
};

export default useDeleteNote;
