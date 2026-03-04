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
    <nav className="flex bg-foreground text-background p-2 rounded-xl fixed bottom-8 left-1/2 -translate-x-1/2">
      <ul className="flex gap-2">
        { links.flatMap((l, i) => [
          i > 0 && <Separator key={`sep-${i}`} orientation="vertical" />,
          <li key={l.href}>
            <Link href={l.href} className="block p-2 rounded-lg hover:bg-background/25">{l.icon}</Link>
          </li>,
        ]) }
      </ul>
    </nav>
  );
}
