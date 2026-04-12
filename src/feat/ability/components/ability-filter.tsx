"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { PaletteIcon } from "lucide-react";
import type { Tables } from "@/db/supabase/types";
import { useFilters } from "@/hooks/use-filters";

type Ability = Tables<"abilities">;

interface Props {
  abilities: Ability[];
}

export default function AbilityFilter(props: Props) {
  const { abilities } = props;

  const { activeFilters, addFilter, getFilter, removeFilter } = useFilters(["abilities"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <PaletteIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        { abilities.map(a => (
          <DropdownMenuCheckboxItem
            key={a.slug}
            checked={activeFilters.some(f => f.operator === "has" && f.values.includes(a.slug))}
            onClick={() => {
              getFilter("abilities", "has").includes(a.slug) ?
                removeFilter("abilities", a.slug, "has") :
                addFilter("abilities", a.slug, "has")
            }}
          >{a.name}</DropdownMenuCheckboxItem>
        )) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
