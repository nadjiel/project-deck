"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import logo from "@/assets/logo.svg";
import type { Project, ProjectCard } from "@/feat/project";

interface Props extends ComponentProps<"article"> {
  data: Project<"abilities">;
}

/**
 * @deprecated Just use the {@link ProjectCard} instead.
 */
export default function ProjectCardSquare(props: Props) {
  const {
    data,
    style,
    className,
    ...rest
  } = props;

  const abilities = data.abilities.toSorted((a, b) => b.level - a.level);

  const [icon, setIcon] = useState(data.icon || logo.src);

  const AbilityIcon = icons[abilities[0]?.ability.icon as keyof typeof icons] ?? CodeIcon;

  return (
    <article
      className="flex flex-col items-center border-8 rounded-xl aspect-square p-2"
      {...rest}
    >
      <header className="flex gap-2 justify-between w-full">
        <Heading variant="h6">{data.name}</Heading>
        <AbilityIcon size={32} />
      </header>
      <div className="flex flex-col flex-1 justify-center items-center">
        <Image
          src={icon}
          alt={data.description ?? `Illustration of the ${data.name} project.`}
          width={256}
          height={256}
          onError={() => setIcon(logo.src)}
          draggable={false}
          className="max-w-1/2"
        />
      </div>
    </article>
  )
}
