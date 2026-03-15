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

  return (
    <article className="border-16 rounded-lg bg-background p-4 max-w-4xl">
      <header>
        <Heading>{data.name}</Heading>
        <div>
          { data.started_at && <span>{new Date(data.started_at).toLocaleDateString()}</span> }
          { data.finished_at && <span>{new Date(data.finished_at).toLocaleDateString()}</span> }
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
