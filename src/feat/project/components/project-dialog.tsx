"use client";

import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { createClient } from "@/db/supabase/client";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getIcon } from "@/lib/icon";
import { formatUrl } from "@/lib/url";
import logo from "@/assets/logo.svg";
import type { Project } from "@/feat/project/types";

interface Props {
  data: Project<"related_projects" | "abilities" | "logo" | "category">;
}

export default function ProjectDialog(props: Props) {
  const { data } = props;
  
  const supabase = createClient();

  const { data: logoUrl } = data.logo
    ? supabase
      .storage
      .from("public-uploads")
      .getPublicUrl(data.logo.path)
    : {};

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
    <article className="flex flex-col gap-4 border-16 rounded-lg bg-background p-4 max-w-2xl">
      <header className="flex justify-between items-center">
        <div>
          <Heading variant="h2">{data.name}</Heading>
          <Paragraph>{data.category?.name}</Paragraph>
        </div>
        <div className="flex gap-1">
          { dateRange.flatMap((d, i) => [
            i > 0 && <span key={`sep-${i}`}>•</span>,
            <span key={d}>{d}</span>,
          ]) }
        </div>
      </header>
      <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <Paragraph>{data.description}</Paragraph>
          <table>
            <tbody className="grid grid-cols-[repeat(2,max-content)] grid-rows-2 gap-x-2">
              {
                data.repository && <tr className="grid grid-cols-subgrid col-span-2">
                  <th scope="row" className="text-start">Repository:</th>
                  <td>
                    <a
                      href={data.repository ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatUrl(data.repository ?? "")}
                    </a>
                  </td>
                </tr>
              }
              {
                data.deployment && <tr className="grid grid-cols-subgrid col-span-2">
                  <th scope="row" className="text-start">Deployment:</th>
                  <td>
                    <a
                      href={data.deployment ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {formatUrl(data.deployment ?? "")}
                    </a>
                  </td>
                </tr>
              }
            </tbody>
          </table>
          {
            data.related_projects.length > 0 && (
              <div>
                { data.related_projects.map(({ project: p }) => (
                  <Link key={p.id} href={`/projects/${p.slug}`}>{p.name}</Link>
                ))}
              </div>
            )
          }
        </div>
        <aside className="flex flex-col gap-4 my-4 px-4 w-full">
          <Image
            src={logoUrl?.publicUrl || logo.src}
            alt={`Logo of the ${data.name} project.`}
            width={720}
            height={720}
          />
          <ul className="flex gap-2 justify-center">
            {
              data.abilities
                .map(a => {
                  const Icon = getIcon(a.ability.icon ?? undefined);

                  return <li key={a.ability.name}><Icon size={24} /></li>
                })
            }
          </ul>
        </aside>
      </div>
    </article>
  )
}
