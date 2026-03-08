"use client";

import { useState } from "react";
import Image from "next/image";
import * as icons from "react-icons/si";
import { Heading } from "@/components/ui/typography";
import logo from "@/assets/logo.svg";
import type { Project } from "@/api";

interface Props {
  data: Project;
}

export default function ProjectCard(props: Props) {
  const { data } = props;

  const [icon, setIcon] = useState(data.icon || logo.src);

  const AbilityIcon = icons[data.abilityIcon as keyof typeof icons];

  return (
    <article className="relative flex flex-col justify-center items-center border-16 rounded-lg aspect-3/4 bg-background">
      <header className="absolute -top-4 -left-4 flex justify-between items-center w-full">
        <div className="bg-border p-8 rounded-xl text-background">
          <AbilityIcon size={32} />
        </div>
        <Heading>{data.name}</Heading>
      </header>
      <Image
        src={icon}
        alt={data.description}
        width={256}
        height={256}
        onError={() => setIcon(logo.src)}
      />
      <footer className="absolute -bottom-4 -right-4 flex justify-between items-center w-full rotate-180">
        <div className="bg-border p-8 rounded-xl text-background">
          <AbilityIcon size={32} />
        </div>
        <Heading>{data.name}</Heading>
      </footer>
    </article>
  )
}
