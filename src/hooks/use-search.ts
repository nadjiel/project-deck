"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UseSearchOptions {
  /** Debounce delay in ms before updating the URL. Defaults to 0 (immediate). */
  debounce?: number;
  /** Replace instead of push to the history stack. Defaults to true. */
  replace?: boolean;
}

interface UseSearchReturn {
  /** The current search value from the `_search` query param. */
  search: string;
  /** Update the search value. Pass an empty string or undefined to clear. */
  setSearch: (value: string) => void;
  /** Clear the search param entirely. */
  clearSearch: () => void;
}

const SEARCH_PARAM = "_search";

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { replace = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = useMemo(
    () => searchParams.get(SEARCH_PARAM) ?? "",
    [searchParams]
  );

  const buildUrl = useCallback(
    (value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(SEARCH_PARAM, value);
      } else {
        params.delete(SEARCH_PARAM);
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

  const setSearch = useCallback(
    (value: string) => {
      navigate(buildUrl(value || undefined));
    },
    [navigate, buildUrl]
  );

  const clearSearch = useCallback(() => {
    navigate(buildUrl(undefined));
  }, [navigate, buildUrl]);

  return { search, setSearch, clearSearch };
}
