import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es", "pt", "fr", "ja"],
  defaultLocale: "en",
});

// Navigation helpers that automatically handle the /locale/ prefix
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
