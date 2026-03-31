"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { createClient } from "@/db/supabase/client";
import { Paragraph } from "@/components/ui/typography";
import { formatUrl } from "@/lib/url";
import { ProjectLink, ProjectAbility, type Project } from "@/feat/project";

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
    <article className="flex flex-col gap-4">
      <aside className="flex flex-col gap-4 w-full max-w-sm self-center">
        <div className="flex justify-between">
          <p>{data.category?.name}</p>
          <p className="flex gap-1">
            { dateRange.flatMap((d, i) => [
              i > 0 && <span key={`sep-${i}`}>•</span>,
              <span key={d}>{d}</span>,
            ]) }
          </p>
        </div>
        <div className="flex flex-col gap-8">
          { logoUrl?.publicUrl && (
            <Image
              src={logoUrl.publicUrl}
              alt={`Logo of the ${data.name} project.`}
              width={720}
              height={720}
            />
          ) }
          <ul className="flex flex-row justify-center gap-2">
            { data.abilities.map(a => (
              <li key={a.ability.name}><ProjectAbility data={a.ability} /></li>
            )) }
          </ul>
        </div>
      </aside>
      <div className="flex flex-col gap-4 sm:px-8">
        <Paragraph className="max-w-sm self-center">{data.description}</Paragraph>
        <div className="flex gap-4 overflow-x-auto py-2 mx-auto">
          { fileUrls.map(f => (
            <Image
              key={f.publicUrl}
              src={f.publicUrl}
              alt={`Picture showing the ${data.name} project.`}
              width={720}
              height={720}
              className="w-full max-w-xl object-cover"
            />
          )) }
        </div>
        <table className="w-full max-w-sm self-center">
          <tbody className="grid grid-cols-[min-content_1fr] gap-x-2">
            { data.repository && <tr className="grid grid-cols-subgrid col-span-2">
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
            </tr> }
            { data.deployment && <tr className="grid grid-cols-subgrid col-span-2">
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
            </tr> }
          </tbody>
        </table>
        { data.related_projects.length > 0 && (
          <ul>
            { data.related_projects.map(({ project: p }) => (
              <li key={p.id}><ProjectLink data={p} /></li>
            ))}
          </ul>
        ) }
      </div>
    </article>
  )
}
