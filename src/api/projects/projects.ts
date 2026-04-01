import { createClient } from "@/db/supabase/server";
import type { Project, ProjectFeature } from "./types";

const joins: Record<ProjectFeature, string> = {
  abilities: `
    abilities:project_abilities (
      level,
      ability:abilities (
        name,
        icon
      )
    )
  `,
  related_projects: `
    related_projects:project_relations!relater_project_id (
      project:projects!related_project_id (
        *
      )
    )
  `,
  files: `
    files:project_files (
      file:files (
        *
      )
    )
  `,
  logo: `
    logo:files (
      *
    )
  `,
  category: `
    category:categories (
      *
    )
  `,
}

export function projector(base: string, features: ProjectFeature[]) {
  return [base, ...features.map(f => joins[f])].join(",\n");
}

export function selector<const Features extends ProjectFeature[]>(
  supabase: ReturnType<typeof createClient>,
  features: Features,
) {
  return supabase
    .from("projects")
    .select<string, Project<Features[number]>>(projector("*", features));
}

export async function translator<F extends ProjectFeature, P extends Project<F>>(
  supabase: ReturnType<typeof createClient>,
  project: P,
  language: string,
) {
  const [
    { data: projectTranslation },
    { data: categoryTranslation },
  ] = await Promise.all([
    supabase
      .from("project_translations")
      .select(`*`)
      .eq("language_code", language)
      .eq("project_id", project.id)
      .limit(1)
      .single(),
    "category" in project
      ? supabase
          .from("category_translations")
          .select(`*`)
          .eq("language_code", language)
          .eq("category_slug", project.category?.slug ?? "")
          .limit(1)
          .single()
      : { data: null },
  ]);

  let result = { ...project } as any;

  result.description = projectTranslation?.description ?? project.description;

  if ("category" in project) {
    result.category.name = categoryTranslation?.name ?? project.category?.name;
  }
  
  return result as P;
}
