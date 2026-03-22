import type { Tables } from "@/db/supabase/types";

type AbilityTable = Tables<"abilities">;

type ProjectTable = Tables<"projects">;

type ProjectAbilityTable = Tables<"project_abilities">;

type ProjectAbility = Pick<ProjectAbilityTable, "level"> & {
  ability: AbilityTable;
};

type ProjectRelation = {
  project: ProjectTable;
};

export type Project<Features extends "abilities" | "related_projects" = never> =
  ProjectTable
  & ("abilities" extends Features ? { abilities: ProjectAbility[] } : {})
  & ("related_projects" extends Features ? { related_projects: ProjectRelation[] } : {});
