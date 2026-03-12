import { Heading, Paragraph } from "@/components/ui/typography";
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
    <article>
      <header>
        <Heading>{data.name}</Heading>
        <div>
          <span>{data.started_at}</span>
          <span>{data.finished_at}</span>
        </div>
      </header>
      <div className="grid grid-cols-2">
        <div>
          <Paragraph>{data.description}</Paragraph>
        </div>
        <aside className="">
          <img src={data.icon ?? ""} alt="Something" />
          <ul>
            { data.abilities.map(a => a.ability.icon) }
          </ul>
        </aside>
      </div>
      <footer>
        <div>
          <a href={data.repository ?? ""}>{data.repository}</a>
          <a href={data.deployment ?? ""}>{data.deployment}</a>
        </div>
        <div>
          {/* related projects */}
        </div>
      </footer>
    </article>
  )
}
