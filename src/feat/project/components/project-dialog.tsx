import { Heading } from "@/components/ui/typography";
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
      <Heading>{data.name}</Heading>
      <p>{data.description}</p>
      <img src={data.icon ?? ""} alt="Something" />
      <ul>
        { data.abilities.map(a => a.ability.icon) }
      </ul>
      <a href={data.repository ?? ""}>{data.repository}</a>
      <a href={data.deployment ?? ""}>{data.deployment}</a>
      <span>{data.started_at}</span>
      <span>{data.finished_at}</span>
    </article>
  )
}
