"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardDialogContent } from "@/components/card-dialog-content";
import { ProjectCard, ProjectDialog, type Project } from "@/feat/project";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  projects: Project<"abilities" | "related_projects" | "logo">[];
  project?: Project<"abilities" | "related_projects" | "logo">;
}

export default function ProjectArea(props: Props) {
  const {
    projects,
    project: propProject,
    className,
    ...rest
  } = props;

  const [project, setProject] = useState(propProject);
  
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dragRef}
      className={cn(
        "relative flex flex-col flex-1 overflow-hidden w-dvw",
        "before:absolute before:left-0 before:w-64 before:h-full before:bg-linear-to-r before:from-background before:to-transparent before:z-1 before:pointer-events-none",
        "after:absolute after:right-0 after:w-64 after:h-full after:bg-linear-to-l after:from-background after:to-transparent after:z-1 after:pointer-events-none",
        className,
      )}
      {...rest}
    >
      <motion.div
        drag="x"
        dragConstraints={dragRef}
        whileDrag={{ pointerEvents: "none" }}
        className="flex flex-1 items-center gap-4 w-max px-8 touch-none"
      >
        { projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            data={p}
            onClick={() => {
              setProject(projects.find(_p => _p.slug === p.slug));
              window.history.pushState(null, "", `/projects/${p.slug}`);
            }}
            className=""
          />
        )) }
      </motion.div>
      <Dialog
        open={!!project}
        onOpenChange={open => {
          if (!open) {
            setProject(undefined);
            window.history.pushState(null, "", `/projects`);
          }
        }}
      >
        <CardDialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">{project?.name}</DialogTitle>
            <DialogDescription className="sr-only">
              {project?.description}
            </DialogDescription>
          </DialogHeader>
          <ProjectDialog data={project!} />
        </CardDialogContent>
      </Dialog>
    </div>
  );
}
