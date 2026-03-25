"use client";

import chroma from "chroma-js";
import { motion, useMotionValue, useDragControls, animate } from "motion/react";
import { cn } from "@/lib/utils";
import { useRef, useState, type ComponentPropsWithRef } from "react";

interface CardData {
  color: string;
}

interface CardProps extends ComponentPropsWithRef<typeof motion.div> {
  data: CardData;
}

const colors = chroma
  .scale(["red", "yellow", "green", "cyan", "blue", "purple"])
  .mode("lab")
  .colors(10);

const cards = colors.map(c => ({ color: c }));

let cardRender = 0;

export function Card({ data, style, className, ...props }: CardProps) {
  return (
    <motion.div
      style={{
        backgroundColor: data.color,
        ...style,
      }}
      className={cn("size-64 rounded-lg", className)}
      {...props}
    >

    </motion.div>
  );
}

export default function Test() {
  const x = useMotionValue(0);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragRef = useRef<HTMLDivElement>(null);

  const dragControls = useDragControls();

  const centerCard = (index: number) => {
    const container = dragRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerWidth = container.offsetWidth;
    const cardOffsetLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;

    // Calculate x needed to center the card
    const centeredX = -(cardOffsetLeft - containerWidth / 2 + cardWidth / 2);
    
    const clamped = Math.max(Math.min(centeredX, 0), centeredX - container.scrollWidth);
    
    console.log({ scrollWidth: container.scrollWidth, centeredX, containerWidth })

    animate(x, clamped, { type: "spring", stiffness: 300, damping: 30 });
  }

  return (
    <div
      ref={dragRef}
      onPointerDown={(event) => dragControls.start(event)}
      className="flex flex-col justify-center flex-1 overflow-x-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={dragRef}
        dragControls={dragControls}
        style={{
          x: x,
        }}
        className="flex gap-8 p-8 w-max"
      >
        { cards.map((c, i) => (
          <Card
            key={c.color}
            ref={(el) => { cardRefs.current[i] = el }}
            data={c}
            onClick={() => centerCard(i)}
            className=""
          />
        )) }
      </motion.div>
    </div>
  );
}
