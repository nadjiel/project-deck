import { getIcon } from "@/lib/icon";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import type { Tables } from "@/db/supabase/types";
import Link from "next/link";

type Ability = Tables<"abilities">;

interface Props {
  data: Ability;
}

export default function ProjectAbility(props: Props) {
  const { data } = props;

  const Icon = getIcon(data.icon ?? undefined);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/projects?abilities:has=${data.name}`}>
          <Icon size="24" className="hover:scale-125 transition-all" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent>
        {data.name}
      </HoverCardContent>
    </HoverCard>
  )
}
