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
