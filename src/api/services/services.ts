import type { Tables } from "@/db/supabase/types";
import { createClient } from "@/db/supabase/server";

type Service = Tables<"services">;

export async function translator(
  supabase: ReturnType<typeof createClient>,
  service: Service,
  language: string,
) {
  const { data: translation } = await supabase
    .from("service_translations")
    .select(`*`)
    .eq("language_code", language)
    .eq("service_slug", service.slug)
    .limit(1)
    .single();

  let result = { ...service };

  if(translation?.description) result.description = translation.description;
  
  return result;
}
