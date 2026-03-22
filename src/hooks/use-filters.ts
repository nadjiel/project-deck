import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FilterValue = string | string[] | undefined;

type FilterMap<Keys extends string> = Partial<Record<Keys, string[]>>;

interface UseFiltersReturn<Keys extends string> {
  /** All active filters as a map of key → string[]. Only allowed keys are included. */
  filters: FilterMap<Keys>;

  /** Get the values for a single filter key. Returns [] if unset. */
  getFilter: (key: Keys) => string[];

  /**
   * Set a filter to an exact value (or list of values), replacing whatever was there.
   * Passing undefined, null, or an empty array clears the filter.
   */
  setFilter: (key: Keys, value: FilterValue) => void;

  /**
   * Add one or more values to a filter without removing existing ones.
   * Duplicates are ignored.
   */
  addFilter: (key: Keys, value: string | string[]) => void;

  /**
   * Remove one or more specific values from a filter.
   * If no values remain, the param is removed from the URL entirely.
   */
  removeFilter: (key: Keys, value: string | string[]) => void;

  /** Remove a filter key entirely from the URL. */
  deleteFilter: (key: Keys) => void;

  /** Clear all allowed filter keys from the URL at once. */
  clearFilters: () => void;

  /** True if any allowed filter key has at least one value set. */
  hasActiveFilters: boolean;
}

interface UseFiltersOptions {
  /** Replace instead of push to the history stack. Defaults to true. */
  replace?: boolean;
}

const MULTI_VALUE_SEPARATOR = ",";

function toArray(value: FilterValue): string[] {
  if (!value || (Array.isArray(value) && value.length === 0)) return [];
  return Array.isArray(value) ? value : [value];
}

function encodeValues(values: string[]): string {
  return values.join(MULTI_VALUE_SEPARATOR);
}

function decodeValues(raw: string): string[] {
  return raw
    .split(MULTI_VALUE_SEPARATOR)
    .map((v) => v.trim())
    .filter(Boolean);
}

export function useFilters<Keys extends string>(
  allowedKeys: readonly Keys[],
  options: UseFiltersOptions = {}
): UseFiltersReturn<Keys> {
  const { replace = true } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allowedSet = useMemo(() => new Set(allowedKeys), [allowedKeys]);

  // Parse current filter state from URL
  const filters = useMemo<FilterMap<Keys>>(() => {
    const map: FilterMap<Keys> = {};
    for (const key of allowedKeys) {
      const raw = searchParams.get(key);
      if (raw !== null) {
        map[key] = decodeValues(raw);
      }
    }
    return map;
  }, [searchParams, allowedKeys]);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => (v as string[]).length > 0),
    [filters]
  );

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

  /** Returns a mutable copy of the current search params. */
  const cloneParams = useCallback(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const getFilter = useCallback(
    (key: Keys): string[] => filters[key] ?? [],
    [filters]
  );

  const setFilter = useCallback(
    (key: Keys, value: FilterValue) => {
      if (!allowedSet.has(key)) return;
      const params = cloneParams();
      const values = toArray(value);
      if (values.length === 0) {
        params.delete(key);
      } else {
        params.set(key, encodeValues(values));
      }
      navigate(params);
    },
    [allowedSet, cloneParams, navigate]
  );

  const addFilter = useCallback(
    (key: Keys, value: string | string[]) => {
      if (!allowedSet.has(key)) return;
      const params = cloneParams();
      const incoming = toArray(value);
      const existing = decodeValues(params.get(key) ?? "");
      const merged = Array.from(new Set([...existing, ...incoming]));
      params.set(key, encodeValues(merged));
      navigate(params);
    },
    [allowedSet, cloneParams, navigate]
  );

  const removeFilter = useCallback(
    (key: Keys, value: string | string[]) => {
      if (!allowedSet.has(key)) return;
      const params = cloneParams();
      const toRemove = new Set(toArray(value));
      const existing = decodeValues(params.get(key) ?? "");
      const remaining = existing.filter((v) => !toRemove.has(v));
      if (remaining.length === 0) {
        params.delete(key);
      } else {
        params.set(key, encodeValues(remaining));
      }
      navigate(params);
    },
    [allowedSet, cloneParams, navigate]
  );

  const deleteFilter = useCallback(
    (key: Keys) => {
      if (!allowedSet.has(key)) return;
      const params = cloneParams();
      params.delete(key);
      navigate(params);
    },
    [allowedSet, cloneParams, navigate]
  );

  const clearFilters = useCallback(() => {
    const params = cloneParams();
    for (const key of allowedKeys) {
      params.delete(key);
    }
    navigate(params);
  }, [allowedKeys, cloneParams, navigate]);

  return {
    filters,
    getFilter,
    setFilter,
    addFilter,
    removeFilter,
    deleteFilter,
    clearFilters,
    hasActiveFilters,
  };
}
