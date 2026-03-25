"use client";

import { EarthIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = [
  { locale: "en", name: "English" },
  { locale: "pt", name: "Português" },
  { locale: "es", name: "Español" },
  { locale: "fr", name: "Français" },
  { locale: "ja", name: "日本語" },
]

export default function LocaleButton() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const setLocale = (locale: string) => {
    router.replace(pathname, { locale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><EarthIcon /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        { locales.map(l => (
          <DropdownMenuItem
            key={l.locale}
            disabled={l.locale === locale}
            onClick={() => setLocale(l.locale)}
          >
            {l.name}
          </DropdownMenuItem>
        )) }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
