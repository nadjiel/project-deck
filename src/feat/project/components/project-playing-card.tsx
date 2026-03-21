"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import { motion } from "motion/react";
import { Heading } from "@/components/ui/typography";
import logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";
import type { Project } from "@/feat/project";

interface Props extends ComponentProps<typeof motion.article> {
  data: Project<"abilities">;
}

export default function ProjectPlayingCard(props: Props) {
  const {
    data,
    className,
    ...rest
  } = props;

  const abilities = data.abilities.toSorted((a, b) => b.level - a.level);

  const [icon, setIcon] = useState(data.icon || logo.src);

  const AbilityIcon = icons[abilities[0]?.ability.icon as keyof typeof icons] ?? CodeIcon;

  return (
    <motion.article
      drag={true}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      dragElastic={0.75}
      className={cn(
        "relative flex flex-col justify-center items-center border-16 rounded-lg bg-background aspect-3/4",
        className
      )}
      {...rest}
    >
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
        draggable={false}
        className="max-w-1/2"
      />
      <footer className="absolute -bottom-4 -right-4 flex justify-between items-center w-full rotate-180">
        <div className="bg-border p-6 rounded-xl text-background">
          <AbilityIcon size={32} />
        </div>
        <Heading>{data.name}</Heading>
      </footer>
    </motion.article>
  )
}
