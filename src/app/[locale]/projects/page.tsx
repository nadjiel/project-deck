import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/typography";
import SearchBox from "@/components/search-box";
import { ProjectLayout } from "@/feat/project";
import { createClient } from "@/db/supabase/server";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("projects");

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
      <div className="flex flex-col items-center gap-4 w-full mb-4">
        <Heading variant="h1">{t("title")}</Heading>
        <SearchBox placeholder={t("search")} className="max-w-sm" />
      </div>
      <ProjectLayout projects={projects} className="flex-1" />
    </div>
  );
}
