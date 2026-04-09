import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/typography";
import AbilityButton from "@/components/ability-button";
import { Xylophone } from "@/feat/xylophone";
import { createClient } from "@/db/supabase/server";
import env from "@/config/env";
import { translator } from "@/api/services";

export default async function Abilities(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("abilities");

  let { data: services } = await supabase
    .from("services")
    .select(`
      *,
      categories:service_categories!inner()
    `)
    .eq("categories.category_slug", env.category);
    
  if (services === null) throw new Error("Impossible to load services");
  
  services = await Promise.all(services.map(s => translator(supabase, s, locale)));

  const { data: abilities } = await supabase
    .from("abilities")
    .select(`
      *,
      project_abilities!inner(
        project:projects!inner(
          main_category_slug
        )
      )
    `)
    .eq("project_abilities.project.active", true)
    .eq("project_abilities.project.main_category_slug", env.category);

  if (abilities === null) throw new Error("Impossible to load abilities");

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col gap-4 items-center cursor-default select-none">
        <Heading variant="h1" className="text-center">{t("title")}</Heading>
        <ul className="list-disc pl-5">
          { services.map(s => <li key={s.slug}>{s.description}</li>) }
        </ul>
      </div>
      <Xylophone bars={abilities.length}>
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center max-w-sm">
          { abilities.map(a => <AbilityButton key={a.name} data={a} />) }
        </div>
      </Xylophone>
    </div>
  );
}
