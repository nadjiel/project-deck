"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Input>;

export default function SearchBox(props: Props) {
  const {
    value,
    onChange,
    ...rest
  } = props;

  const { internalSearch, setSearch } = useSearch({ debounce: 300 });

  return (
    <Input
      value={internalSearch}
      onChange={e => setSearch(e.target.value)}
      {...rest}
    />
  );
}
