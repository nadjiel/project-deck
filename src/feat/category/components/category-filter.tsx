"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useFilters } from "@/hooks/use-filters";
import type { Tables } from "@/db/supabase/types";
import { cn } from "@/lib/utils";

type Category = Tables<"categories">;

interface Props {
  categories: Category[];
}

export default function CategoryFilter(props: Props) {
  const { categories } = props;

  const t = useTranslations("category_filter");
  
  const anchor = useComboboxAnchor();
  
  const { activeFilters, setFilter } = useFilters(["categories"]);

  const value = activeFilters
    .filter(f => f.operator === "has")
    .flatMap(f => f.values)
    .map(slug => categories.find(c => c.slug === slug))
    .filter((c): c is Category => c !== undefined);

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [activeFilters]);

  function handleValueChange(value: (Category | undefined)[]) {
    const next = value.filter((v): v is Category => typeof v === "object" && v !== undefined);
    setInternalValue(next); // optimistic — instant
    setFilter("categories", next.map(v => v.slug), "has"); // async sync
  }
  
  return (
    <Combobox
      multiple
      autoHighlight
      items={categories}
      value={internalValue}
      onValueChange={handleValueChange}
    >
      <ComboboxChips ref={anchor} className={cn(
        "relative w-full max-w-xs max-h-9 flex-nowrap gap-0 overflow-x-auto p-0",
        "[&::-webkit-scrollbar]:h-0",
      )}>
        <ComboboxValue>
          {(values: Category[]) => values.map((value) => (
            <ComboboxChip key={value.slug} className="ml-1.5 last-of-type:mr-1.5 text-background">{value.name}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          placeholder={t("placeholder")}
          className="sticky right-0 px-2 w-full h-full min-w-1/3 bg-background"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{t("no_categories")}</ComboboxEmpty>
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
