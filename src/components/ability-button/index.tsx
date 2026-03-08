import * as icons from "react-icons/si";
import { XylophoneButton } from "@/feat/xylophone";
import type { Ability } from "@/api";

interface Props {
  data: Ability;
}

export default function AbilityButton(props: Props) {
  const { data } = props;

  const Icon = icons[data.icon as keyof typeof icons];

  return (
    <XylophoneButton bar={data.id - 1}><Icon size={24} /></XylophoneButton>
  )
}
