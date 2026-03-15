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
import { ProjectCard, ProjectDialog, type Project } from "@/feat/project";

interface Props {
  projects: Project<"abilities">[];
  project?: Project<"abilities" | "related_projects">;
}

export default function ProjectArea(props: Props) {
  const {
    projects: propProjects,
    project,
  } = props;

  const [projects, setProjects] = useState(propProjects);
  const [index, setIndex] = useState(0);

  const router = useRouter();

  const wrapIndex = (index: number) => {
    return ((index % projects.length) + projects.length) % projects.length;
  }

  return (
    <div className="grid place-content-center flex-1 overflow-hidden">
      { projects.map((p, i) => (
        <ProjectCard
          key={p.id}
          data={p}
          onSwipeRight={() => setIndex(i => wrapIndex(i + 1))}
          onSwipeLeft={() => setIndex(i => wrapIndex(i - 1))}
          onSwipeUp={() => router.push(`/projects/${p.slug}`)}
          onClick={() => router.push(`/projects/${p.slug}`)}
          style={{
            zIndex: i === index ? projects.length : projects.length - i
          }}
          className="col-start-1 col-end-1 row-start-1 row-end-1"
        />
      )) }
      {
        project && (
          <Dialog
            open={true}
            onOpenChange={open => !open && router.push("/projects")}
          >
            <CardDialogContent>
              <DialogHeader>
                <DialogTitle className="sr-only">{project.name}</DialogTitle>
                <DialogDescription className="sr-only">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
              <ProjectDialog data={project} />
            </CardDialogContent>
          </Dialog>
        )
      }
    </div>
  );
}
