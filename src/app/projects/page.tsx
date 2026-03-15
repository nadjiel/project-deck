import { cookies } from "next/headers";
import { Heading } from "@/components/ui/typography";
import SearchBox from "@/components/search-box";
import { ProjectArea } from "@/feat/project";
import { createClient } from "@/db/supabase/server";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

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
      )
    `);

  if (projects === null) throw new Error("Impossible to load projects!");

  return (
    <div className="flex flex-col flex-1">
      <Heading variant="h1">Know my Work!</Heading>
      <SearchBox />
      <ProjectArea projects={projects} />
    </div>
  );
}
