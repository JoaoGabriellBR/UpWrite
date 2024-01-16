"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Editor from "@/components/editor";
import Editor from "@/components/block-note";
import HeaderNotes from "@/components/header-notes";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createTitleSchema } from "@/lib/createTitleSchema";
import { propagateServerField } from "next/dist/server/lib/render-server";

export default function CreateNote() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();

  const form = useForm<z.infer<typeof createTitleSchema>>({
    mode: "onChange",
    resolver: zodResolver(createTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  const createNote = async () => {
    setLoading(true);
    const title = form.getValues("title");
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
    });
    setLoading(false);
  };

  const onSuccess = useCallback(() => {
    router.refresh();
    router.push("/notes");
  }, [router]);

  const onError = useCallback(() => {
    toast({
      title: "Algo deu errado.",
      description: "Não foi possível criar a sua nota. Tente novamente.",
      variant: "destructive",
      duration: 3000,
    });
  }, []);

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleClickCreateNote = useCallback(() => {
    mutate();
  }, [mutate]);

  const handleChangeContent = ({ editor }: any) => {
    setContent(editor.getJSON());
  };

  return (
    <section className="w-full grid grid-cols-2 grid-rows-6 gap-2 max-w-8x1 mx-auto min-h-screen py-3">
      <HeaderNotes
        form={form}
        handleClick={handleClickCreateNote}
        loading={loading}
        className="col-span-2 row-span-1"
      />

      <div className="col-span-2 row-span-5">
        <div className="w-4/6 h-full mx-auto flex flex-col items-start gap-y-1">
          {/* <Editor
            form={form}
            content={content}
            handleChangeContent={handleChangeContent}
          /> */}
          <Editor/>
        </div>
      </div>
    </section>
  );
}
