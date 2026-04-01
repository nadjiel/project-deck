import Link from "next/link";
import {
  BookImageIcon,
  PaletteIcon,
  GalleryHorizontalEndIcon,
  PhoneIcon,
  FlaskConicalIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface LinkData {
  href: string;
  icon: ReactNode;
}

const developmentLinks: LinkData[] = [
  { href: "/test", icon: <FlaskConicalIcon /> }
];

const links: LinkData[] = [
  { href: "/", icon: <BookImageIcon /> },
  { href: "/abilities", icon: <PaletteIcon /> },
  { href: "/projects", icon: <GalleryHorizontalEndIcon /> },
  { href: "/contact", icon: <PhoneIcon /> },
  ...(process.env.NODE_ENV === "development" ? developmentLinks : []),
];

export default function Navbar() {
  return (
    <nav className="flex bg-foreground text-background p-2 rounded-xl fixed bottom-8 left-1/2 -translate-x-1/2 z-1">
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
