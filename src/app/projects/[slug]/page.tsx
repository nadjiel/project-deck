import { cookies } from "next/headers";
import { createClient } from "@/db/supabase/server";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CardDialogContent } from "@/components/card-dialog-content";
import ProjectPage from "@/app/projects/page";
import { ProjectDialog } from "@/feat/project";

export default async function Project(props: PageProps<"/projects/[slug]">) {
  const { params } = props;

  const { slug } = await params;

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
    .eq("slug", slug)
    .single();

  if (project === null) throw new Error("Impossible to load project");

  console.log(slug)

  return (
    <>
      <ProjectPage />
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
    </>
  );
}
