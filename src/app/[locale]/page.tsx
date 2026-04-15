import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import env from "@/config/env";
import { createClient } from "@/db/supabase/server";
import { translator } from "@/api/profiles";
import { Heading, Paragraph } from "@/components/ui/typography";
import CameraRoll from "@/components/camera-roll";

export default async function About(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const t = await getTranslations("Index");

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("category_slug", env.category)
    .limit(1)
    .single();
  
  if (profile === null) throw new Error("Profile not found");
  
  profile = await translator(supabase, profile, locale);

  return (
    <div className="flex flex-col flex-1 gap-4 items-center">
      <CameraRoll />
      <span className="flex flex-col gap-2 text-center cursor-default select-none">
        <Heading variant="h1">{t("greeting")}</Heading>
        <Heading level={1} variant="h2">{profile.name}</Heading>
        <Paragraph className="max-w-sm mt-2">{profile.description}</Paragraph>
      </span>
    </div>
  );
}
