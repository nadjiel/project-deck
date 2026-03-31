import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { Heading } from "@/components/ui/typography";
import { ProjectView } from "@/feat/project";

export default async function Project(props: PageProps<"/[locale]/projects/[slug]">) {
  const { params } = props;

  const { slug } = await params;

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

  if (project === null) throw new Error("Impossible to load project");

  return (
    <div className="flex flex-col flex-1 gap-8">
      <Heading variant="h1" className="text-center">{project.name}</Heading>
      <ProjectView data={project} />
    </div>
  );
}
