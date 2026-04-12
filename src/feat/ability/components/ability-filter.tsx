"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";
import { useFilters } from "@/hooks/use-filters";
import type { Tables } from "@/db/supabase/types";

type Ability = Tables<"abilities">;

interface Props {
  abilities: Ability[];
}

export default function AbilityFilter(props: Props) {
  const { abilities } = props;

  const { activeFilters, setFilter } = useFilters(["abilities"]);

  const [internalFilters, setInternalFilters] = useState<string[]>(
    activeFilters.map(f => f.operator === "has" ? f.values : []).flat()
  );

  const commitFilters = () => {
    setFilter("abilities", internalFilters, "has");
  }

  const onOpenChange = (open: boolean) => {
    if (!open) commitFilters();
  }

  const onAbilityCheckedChange = (slug: string) => {
    if (internalFilters.includes(slug)) {
      setInternalFilters(internalFilters.filter(s => s !== slug));
    } else {
      setInternalFilters([...internalFilters, slug]);
    }
  }

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        { abilities.map(a => (
          <DropdownMenuCheckboxItem
            key={a.slug}
            checked={internalFilters.includes(a.slug)}
            onSelect={e => e.preventDefault()}
            onCheckedChange={() => onAbilityCheckedChange(a.slug)}
          >{a.name}</DropdownMenuCheckboxItem>
        )) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
