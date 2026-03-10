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
    <div className="flex flex-col flex-1">
      <Heading variant="h1">Know my Work!</Heading>
      <SearchBox />
      <div className="grid place-content-center flex-1 overflow-hidden">
        { projects.map(p => (
          <ProjectCard
            key={p.id}
            data={p}
            className="col-start-1 col-end-1 row-start-1 row-end-1"
          />
        )) }
      </div>
    </div>
  );
}
