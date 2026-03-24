import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/ui/typography";
import { Xylophone } from "@/feat/xylophone";
import AbilityButton from "@/components/ability-button";
import { createClient } from "@/db/supabase/server";

export default async function Abilities() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("abilities");

  const { data: abilities } = await supabase.from("abilities").select();

  if (abilities === null) throw new Error("Impossible to load abilities");

  return (
    <div className="flex flex-col flex-1 justify-between items-center">
      <div className="flex flex-col gap-4 items-center">
        <Heading variant="h1">{t("title")}</Heading>
        <ul className="list-disc">
          <li>{t("service1")}</li>
          <li>{t("service2")}</li>
          <li>{t("service3")}</li>
          <li>{t("service4")}</li>
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
