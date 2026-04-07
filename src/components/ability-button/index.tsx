"use client";

import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { XylophoneButton } from "@/feat/xylophone";
import type { Database } from "@/db/supabase/types";

type Ability = Database["public"]["Tables"]["abilities"]["Row"];

interface Props {
  position?: number;
  data: Ability;
}

export default function AbilityButton(props: Props) {
  const { position = 1, data } = props;

  const Icon = icons[data.icon as keyof typeof icons] ?? CodeIcon;

  return (
    <XylophoneButton bar={position} asChild>
      <Link href={`/projects?abilities:has=${data.slug}`}>
        <Icon size={24} />
      </Link>
    </XylophoneButton>
  )
}
