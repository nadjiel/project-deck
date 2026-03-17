"use client";

import chroma from "chroma-js";
import { motion, useMotionValue, useMotionValueEvent, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ComponentProps } from "react";

interface CardData {
  color: string;
}

interface CardProps extends ComponentProps<typeof motion.div> {
  data: CardData;
  position: number;
}

const colors = chroma
  .scale(["red", "yellow", "green", "cyan", "blue", "purple"])
  .mode("lab")
  .colors(10);

const cards = colors.map(c => ({ color: c }));

let cardRender = 0;

export function Card({ data, position, style, className, ...props }: CardProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  if (data.color === "#800080") console.log(++cardRender)

  useEffect(() => {
    const onPointerUp = () => {
      console.log("Pointer up")
      // animate(scope.current, { x: 0, y: 0, scale: 1.5, opacity: 0 });
    }

    scope.current.addEventListener("pointerup", onPointerUp);

    return () => {
      scope.current.removeEventListener("pointerup", onPointerUp);
    }
  }, [])
  
  return (
    <motion.div
      ref={scope}
      drag
      dragSnapToOrigin
      style={{
        backgroundColor: data.color,
        y: 16 - Math.max(position * 4, 16),
        ...style,
      }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 128) animate(scope.current, { x: "100vw", rotateY: 360 }, { duration: 1 });
        else if (info.offset.x < -128) animate(scope.current, { x: "-100vw", rotateY: -360 }, { duration: 1 })
        else if (info.offset.y < -128) animate(scope.current, { y: "-100vh", rotateY: 360 }, { duration: 1 })
      }}
      className={cn("size-64 rounded-lg cursor-grab active:cursor-grabbing", className)}
      {...props}
    >

    </motion.div>
  );
}

export default function Test() {
  return (
    <div
      className="grid place-items-center flex-1 overflow-hidden"
    >
      { cards.map((c, i) => (
        <Card
          key={c.color}
          position={i}
          data={c}
          className="col-start-1 row-start-1"
        />
      )) }
    </div>
  );
}
