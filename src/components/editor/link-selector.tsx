"use client";

import { getUrlFromString } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Input } from "../ui/input";
import { FC, useEffect, useRef } from "react";
import { LinkSelectorProps } from "@/lib/types";

export const LinkSelector: FC<LinkSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          className="w-auto bg-card flex h-full items-center gap-1 whitespace-nowrap p-2 text-medium hover:bg-accent active:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ExternalLink className="h-4 w-4" />
          <p>Link</p>
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="bg-card z-[99999] my-1 flex max-h-80 min-w-48 flex-col overflow-hidden overflow-y-auto rounded border border-secondary p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();

              const input = e.currentTarget[0] as HTMLInputElement;
              const url = getUrlFromString(input.value);

              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              } else {
                editor.chain().focus().unsetLink().run();
              }

              setIsOpen(false);
            }}
          >
            <Input
              type="text"
              ref={inputRef}
              placeholder="Cole um link"
              defaultValue={editor.getAttributes("link").href || ""}
              className="flex-1 p-2 text-medium outline-none h-10 w-auto"
            />
          </form>
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
