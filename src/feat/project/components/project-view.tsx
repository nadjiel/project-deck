"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { createClient } from "@/db/supabase/client";
import { Heading, Paragraph } from "@/components/ui/typography";
import { formatUrl } from "@/lib/url";
import { ProjectLink, ProjectAbility } from "@/feat/project";
import type { Project } from "@/api/projects";
import { cn } from "@/lib/utils";

interface Props {
  data: Project<"related_projects" | "abilities" | "files" | "logo" | "category">;
}

export default function ProjectView(props: Props) {
  const { data } = props;
  
  const supabase = createClient();

  const { data: logoUrl } = data.logo
    ? supabase
      .storage
      .from("public-uploads")
      .getPublicUrl(data.logo.path)
    : {};
  
  const fileUrls = data.files.map(f => (
    supabase
      .storage
      .from("public-uploads")
      .getPublicUrl(f.file.path)
      .data
  ));

  const startDate = data.started_at !== null
    ? dayjs(data.started_at).format("MM/YYYY")
    : null;
  const endDate = data.finished_at !== null
    ? dayjs(data.finished_at).format("MM/YYYY")
    : null;

  const dateRange = Array.from(new Set(
    [startDate, endDate].filter(d => d !== null)
  ));

  return (
    <section className="max-w-4xl">
      <div className="flex justify-between mb-2">
        <span>{data.category?.name}</span>
        <div className="flex gap-1">
          { dateRange.flatMap((d, i) => [
            i > 0 && <span key={`sep-${i}`}>•</span>,
            <span key={d}>{d}</span>,
          ]) }
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row g-orange-200/25">
        <div className="flex flex-col gap-4 flex-4">
          { logoUrl?.publicUrl && (
            <Image
              src={logoUrl.publicUrl}
              alt={`Logo of the ${data.name} project.`}
              width={720}
              height={720}
              loading="eager"
              className="w-full max-w-md mx-auto my-4"
            />
          ) }
          <Paragraph>{data.description}</Paragraph>
          { data.related_projects.length > 0 && (
            <div>
              <Heading level={2} className="mb-2">Related Projects</Heading>
              <ul>
                { data.related_projects.map(({ project: p }) => (
                  <li key={p.id}><ProjectLink data={p} /></li>
                )) }
              </ul>
            </div>
          ) }
        </div>
        <div className="flex flex-col gap-2 flex-3 g-green-200/25">
          { data.abilities.length > 0 && (
            <div>
              <Heading level={2} className="mb-2">Abilities</Heading>
              <ul className="flex gap-2">
                { data.abilities.map(a => (
                  <li key={a.ability.name}><ProjectAbility data={a.ability} /></li>
                )) }
              </ul>
            </div>
          ) }
          { data.files.length > 0 && (
            <div className={cn(
              "flex gap-4 overflow-x-auto py-2 g-pink-200/25",
              "[&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/25 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full",
            )}>
              { fileUrls.map(f => (
                <Image
                  key={f.publicUrl}
                  src={f.publicUrl}
                  alt={`Picture showing the ${data.name} project.`}
                  width={720}
                  height={720}
                  className="w-full max-h-64 object-contain object-center sm:max-w-sm"
                />
              )) }
            </div>
          ) }
          { (data.repository || data.deployment) && (
            <table>
              <tbody className="grid grid-cols-[min-content_1fr] gap-x-2">
                { data.repository && (
                  <tr className="grid grid-cols-subgrid col-span-2">
                    <th scope="row" className="text-start">Repository:</th>
                    <td className="truncate">
                      <a
                        href={data.repository ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {formatUrl(data.repository ?? "")}
                      </a>
                    </td>
                  </tr>
                ) }
                { data.deployment && (
                  <tr className="grid grid-cols-subgrid col-span-2">
                    <th scope="row" className="text-start">Deployment:</th>
                    <td className="truncate">
                      <a
                        href={data.deployment ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {formatUrl(data.deployment ?? "")}
                      </a>
                    </td>
                  </tr>
                ) }
              </tbody>
            </table>
          ) }
        </div>
      </div>
    </section>
  );
}
