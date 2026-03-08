import { Heading } from "@/components/ui/typography";
import ProjectCard from "@/components/project-card";

const project = {
  id: 1,
  name: "Fixer",
  description: "The Fixer project",
  abilityIcon: "SiReact",
  icon: "",
}

export default function Projects() {
  return (
    <div>
      <Heading variant="h1">Know my Work!</Heading>
      <ProjectCard data={project} />
    </div>
  );
}
