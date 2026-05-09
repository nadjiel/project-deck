"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from "@/components/ui/combobox";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/utils";
import type { Tables } from "@/db/supabase/types";

type Ability = Tables<"abilities">;

interface Props {
  abilities: Ability[];
}

export default function AbilityFilter(props: Props) {
  const { abilities } = props;

  const t = useTranslations("ability_filter");
  
  const anchor = useComboboxAnchor();
  
  const { activeFilters, setFilter } = useFilters(["abilities"]);

  const value = activeFilters
    .filter(f => f.operator === "has")
    .flatMap(f => f.values)
    .map(slug => abilities.find(a => a.slug === slug))
    .filter((a): a is Ability => a !== undefined);

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [activeFilters]);

  function handleValueChange(value: (Ability | undefined)[]) {
    const next = value.filter((v): v is Ability => typeof v === "object" && v !== undefined);
    setInternalValue(next); // optimistic — instant
    setFilter("abilities", next.map(v => v.slug), "has"); // async sync
  }
  
  return (
    <Combobox
      multiple
      autoHighlight
      items={abilities}
      value={internalValue}
      onValueChange={handleValueChange}
    >
      <ComboboxChips ref={anchor} className={cn(
        "relative w-full max-w-xs max-h-9 flex-nowrap gap-0 overflow-x-auto p-0",
        "[&::-webkit-scrollbar]:h-0",
      )}>
        <ComboboxValue>
          {(values: Ability[]) => values.map((value) => (
            <ComboboxChip key={value.slug} className="ml-1.5 last-of-type:mr-1.5 text-background">{value.name}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          placeholder={t("placeholder")}
          className="sticky right-0 px-2 w-full h-full min-w-1/3 bg-background"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{t("no_items")}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.slug} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
