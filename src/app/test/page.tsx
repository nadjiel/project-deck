"use client";

import chroma from "chroma-js";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ComponentProps } from "react";

interface CardData {
  color: string;
}

interface CardProps extends ComponentProps<typeof motion.div> {
  data: CardData;
}

const colors = chroma
  .scale(["red", "yellow", "green", "cyan", "blue", "purple"])
  .mode("lab")
  .colors(10);

const cards = colors.map(c => ({ color: c }));

export function Card({ data, style, className, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    const onPointerUp = e => {
      // tween dragElastic to 0 and flip card
    }

    ref.current?.addEventListener("pointerup", onPointerUp);

    return () => {
      ref.current?.removeEventListener("pointerup", onPointerUp);
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      drag
      dragElastic={0}
      dragConstraints={{
        right: 0,
      }}
      style={{
        backgroundColor: data.color,
        x,
        ...style,
      }}
      className={cn("size-64 cursor-grab active:cursor-grabbing", className)}
      {...props}
    >

    </motion.div>
  );
}

export default function Test() {
  return (
    <div
      className="grid place-items-center flex-1"
    >
      { cards.map(c => (
        <Card
          key={c.color}
          data={c}
          className="col-start-1 row-start-1"
        />
      )) }
    </div>
  );
}
