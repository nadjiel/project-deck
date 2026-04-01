import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { ProjectView } from "@/feat/project";
import { selector } from "@/api/projects";

export default async function Test() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: project } = await selector(
    supabase,  
    ["abilities", "category", "files", "logo", "related_projects"]
    )
    .eq("slug", "im-share")
    .single();

  console.log(project)

  return (
    <ProjectView data={project!} />
  )
}
