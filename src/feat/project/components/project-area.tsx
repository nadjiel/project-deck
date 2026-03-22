"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardDialogContent } from "@/components/card-dialog-content";
import { ProjectPlayingCard, ProjectDialog, type Project } from "@/feat/project";

interface Props {
  projects: Project<"abilities" | "related_projects">[];
  project?: Project<"abilities" | "related_projects">;
}

export default function ProjectArea(props: Props) {
  const {
    projects,
    project: propProject,
  } = props;

  const [project, setProject] = useState(propProject);

  return (
    <div className="flex flex-col flex-1 overflow-auto w-dvw px-8">
      <div className="flex flex-1 items-center gap-4 w-max">
        { projects.map((p, i) => (
          <ProjectPlayingCard
            key={p.id}
            data={p}
            onClick={() => {
              setProject(projects.find(_p => _p.slug === p.slug));
              window.history.pushState(null, "", `/projects/${p.slug}`);
            }}
            className=""
          />
        )) }
      </div>
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
