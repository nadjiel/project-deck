import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getIcon } from "@/lib/icon";
import { formatUrl } from "@/lib/url";
import icon from "@/assets/logo.svg";
import type { Tables } from "@/db/supabase/types";

type Ability = Tables<"abilities">;

type Project = Tables<"projects">;

type ProjectAbility = Pick<Tables<"project_abilities">, "level"> & {
  ability: Ability;
};

type ProjectRelation = {
  project: Project;
};

type ProjectType = Tables<"projects"> & {
  abilities: ProjectAbility[];
  related_projects: ProjectRelation[];
};

interface Props {
  data: ProjectType;
}

// supabase
//   .from('projects')
//   .select(`
//     *,
//     abilities:project_abilities (
//       level,
//       ability:abilities (
//         name,
//         icon
//       )
//     )
//   `)

export default function ProjectDialog(props: Props) {
  const { data } = props;

  const startDate = data.started_at !== null
    && dayjs(data.started_at).format("MM/YYYY");
  const endDate = data.finished_at !== null
    && dayjs(data.finished_at).format("MM/YYYY");

  const dateRange = Array.from(new Set(
    [startDate, endDate].filter(d => d !== null)
  ));

  return (
    <article className="border-16 rounded-lg bg-background p-4 max-w-4xl">
      <header className="flex justify-between items-center">
        <Heading>{data.name}</Heading>
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
            src={data.icon ?? icon.src}
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
