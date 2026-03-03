import {
  BookImageIcon,
  PaletteIcon,
  GalleryHorizontalEndIcon,
  PhoneIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  return (
    <nav className="flex bg-foreground text-background p-4 rounded-xl">
      <ul className="flex gap-4">
        <li><BookImageIcon /></li>
        <Separator orientation="vertical" />
        <li><PaletteIcon /></li>
        <Separator orientation="vertical" />
        <li><GalleryHorizontalEndIcon /></li>
        <Separator orientation="vertical" />
        <li><PhoneIcon /></li>
      </ul>
    </nav>
  );
}
