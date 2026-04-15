"use client";

// import { useRef } from "react";
import { motion } from "motion/react";
import { ProjectCard } from "@/feat/project";
import { cn } from "@/lib/utils";
import { useFilters } from "@/hooks/use-filters";
import { useSearch } from "@/hooks/use-search";
import type { ComponentProps } from "react";
import type { Project } from "@/api/projects";

interface Props extends ComponentProps<"div"> {
  projects: Project<"abilities" | "related_projects" | "logo" | "category">[];
}

export default function ProjectArea(props: Props) {
  const {
    projects,
    className,
    ...rest
  } = props;

  const { getFilter } = useFilters(["abilities"]);
  const { search } = useSearch();

  const filtered = projects.filter(p => (
    (
      getFilter("abilities", "has").length === 0
      || p.abilities.some(a => getFilter("abilities", "has").some(f => f === a.ability.slug))
    )
    && p.name.toLowerCase().includes(search.trim().toLowerCase())
  ));

  console.log(getFilter("abilities", "has"))

  return (
    <div
      // ref={dragRef}
      className={cn(
        "flex flex-col flex-1 overflow-x-auto w-full",
        "[&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-accent [&::-webkit-scrollbar-thumb]:bg-primary",
        "before:absolute before:left-0 before:w-64 before:h-full before:bg-linear-to-r before:from-background before:to-transparent before:z-1 before:pointer-events-none",
        "after:absolute after:right-0 after:w-64 after:h-full after:bg-linear-to-l after:from-background after:to-transparent after:z-1 after:pointer-events-none",
        className,
      )}
      {...rest}
    >
      <motion.div
        // drag="x"
        // dragConstraints={dragRef}
        // whileDrag={{ pointerEvents: "none" }}
        className="flex flex-1 items-center gap-4 w-max px-8"
      >
        { filtered.map(p => (
          <ProjectCard
            key={p.id}
            data={p}
            draggable={false}
          />
        )) }
      </motion.div>
    </div>
  );
}
