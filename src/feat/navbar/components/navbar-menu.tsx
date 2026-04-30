import {
  BookImageIcon,
  PaletteIcon,
  GalleryHorizontalEndIcon,
  PhoneIcon,
  FlaskConicalIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavbarLink } from "@/feat/navbar";
import type { LinkData } from "@/feat/navbar/types";

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

/**
 * A menu that shows the main navigation links for this site.
 * 
 * The links used are defined by the {@link links `links`} and
 * {@link developmentLinks `developmentLinks`}
 * (when in development environment) constants.
 */
export default function NavbarMenu() {
  return (
    <nav className="flex bg-foreground text-background p-2 rounded-xl fixed bottom-8 left-1/2 -translate-x-1/2 z-1">
      <ul className="flex gap-2">
        { links.flatMap((l, i) => [
          i > 0 && <Separator key={`sep-${i}`} orientation="vertical" />,
          <li key={l.href}><NavbarLink data={l} /></li>,
        ]) }
      </ul>
    </nav>
  );
}
