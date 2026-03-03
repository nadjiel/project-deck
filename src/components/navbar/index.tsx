import Link from "next/link";
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
        <li><Link href="/about"><BookImageIcon /></Link></li>
        <Separator orientation="vertical" />
        <li><Link href="/abilities"><PaletteIcon /></Link></li>
        <Separator orientation="vertical" />
        <li><Link href="/projects"><GalleryHorizontalEndIcon /></Link></li>
        <Separator orientation="vertical" />
        <li><Link href="/contact"><PhoneIcon /></Link></li>
      </ul>
    </nav>
  );
}
