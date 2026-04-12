"use client";

import { SearchIcon, XIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
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

  const { internalSearch, setSearch, clearSearch } = useSearch({ debounce: 300 });

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
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          className="rounded-full"
          onClick={clearSearch}
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
