import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { Heading } from "@/components/ui/typography";
import { ProjectView } from "@/feat/project";
import { selector } from "@/api/projects";

export default async function Project(props: PageProps<"/[locale]/projects/[slug]">) {
  const { params } = props;

  const { locale, slug } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: project } = await selector(
      supabase,
      ["abilities", "related_projects", "files", "logo", "category"]
    )
    .eq("slug", slug)
    .limit(1)
    .single();
    
  if (project === null) throw new Error("Impossible to load project");
  
  const { data: projectTranslation } = await supabase
    .from("project_translations")
    .select(`*`)
    .eq("language_code", locale)
    .eq("project_id", project.id)
    .limit(1)
    .single();
  
  const { data: categoryTranslation } = await supabase
    .from("category_translations")
    .select(`*`)
    .eq("language_code", locale)
    .eq("category_slug", project.category?.slug ?? "")
    .limit(1)
    .single();

  console.log({project, projectTranslation, categoryTranslation})


  return (
    <div className="flex flex-col flex-1 gap-8">
      <Heading variant="h1" className="text-center">{project.name}</Heading>
      <ProjectView data={project} />
    </div>
  );
}
