"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UseLayoutOptions {
  /** Replace instead of push to the history stack. Defaults to true. */
  replace?: boolean;
}

interface UseLayoutReturn<T extends string> {
  /** The current layout value from the `_layout` query param. */
  layout: T | null;
  /** Update the layout value. */
  setLayout: (value?: T) => void;
  /** Clear the layout param entirely. */
  clearLayout: () => void;
}

const LAYOUT_PARAM = "_layout";

export function useLayout<T extends string>(
  layouts: readonly T[],
  options: UseLayoutOptions = {}
): UseLayoutReturn<T> {
  const { replace = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const layout = useMemo(() => {
    const value = searchParams.get(LAYOUT_PARAM);
    return value && (layouts as readonly string[]).includes(value)
      ? (value as T)
      : null;
  }, [searchParams, layouts]);

  const buildUrl = useCallback(
    (value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(LAYOUT_PARAM, value);
      } else {
        params.delete(LAYOUT_PARAM);
      }

      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams]
  );

  const navigate = useCallback(
    (url: string) => {
      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [router, replace]
  );

  const setLayout = useCallback(
    (value?: T) => navigate(buildUrl(value)),
    [navigate, buildUrl]
  );

  const clearLayout = useCallback(
    () => navigate(buildUrl(undefined)),
    [navigate, buildUrl]
  );

  return { layout, setLayout, clearLayout };
}
