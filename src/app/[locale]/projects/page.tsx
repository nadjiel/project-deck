import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/typography";
import SearchBox from "@/components/search-box";
import { ProjectArea } from "@/feat/project";
import { createClient } from "@/db/supabase/server";
import { selector, type Project } from "@/api/projects";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("projects");

  const { data: projects } = await selector(
      supabase,
      ["abilities", "related_projects", "files", "logo", "category"]
    )
    .eq("active", true);

  if (projects === null) throw new Error("Impossible to load projects!");

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-center gap-4 w-full mb-4">
        <Heading variant="h1" className="text-center">{t("title")}</Heading>
        <SearchBox placeholder={t("search")} className="max-w-sm" />
      </div>
      <ProjectArea projects={projects} className="flex-1" />
    </div>
  );
}
