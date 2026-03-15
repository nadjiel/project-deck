import type { Project } from "@/feat/project";

interface Props {
  projects: Project<"abilities" | "related_projects">[];
  project?: Project<"abilities" | "related_projects">;
}

export default function ProjectGrid(props: Props) {
  const { projects, project } = props;

  return (
    <div>
      grid
    </div>
  );
}
