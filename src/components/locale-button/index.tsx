"use client";

import { EarthIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { cva, type VariantProps } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ComponentProps } from "react";

const variants = cva(
  "",
  {
    variants: {
      size: {
        default: "w-full justify-start",
        icon: "[&>span]:sr-only",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const locales = [
  { locale: "en", name: "English" },
  { locale: "pt", name: "Português" },
  { locale: "es", name: "Español" },
  { locale: "fr", name: "Français" },
  { locale: "ja", name: "日本語" },
];

type Props = ComponentProps<"button"> & VariantProps<typeof variants>;

export default function LocaleButton(props: Props) {
  const { size, className, ...rest } = props;

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("locale_button");

  const setLocale = (locale: string) => {
    router.replace(pathname, { locale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          className={cn(variants({ size, className }))}
          {...rest}
        >
          <EarthIcon />
          <span>{t("content")}</span>
        </Button>
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
