"use client";

// import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div
      // ref={dragRef}
      className={cn(
        "relative flex flex-col flex-1 w-full",
        "before:absolute before:left-0 before:w-32 sm:before:w-64 before:h-full before:bg-linear-to-r before:from-background before:to-transparent before:z-1 before:pointer-events-none",
        "after:absolute after:right-0 after:w-32 sm:after:w-64 after:h-full after:bg-linear-to-l after:from-background after:to-transparent after:z-1 after:pointer-events-none",
        className,
      )}
      {...rest}
    >
      <Button variant="secondary" size="icon-lg" className="absolute left-0 top-1/2 -translate-y-1/2 z-2 rounded-full animate-[bounce-x_2000ms_ease-in-out_infinite] [--bounce-x-offset:-10%]">
        <ArrowBigLeftIcon />
      </Button>
      <div className="flex flex-col flex-1 overflow-x-auto [&::-webkit-scrollbar]:h-0">
        <motion.div
          // drag="x"
          // dragConstraints={dragRef}
          // whileDrag={{ pointerEvents: "none" }}
          className="flex flex-1 justify-center items-center gap-4 w-max min-w-full px-8"
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
      <Button variant="secondary" size="icon-lg" className="absolute right-0 top-1/2 -translate-y-1/2 z-2 rounded-full animate-[bounce-x_2000ms_ease-in-out_infinite] [--bounce-x-offset:10%]">
        <ArrowBigRightIcon />
      </Button>
    </div>
  );
}
