import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type SortDirection = "asc" | "desc";

export interface SortEntry<Keys extends string> {
  key: Keys;
  direction: SortDirection;
}

interface UseSortReturn<Keys extends string> {
  /** Ordered list of active sort entries. */
  sort: SortEntry<Keys>[];

  /** Get the sort entry for a specific key, or undefined if not active. */
  getSort: (key: Keys) => SortEntry<Keys> | undefined;

  /**
   * Set a single sort key and direction, replacing all current sorting.
   * Omitting direction defaults to "asc".
   */
  setSort: (key: Keys, direction?: SortDirection) => void;

  /**
   * Append a sort key to the end of the sort list (for multi-sort).
   * If the key is already present, its direction is updated in place.
   * Omitting direction defaults to "asc".
   */
  addSort: (key: Keys, direction?: SortDirection) => void;

  /**
   * Toggle the direction of a key if already active,
   * or add it as "asc" if not. Replaces all sorting (single-sort mode).
   * Pass `multi: true` to toggle within a multi-sort list instead.
   */
  toggleSort: (key: Keys, options?: { multi?: boolean }) => void;

  /** Remove a single sort key from the list. */
  removeSort: (key: Keys) => void;

  /** Clear all sorting from the URL. */
  clearSort: () => void;

  /** True if any sort is active. */
  hasActiveSort: boolean;
}

interface UseSortOptions {
  /** Replace instead of push to the history stack. Defaults to true. */
  replace?: boolean;
}

const SORT_PARAM = "_sort";
const SEPARATOR = ",";
const DESC_PREFIX = "-";

function encodeSort<Keys extends string>(entries: SortEntry<Keys>[]): string {
  return entries
    .map((e) => (e.direction === "desc" ? `${DESC_PREFIX}${e.key}` : e.key))
    .join(SEPARATOR);
}

function decodeSort<Keys extends string>(
  raw: string,
  allowedSet: Set<Keys>
): SortEntry<Keys>[] {
  return raw
    .split(SEPARATOR)
    .map((token) => token.trim())
    .filter(Boolean)
    .reduce<SortEntry<Keys>[]>((acc, token) => {
      const isDesc = token.startsWith(DESC_PREFIX);
      const key = (isDesc ? token.slice(1) : token) as Keys;
      if (allowedSet.has(key)) {
        acc.push({ key, direction: isDesc ? "desc" : "asc" });
      }
      return acc;
    }, []);
}

export function useSort<Keys extends string>(
  allowedKeys: readonly Keys[],
  options: UseSortOptions = {}
): UseSortReturn<Keys> {
  const { replace = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allowedSet = useMemo(() => new Set(allowedKeys), [allowedKeys]);

  const sort = useMemo<SortEntry<Keys>[]>(() => {
    const raw = searchParams.get(SORT_PARAM);
    if (!raw) return [];
    return decodeSort(raw, allowedSet);
  }, [searchParams, allowedSet]);

  const hasActiveSort = sort.length > 0;

  const navigate = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [router, pathname, replace]
  );

  const cloneParams = useCallback(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const commitSort = useCallback(
    (entries: SortEntry<Keys>[]) => {
      const params = cloneParams();
      if (entries.length === 0) {
        params.delete(SORT_PARAM);
      } else {
        params.set(SORT_PARAM, encodeSort(entries));
      }
      navigate(params);
    },
    [cloneParams, navigate]
  );

  const getSort = useCallback(
    (key: Keys) => sort.find((e) => e.key === key),
    [sort]
  );

  const setSort = useCallback(
    (key: Keys, direction: SortDirection = "asc") => {
      if (!allowedSet.has(key)) return;
      commitSort([{ key, direction }]);
    },
    [allowedSet, commitSort]
  );

  const addSort = useCallback(
    (key: Keys, direction: SortDirection = "asc") => {
      if (!allowedSet.has(key)) return;
      const existing = sort.filter((e) => e.key !== key);
      const updated = sort.find((e) => e.key === key)
        ? sort.map((e) => (e.key === key ? { ...e, direction } : e))
        : [...existing, { key, direction }];
      commitSort(updated);
    },
    [allowedSet, sort, commitSort]
  );

  const toggleSort = useCallback(
    (key: Keys, { multi = false }: { multi?: boolean } = {}) => {
      if (!allowedSet.has(key)) return;
      const existing = sort.find((e) => e.key === key);
      const nextDirection: SortDirection =
        existing?.direction === "asc" ? "desc" : "asc";

      if (multi) {
        // Update in place, or append if not present
        const updated = existing
          ? sort.map((e) => (e.key === key ? { ...e, direction: nextDirection } : e))
          : [...sort, { key, direction: nextDirection }];
        commitSort(updated);
      } else {
        // Replace all sorting with just this key
        commitSort([{ key, direction: nextDirection }]);
      }
    },
    [allowedSet, sort, commitSort]
  );

  const removeSort = useCallback(
    (key: Keys) => {
      if (!allowedSet.has(key)) return;
      commitSort(sort.filter((e) => e.key !== key));
    },
    [allowedSet, sort, commitSort]
  );

  const clearSort = useCallback(() => {
    commitSort([]);
  }, [commitSort]);

  return {
    sort,
    getSort,
    setSort,
    addSort,
    toggleSort,
    removeSort,
    clearSort,
    hasActiveSort,
  };
}
