"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import type { Database } from "@/db/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface Props extends ComponentProps<"article"> {
  data: Project;
}

export default function ProjectCard(props: Props) {
  const { data, className } = props;

  const [icon, setIcon] = useState(data.icon || logo.src);

  const AbilityIcon = icons[data.ability_icon as keyof typeof icons] ?? CodeIcon;

  return (
    <article className={cn("relative flex flex-col justify-center items-center border-16 rounded-lg bg-background min-w-sm aspect-3/4", className)}>
      <header className="absolute -top-4 -left-4 flex justify-between items-center w-full">
        <div className="bg-border p-6 rounded-xl text-background">
          <AbilityIcon size={32} />
        </div>
        <Heading>{data.name}</Heading>
      </header>
      <Image
        src={icon}
        alt={data.description ?? `Illustration of the ${data.name} project.`}
        width={256}
        height={256}
        onError={() => setIcon(logo.src)}
        className="max-w-1/2"
      />
      <footer className="absolute -bottom-4 -right-4 flex justify-between items-center w-full rotate-180">
        <div className="bg-border p-6 rounded-xl text-background">
          <AbilityIcon size={32} />
        </div>
        <Heading>{data.name}</Heading>
      </footer>
    </article>
  )
}
