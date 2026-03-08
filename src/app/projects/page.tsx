import { cookies } from "next/headers";
import { Heading } from "@/components/ui/typography";
import ProjectCard from "@/components/project-card";
import SearchBox from "@/components/search-box";
import { createClient } from "@/db/supabase/server";

export default async function Projects() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: projects } = await supabase.from("projects").select();

  if (projects === null) throw new Error("Impossible to load projects!");

  return (
    <div>
      <Heading variant="h1">Know my Work!</Heading>
      <SearchBox />
      { projects.map(p => <ProjectCard key={p.id} data={p} />) }
    </div>
  );
}
