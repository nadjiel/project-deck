import { ProjectCard, type Project } from "@/feat/project";

interface Props {
  projects: Project<"abilities" | "related_projects">[];
  project?: Project<"abilities" | "related_projects">;
}

export default function ProjectGrid(props: Props) {
  const { projects, project } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl m-4">
      {
        projects.map(p => (
          <ProjectCard key={p.id} data={p} />
        ))
      }
    </div>
  );
}
