"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ProjectView } from "@/feat/project";
import { cn } from "@/lib/utils";
import type { Project } from "@/api/projects";

interface Props {
  data: Project<"abilities" | "related_projects" | "logo" | "category" | "files">;
}

export default function ProjectDialog(props: Props) {
  const { data } = props;

  const [open, setOpen] = useState(true);

  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onAnimationEnd={() => !open && router.back()}
        className={cn(
          "overflow-x-auto",
          "[&::-webkit-scrollbar-track]:my-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/25 [&::-webkit-scrollbar-thumb]:bg-foreground/50 [&::-webkit-scrollbar-thumb]:rounded-full",
        )}
      >
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {data.category?.name}
          </DialogDescription>
        </DialogHeader>
        <ProjectView data={data} />
      </DialogContent>
    </Dialog>
  );
}
