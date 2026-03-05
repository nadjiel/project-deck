import { PaletteIcon, EarthIcon, VolumeXIcon, PauseIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function OptionPanel(props: ComponentProps<"ul">) {
  const { className, ...rest } = props;

  return (
    <ul className={cn("flex gap-2 [&_button]:rounded-full", className)} {...rest}>
      <li><Button variant="ghost" size="icon"><PaletteIcon /></Button></li>
      <li><Button variant="ghost" size="icon"><EarthIcon /></Button></li>
      <li><Button variant="ghost" size="icon"><VolumeXIcon /></Button></li>
      <li><Button variant="ghost" size="icon"><PauseIcon /></Button></li>
    </ul>
  );
}
