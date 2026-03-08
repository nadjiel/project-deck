"use client";

import chroma from "chroma-js";
import { Button } from "@/components/ui/button";
import { useXylophone } from "@/feat/xylophone/contexts/xylophone";
import type { CSSProperties, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  bar?: number;
}

export default function XylophoneButton(props: Props) {
  const { bar = 0, children } = props;

  const { color, play } = useXylophone(bar);

  const style: CSSProperties = {
    backgroundColor: color,
    borderColor: chroma(color).darken(0.5).hex(),
  }

  return (
    <Button variant="tactile" size="icon-lg" style={style} onClick={() => play()}>
      {children}
    </Button>
  );
}
