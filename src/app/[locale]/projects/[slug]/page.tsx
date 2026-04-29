import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { Heading } from "@/components/ui/typography";
import { ProjectView } from "@/feat/project";
import { selector, translator } from "@/api/projects";

export default async function Project(props: PageProps<"/[locale]/projects/[slug]">) {
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
    
  if (project === null) throw new Error("Impossible to load project");

  return (
    <div className="flex flex-col items-center flex-1 gap-8">
      <Heading variant="h1" className="text-center">{project.name}</Heading>
      <ProjectView data={project} />
    </div>
  );
}
