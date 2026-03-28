import type { Tables } from "@/db/supabase/types";

type AbilityTable = Tables<"abilities">;

type ProjectTable = Tables<"projects">;

type ProjectAbilityTable = Tables<"project_abilities">;

type FileTable = Tables<"files">;

type CategoryTable = Tables<"categories">;

type ProjectAbility = Pick<ProjectAbilityTable, "level"> & {
  ability: AbilityTable;
};

type ProjectRelation = {
  project: ProjectTable;
};

export type Project<
  Features extends "abilities" | "related_projects" | "logo" | "category" = never
> =
  ProjectTable
  & ("abilities" extends Features ? { abilities: ProjectAbility[] } : {})
  & ("related_projects" extends Features ? { related_projects: ProjectRelation[] } : {})
  & ("logo" extends Features ? { logo: FileTable | null } : {})
  & ("category" extends Features ? { category: CategoryTable | null } : {});
