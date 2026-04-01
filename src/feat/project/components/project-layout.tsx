"use client";

import { useLayout } from "@/hooks/use-layout";
import { ProjectArea, ProjectGrid } from "@/feat/project";
import type { ComponentProps } from "react";
import type { Project } from "@/api/projects";

interface Props extends ComponentProps<"div"> {
  projects: Project<"abilities" | "related_projects" | "category" | "files" | "logo">[];
  project?: Project<"abilities" | "related_projects" | "category" | "files" | "logo">;
}

/**
 * @deprecated Since layout is not in use anymore.
 */
export default function ProjectLayout(props: Props) {
  const { projects, project, ...rest } = props;

  const { layout } = useLayout(["grid", "deck"]);

  return (
    <>
      {
        !layout || layout === "deck"
          ? <ProjectArea projects={projects} {...rest} />
          : <ProjectGrid projects={projects} project={project} {...rest} />
      }
    </>
  );
}
