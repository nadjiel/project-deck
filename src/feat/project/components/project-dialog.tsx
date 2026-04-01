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
      <DialogContent onAnimationEnd={() => !open && router.back()}>
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>
            {data.category?.name}
          </DialogDescription>
        </DialogHeader>
        <ProjectView data={data} />
      </DialogContent>
    </Dialog>
  );
}
