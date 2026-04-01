import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { ProjectDialog as Dialog } from "@/feat/project";
import { selector, translator } from "@/api/projects";

export default async function ProjectDialog(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale, slug } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const project = await selector(
      supabase,
      ["abilities", "related_projects", "files", "logo", "category"]
    )
    .eq("slug", slug)
    .limit(1)
    .single()
    .then(({ data }) => data === null ? null : translator(supabase, data, locale));

  if (project === null) throw new Error("Impossible to load projects!");

  return (
    <Dialog data={project} />
  )
}
