"use client";

import { useState } from "react";
import ProjectCard from "@/components/project-card";
import type { Database } from "@/db/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface Props {
  projects: Project[];
}

export default function ProjectArea(props: Props) {
  const { projects: propProjects } = props;

  const [projects, setProjects] = useState(propProjects);
  const [index, setIndex] = useState(0);

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
          style={{
            zIndex: i === index ? projects.length : projects.length - i
          }}
          className="col-start-1 col-end-1 row-start-1 row-end-1"
        />
      )) }
    </div>
  );
}
