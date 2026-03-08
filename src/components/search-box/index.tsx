"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";

export default function SearchBox() {
  const { internalSearch, setSearch } = useSearch({ debounce: 1000 });

  return (
    <Input
      value={internalSearch}
      onChange={e => setSearch(e.target.value)}
    />
  );
}
