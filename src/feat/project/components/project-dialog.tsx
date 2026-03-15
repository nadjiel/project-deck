import dayjs from "dayjs";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getIcon } from "@/lib/icon";
import { formatUrl } from "@/lib/url";
import icon from "@/assets/logo.svg";
import type { Tables } from "@/db/supabase/types";

type Ability = Tables<"abilities">;

type ProjectAbility = Pick<Tables<"project_abilities">, "level"> & {
  ability: Ability;
};

type Project = Tables<"projects"> & {
  abilities: ProjectAbility[];
};

interface Props {
  data: Project;
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

  const dateRange = Array.from(new Set([
    dayjs(data.started_at).format("MM/YYYY"),
    dayjs(data.finished_at).format("MM/YYYY"),
  ]));

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
      <div className="flex">
        <div>
          <Paragraph>{data.description}</Paragraph>
          <table>
            <tbody>
              {
                data.repository && <tr>
                  <th scope="row">Repository:</th>
                  <td><a href={data.repository ?? ""} target="_blank" rel="noopener noreferrer">{formatUrl(data.repository ?? "")}</a></td>
                </tr>
              }
              {
                data.deployment && <tr>
                  <th scope="row">Deployment:</th>
                  <td><a href={data.deployment ?? ""} target="_blank" rel="noopener noreferrer">{formatUrl(data.deployment ?? "")}</a></td>
                </tr>
              }
            </tbody>
          </table>
          <div>
            {/* related projects */}
          </div>
        </div>
        <aside>
          <img src={data.icon ?? icon.src} alt="Something" />
          <ul className="flex gap-2">
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
