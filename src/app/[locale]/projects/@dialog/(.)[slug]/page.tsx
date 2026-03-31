import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { ProjectDialog as Dialog } from "@/feat/project";

export default async function ProjectDialog(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale, slug } = await params;

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
      files:project_files (
        file:files (
          *
        )
      ),
      translations:project_translations (
        *
      ),
      logo:files (
        *
      ),
      category:categories (
        *
      )
    `)
    .eq("slug", slug)
    .single();

  console.log(project)

  if (project === null) throw new Error("Impossible to load projects!");

  return (
    <Dialog data={project} />
  )
}
