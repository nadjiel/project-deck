"use client";

import { useLayout } from "@/hooks/use-layout";
import { ProjectArea, ProjectGrid, type Project } from "@/feat/project";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  projects: Project<"abilities" | "related_projects">[];
  project?: Project<"abilities" | "related_projects">;
}

export default function ProjectLayout(props: Props) {
  const { projects, project, ...rest } = props;

  const { layout } = useLayout(["grid", "deck"]);

  return (
    <>
      {
        !layout || layout === "deck"
          ? <ProjectArea projects={projects} project={project} {...rest} />
          : <ProjectGrid projects={projects} project={project} {...rest} />
      }
    </>
  );
}
