import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

const useArchiveNote = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const archiveNote = async (noteId: any) => {
    await fetch(`/api/notes/archive?id=${noteId}`, {
      method: "PATCH",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
    toast({
      title: "Nota arquivada",
      description: "Sua nota foi arquivada com sucesso.",
      variant: "default",
    });
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi arquivada. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate, isPending: isPendingArchive } = useMutation({
    mutationFn: archiveNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleArchiveNote = useCallback(
    (noteId: any) => {
      mutate(noteId);
    },
    [mutate]
  );

  return { handleArchiveNote, isPendingArchive };
};

export default useArchiveNote;
