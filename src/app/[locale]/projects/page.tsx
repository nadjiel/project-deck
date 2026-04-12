import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/typography";
import SearchBox from "@/components/search-box";
import { ProjectArea } from "@/feat/project";
import { createClient } from "@/db/supabase/server";
import { selector, translator } from "@/api/projects";
import { AbilityFilter } from "@/feat/ability";
import env from "@/config/env";

export default async function Projects(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("projects");

  let { data: projects } = await selector(
    supabase,
    ["abilities", "category", "files", "logo", "related_projects"],
    "project_categories!inner()",
  )
    .eq("active", true)
    .eq("project_categories.category_slug", env.category);
  
  if (projects === null) throw new Error("Impossible to load projects!");
  
  projects = await Promise.all(projects.map(p => translator(supabase, p, locale)))

  const { data: abilities } = await supabase
    .from("abilities")
    .select(`
      *,
      projects:project_abilities!inner(
        project:project_id!inner()
      )
    `)
    .eq("projects.project.main_category_slug", env.category);

  if (abilities === null) throw new Error("Impossible to load abilities!");

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-center gap-4 w-full mb-4">
        <Heading variant="h1" className="text-center">{t("title")}</Heading>
        <div className="w-full max-w-sm flex gap-2">
          <SearchBox placeholder={t("search")} />
          <AbilityFilter abilities={abilities} />
        </div>
      </div>
      <ProjectArea projects={projects} className="flex-1" />
    </div>
  );
}
