import { cookies } from "next/headers";
import { Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import SearchBox from "@/components/search-box";
import { ProjectLayout, ProjectLayoutButton } from "@/feat/project";
import { createClient } from "@/db/supabase/server";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      abilities:project_abilities (
        level,
        ability:abilities (
          name,
          icon
        )
      ),
      related_projects:project_relations!relater_project_id (
        project:projects!related_project_id (
          *
        )
      )
    `);

  if (projects === null) throw new Error("Impossible to load projects!");

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-center gap-2 w-full">
        <Heading variant="h1">Know my Work!</Heading>
        <div className="flex gap-2">
          <SearchBox placeholder="Search a project..." className="max-w-sm" />
          <ProjectLayoutButton />
        </div>
      </div>
      <ProjectLayout projects={projects} className="flex-1" />
    </div>
  );
}
