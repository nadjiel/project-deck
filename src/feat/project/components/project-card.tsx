"use client";

import { useState, type ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import { createClient } from "@/db/supabase/client";
import { Heading } from "@/components/ui/typography";
import { cn, joinif } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import type { Project } from "@/api/projects";

type LinkProps = ComponentProps<typeof Link>;

interface Props extends Omit<LinkProps, "href"> {
  data: Project<"abilities" | "related_projects" | "logo">;
  href?: LinkProps["href"];
}

export default function ProjectCard(props: Props) {
  const {
    data,
    href,
    className,
    ...rest
  } = props;

  const supabase = createClient();

  const { data: logoUrl } = data.logo
    ? supabase
      .storage
      .from("public-uploads")
      .getPublicUrl(data.logo.path)
    : {};

  const abilities = data.abilities.toSorted((a, b) => b.level - a.level);

  const [icon, setIcon] = useState(logoUrl?.publicUrl || logo.src);

  const searchParams = useSearchParams();

  const AbilityIcon = icons[abilities[0]?.ability.icon as keyof typeof icons] ?? CodeIcon;

  return (
    <Link
      href={href ?? joinif(`/projects/${data.slug}`, "?", searchParams.toString())}
      {...rest}
    >
      <article
        className={cn(
          "relative flex flex-col justify-center items-center border-16 rounded-lg bg-background aspect-3/4",
          className,
        )}
      >
        <header className="absolute -top-4 -left-4 flex gap-2 w-[calc(100%+2rem)] pr-8">
          <div className="bg-border h-min p-4 rounded-xl text-background">
            <AbilityIcon size={32} />
          </div>
          <Heading variant="h2" className="w-full mt-4 truncate">{data.name}</Heading>
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
        <footer className="absolute -bottom-4 -right-4 flex gap-2 w-[calc(100%+2rem)] pr-8 rotate-180">
          <div className="bg-border h-min p-4 rounded-xl text-background">
            <AbilityIcon size={32} />
          </div>
          <Heading variant="h2" className="w-full mt-4 truncate">{data.name}</Heading>
        </footer>
      </article>
    </Link>
  )
}
