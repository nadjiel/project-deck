"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

const HEADING_TYPES = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingLevel = typeof HEADING_LEVELS[number];

type HeadingType = typeof HEADING_TYPES[number];

const headingVariants = cva(
  "",
  {
    variants: {
      variant: {
        h1: "font-medium text-4xl",
        h2: "font-medium text-2xl",
        h3: "font-medium text-2xl",
        h4: "font-medium text-2xl",
        h5: "font-medium text-2xl",
        h6: "font-medium text-2xl",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  }
);

interface HeadingProps extends
  React.ComponentProps<HeadingType>,
  VariantProps<typeof headingVariants>
{
  level?: HeadingLevel;
};

function Heading(props: HeadingProps) {
  const {
    level = 1,
    variant = "h" + level as HeadingType,
    children,
    className,
    ...rest
  } = props;

  const Comp = "h" + level as HeadingType;

  return (
    <Comp
      className={cn(headingVariants({ variant, className }))}
      {...rest}
    >
      {children}
    </Comp>
  )
}

type ParagraphProps = React.ComponentProps<"p">;

function Paragraph(props: ParagraphProps) {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <p
      className={cn("", className)}
      {...rest}
    >
      {children}
    </p>
  )
}

export { Heading, Paragraph };
