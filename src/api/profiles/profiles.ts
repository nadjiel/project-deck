import type { Tables } from "@/db/supabase/types";
import { createClient } from "@/db/supabase/server";

type Profile = Tables<"profiles">;

export async function translator(
  supabase: ReturnType<typeof createClient>,
  profile: Profile,
  language: string,
) {
  const { data: translation } = await supabase
    .from("profile_translations")
    .select(`*`)
    .eq("language_code", language)
    .eq("profile_id", profile.id)
    .limit(1)
    .single();

  let result = { ...profile };

  if(translation?.name) result.name = translation.name;
  if(translation?.description) result.description = translation.description;
  
  return result;
}
