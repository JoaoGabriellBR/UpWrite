"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TooltipComponent } from "@/components/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    onClick?: any;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      className={cn(
        "group flex flex-col gap-4 py-2",
        isCollapsed && "data-collapsed"
      )}
    >
      <nav
        className={cn("grid gap-1 px-2", isCollapsed && "justify-center px-2")}
      >
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipComponent
              text={link.title}
              key={index}
              side="right"
              delayDuration={0}
            >
              <button
                onClick={link?.onClick}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "icon" }),
                  "h-9 w-9",
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </button>
            </TooltipComponent>
          ) : (
            <button
              // onClick={link.onClick}
              key={index}
              onClick={link?.onClick}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </button>
          )
        )}
      </nav>
    </div>
  );
}
