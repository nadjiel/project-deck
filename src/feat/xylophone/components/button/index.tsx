"use client";

import chroma from "chroma-js";
import { Button } from "@/components/ui/button";
import { useXylophone } from "@/feat/xylophone/contexts/xylophone";
import type { ComponentProps, CSSProperties } from "react";

interface Props extends ComponentProps<typeof Button> {
  bar?: number;
}

export default function XylophoneButton(props: Props) {
  const { bar = 0, onClick, ...rest } = props;

  const { color, play } = useXylophone(bar);

  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: chroma(color).darken(0.5).hex(),
  }

  return (
    <Button
      variant="tactile"
      size="icon-xl"
      style={style}
      onClick={e => { play(); onClick?.(e); }}
      {...rest}
    />
  );
}
