import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for internal Next.js ones
  matcher: ["/", "/(es|en|pt|fr|ja)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
