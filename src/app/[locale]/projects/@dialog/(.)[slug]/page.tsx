import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { ProjectDialog as Dialog } from "@/feat/project";
import { selector } from "@/api/projects";

export default async function ProjectDialog(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale, slug } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: project } = await selector(
      supabase,
      ["abilities", "related_projects", "files", "logo", "category"]
    )
    .eq("slug", slug)
    .single();

  console.log(project)

  if (project === null) throw new Error("Impossible to load projects!");

  return (
    <Dialog data={project} />
  )
}
