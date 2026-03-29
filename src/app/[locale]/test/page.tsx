import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { ProjectView } from "@/feat/project";

export default async function Test() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: project } = await supabase
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
      ),
      logo:files (
        *
      ),
      category:categories (
        *
      )
    `)
    .eq("slug", "im-share")
    .single();

  console.log(project)

  return (
    <ProjectView data={project!} />
  )
}
