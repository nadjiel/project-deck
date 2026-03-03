import { Fragment } from "react/jsx-runtime";
import Link from "next/link";
import {
  BookImageIcon,
  PaletteIcon,
  GalleryHorizontalEndIcon,
  PhoneIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/about", icon: <BookImageIcon /> },
  { href: "/abilities", icon: <PaletteIcon /> },
  { href: "/projects", icon: <GalleryHorizontalEndIcon /> },
  { href: "/contact", icon: <PhoneIcon /> },
];

export default function Navbar() {
  return (
    <nav className="flex bg-foreground text-background p-4 rounded-xl">
      <ul className="flex gap-4">
        { links.flatMap((l, i) => [
          i > 0 && <Separator key={`sep-${i}`} orientation="vertical" />,
          <li key={l.href}><Link href={l.href}>{l.icon}</Link></li>,
        ]) }
      </ul>
    </nav>
  );
}
