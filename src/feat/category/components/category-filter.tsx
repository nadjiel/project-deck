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
        "relative w-full max-w-xs max-h-9 flex-nowrap overflow-x-auto",
        "[&::-webkit-scrollbar]:h-0",
      )}>
        <ComboboxValue>
          {(values) => (
            <>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder="Categories..."
                className="sticky -right-2 py-2 px-1 bg-background min-w-1/3 w-full"
              />
            </>
          )}
        </ComboboxValue>
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
