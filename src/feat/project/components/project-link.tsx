import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { Project } from "@/feat/project/types";

interface Props {
  data: Project;
}

export default function ProjectLink(props: Props) {
  const { data } = props;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          key={data.id}
          href={`/projects/${data.slug}`}
          target="_blank"
          className={cn(
            "flex items-center leading-tight",
            "pr-4 [&>div]:w-0 transition-all hover:underline hover:pr-0 hover:[&>div]:w-4",
          )}
        >
          <span>{data.name}</span>
          <div className="overflow-hidden transition-all">
            <ArrowUpRightIcon size="16" />
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>{data.description}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
