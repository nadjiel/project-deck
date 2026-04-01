import type { Tables } from "@/db/supabase/types";

type AbilityTable = Tables<"abilities">;

type ProjectTable = Tables<"projects">;

type ProjectAbilityTable = Tables<"project_abilities">;

type ProjectTranslationTable = Tables<"project_translations">;

type FileTable = Tables<"files">;

type CategoryTable = Tables<"categories">;

type AbilityRelation = Pick<ProjectAbilityTable, "level"> & {
  ability: AbilityTable;
};

type ProjectRelation = {
  project: ProjectTable;
};

type FileRelation = {
  file: FileTable;
};

export type ProjectFeature = "abilities" | "related_projects" | "files" | "logo" | "category";

export type Project<
  Features extends ProjectFeature = never
> =
  ProjectTable
  & ("abilities" extends Features ? { abilities: AbilityRelation[] } : {})
  & ("related_projects" extends Features ? { related_projects: ProjectRelation[] } : {})
  & ("files" extends Features ? { files: FileRelation[] } : {})
  & ("logo" extends Features ? { logo: FileTable | null } : {})
  & ("category" extends Features ? { category: CategoryTable | null } : {});
