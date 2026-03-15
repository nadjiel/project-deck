import { cookies } from "next/headers";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CardDialogContent } from "@/components/card-dialog-content";
import { createClient } from "@/db/supabase/server";
import { ProjectDialog, ProjectCard } from "@/feat/project";

export default async function Test() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: project } = await supabase
    .from("projects")
    .select(`
      *,
      abilities:project_abilities (
        level,
        ability:abilities (
          name,
          icon
        )
      ),
      related_projects:project_relations!relater_project_id (
        project:projects!related_project_id (
          *
        )
      )
    `)
    .eq("name", "ReciclAE Website")
    .single();

  if (project === null) throw new Error("Impossible to load project");

  return (
    <>
      <ProjectDialog data={project} />
      <Dialog >
        <DialogTrigger>Open</DialogTrigger>
        <CardDialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <ProjectDialog data={project} />
        </CardDialogContent>
      </Dialog>
      {/* <ProjectCard data={project} /> */}
    </>
  );
}
