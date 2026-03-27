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
  data: Project<"related_projects" | "abilities" | "logo">;
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
    <article className="border-16 rounded-lg bg-background p-4">
      <header className="flex justify-between items-center">
        <Heading variant="h2">{data.name}</Heading>
        <div className="flex gap-2">
          { dateRange.flatMap((d, i) => [
            i > 0 && <span key={`sep-${i}`}>•</span>,
            <span key={d}>{d}</span>,
          ]) }
        </div>
      </header>
      <div className="flex flex-col-reverse items-center sm:flex-row sm:items-start gap-4">
        <div className="flex flex-col gap-2">
          <Paragraph>{data.description}</Paragraph>
          <table>
            <tbody>
              {
                data.repository && <tr>
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
                data.deployment && <tr>
                  <th scope="row">Deployment:</th>
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
          <div>
            { data.related_projects.map(({ project: p }) => <Link key={p.id} href={`/projects/${p.slug}`}>{p.name}</Link>)}
          </div>
        </div>
        <aside>
          <Image
            src={logoUrl?.publicUrl || logo.src}
            alt="Something"
            width={256}
            height={256}
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
