"use client";

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

  const values = categories.map(c => c.slug);
  
  const anchor = useComboboxAnchor();

  const { activeFilters, setFilter, getFilter } = useFilters(["categories"]);

  return (
    <Combobox
      multiple
      autoHighlight
      items={values}
      defaultValue={[values[0]]}
    >
      <ComboboxChips ref={anchor} className={cn(
        "relative w-full max-w-xs max-h-9 flex-nowrap gap-0 overflow-x-auto p-0",
        "[&::-webkit-scrollbar]:h-0",
      )}>
        <ComboboxValue>
          {(values) => values.map((value: string) => (
            <ComboboxChip key={value} className="ml-1.5 last-of-type:mr-1.5 text-background">{value}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput
          placeholder="Categories..."
          className="sticky right-0 px-2 w-full h-full min-w-1/3 bg-red-400"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No categories to filter.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
