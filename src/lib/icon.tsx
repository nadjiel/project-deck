import * as icons from "react-icons/si";
import { CodeIcon } from "lucide-react";
import type { ComponentProps, ComponentType } from "react";

export function getIcon(
  slug?: string,
  Fallback: ComponentType<ComponentProps<"svg">> = CodeIcon
) {
  const Icon = icons[slug as keyof typeof icons] ?? Fallback;

  return Icon;
}
