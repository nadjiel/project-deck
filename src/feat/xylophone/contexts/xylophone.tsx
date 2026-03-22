"use client";

import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import chroma from "chroma-js";
import { getVariable } from "@/lib/css";
import Synth from "@/feat/xylophone/lib/xylophone";

const DEFAULT_GRADIENT = "#011932";

interface XylophoneBar {
  color: string;
  note: string;
  play: () => void;
}

interface XylophoneValue {
  gradient: string[];
  baseNote: string;
  bars: number;
  synth: Synth | null;
}

interface Props extends PropsWithChildren {
  gradient?: string[];
  baseNote?: string;
  bars: number;
}

const defaultValue: XylophoneValue = {
  gradient: [],
  baseNote: "C4",
  bars: 1,
  synth: null,
};

const Context = createContext<XylophoneValue>(defaultValue);

export default function Xylophone(props: Props) {
  const {
    gradient: propGradient,
    baseNote = "C4",
    bars,
    children
  } = props;

  const [gradient, setGradient] = useState(propGradient ?? [DEFAULT_GRADIENT]);
  const [synth, setSynth] = useState<Synth | null>(null);

  useEffect(() => {
    setSynth(new Synth());

    if (propGradient) return;

    setGradient([
      chroma(getVariable("c-background")).brighten().hex(),
      chroma(getVariable("primary")).hex(),
    ]);
  }, []);

  return (
    <Context.Provider value={{
      gradient,
      baseNote,
      bars,
      synth
    }}>
      {children}
    </Context.Provider>
  );
}

export function useXylophone(bar: number): XylophoneBar {
  const { gradient, bars, synth } = useContext(Context);

  if (bar < 0 || bar >= bars) throw new Error(`Bar must be between 0 and ${bars - 1}! Got ${bar}.`)

  const defaultNote = "C4";

  return {
    color: chroma.scale(gradient).colors(bars)[bar],
    note: defaultNote,
    play: (note = defaultNote) => synth?.play(note)
  };
}
