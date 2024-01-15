"use client";

import { useMediaQuery } from "usehooks-ts";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Editor from "@/components/editor";
import HeaderNotes from "@/components/header-notes";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createTitleSchema } from "@/lib/createTitleSchema";
import { propagateServerField } from "next/dist/server/lib/render-server";

export default function Teste({ children }: any) {

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
    <div className="flex h-screen dark:bg-background">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <h2 className="text-lg font-medium">Welcome</h2>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create a note
          </Button>
        </div>
      </main>
    </div>
  );
}
