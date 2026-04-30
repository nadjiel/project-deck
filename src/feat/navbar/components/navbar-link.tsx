"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { LinkData } from "@/feat/navbar/types";

interface Props {

  /**
   * The data needed to render this {@link NavbarLink `NavbarLink`}.
   */
  data: LinkData;

}

/**
 * A link for the navbar, which shows an icon clickable to navigate
 * to somewhere.
 * 
 * Both the `icon` and `href` are defined in the `data` prop.
 */
export default function NavbarLink(props: Props) {
  const { data } = props;

  const pathname = usePathname();

  return (
    <Link
      href={data.href}
      className={cn(
        "block p-2 rounded-lg hover:bg-background/25",
        pathname === data.href && "bg-background/25"
      )}
    >{data.icon}</Link>
  );
}
