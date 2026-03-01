import { PaletteIcon, EarthIcon, VolumeXIcon, PauseIcon } from "lucide-react";
import type { ComponentProps } from "react";

export default function OptionPanel(props: ComponentProps<"ul">) {
  return (
    <ul {...props}>
      <li><PaletteIcon /></li>
      <li><EarthIcon /></li>
      <li><VolumeXIcon /></li>
      <li><PauseIcon /></li>
    </ul>
  );
}
