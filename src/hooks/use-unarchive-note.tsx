import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";

interface UseUnarchiveNoteProps {
  setOpen?: (value: boolean) => void;
}

const useUnarchiveNote = ({ setOpen }: UseUnarchiveNoteProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const unarchiveNote = async (noteId: any) => {
    await fetch(`/api/notes/unarchive?id=${noteId}`, {
      method: "PATCH",
    });
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    if (setOpen) {
      setOpen(false);
    }
    toast({
      title: "Nota restaurada",
      description: "Sua nota foi restaurada com sucesso.",
      variant: "default",
    });
  }, [router, setOpen]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Sua nota não foi restaurada. Tente novamente.",
      variant: "destructive",
    });
  }, []);

  const { mutate, isPending: isPendingUnarchive, isSuccess: isSuccessUnarchive } = useMutation({
    mutationFn: unarchiveNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["archivedNotes"] });
    },
  });

  const handleUnarchiveNote = useCallback(
    (noteId: any) => {
      mutate(noteId);
    },
    [mutate]
  );

  return { handleUnarchiveNote, isPendingUnarchive, isSuccessUnarchive };
};

export default useUnarchiveNote;
