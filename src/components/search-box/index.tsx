"use client";

import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { useSearch } from "@/hooks/use-search";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof InputGroupInput>;

export default function SearchBox(props: Props) {
  const {
    value,
    onChange,
    className,
    ...rest
  } = props;

  const { internalSearch, setSearch } = useSearch({ debounce: 300 });

  return (
    <InputGroup className={className}>
      <InputGroupInput
        value={internalSearch}
        onChange={e => setSearch(e.target.value)}
        {...rest}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
