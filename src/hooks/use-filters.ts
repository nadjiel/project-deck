import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterOperator = "in" | "nin" | "has" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte";

/** A parsed filter entry: the key, its operator (if any), and current values. */
export interface FilterEntry {
  key: string;
  operator: FilterOperator | undefined;
  values: string[];
}

type FilterValue = string | string[] | undefined;

/** A map of `key` → map of `operator | "__default__"` → `string[]`. */
type FilterMap<Keys extends string> = Partial<
  Record<Keys, Partial<Record<FilterOperator | "__default__", string[]>>>
>;

interface UseFiltersReturn<Keys extends string> {
  /**
   * All active filters. Structured as:
   * `{ language: { in: ["react", "ts"], eq: ["js"] }, status: { __default__: ["active"] } }`
   */
  filters: FilterMap<Keys>;

  /**
   * Flat list of every active filter entry — useful for rendering chips/tags.
   * Each entry exposes `key`, `operator`, and `values`.
   */
  activeFilters: FilterEntry[];

  /** Get values for a key + optional operator. Returns [] if unset. */
  getFilter: (key: Keys, operator?: FilterOperator) => string[];

  /**
   * Set a filter to an exact value (or list of values), replacing whatever was there.
   * Passing undefined, null, or an empty array clears that key+operator pair.
   */
  setFilter: (key: Keys, value: FilterValue, operator?: FilterOperator) => void;

  /**
   * Add one or more values to a key+operator pair without removing existing ones.
   * Duplicates are ignored.
   */
  addFilter: (key: Keys, value: string | string[], operator?: FilterOperator) => void;

  /**
   * Remove one or more specific values from a key+operator pair.
   * If no values remain, the param is removed from the URL entirely.
   */
  removeFilter: (key: Keys, value: string | string[], operator?: FilterOperator) => void;

  /**
   * Delete a key+operator pair entirely.
   * If no operator is provided, deletes ALL operator variants for that key.
   */
  deleteFilter: (key: Keys, operator?: FilterOperator) => void;

  /** Clear all allowed filter keys (all operators) from the URL at once. */
  clearFilters: () => void;

  /** True if any allowed filter key has at least one value set. */
  hasActiveFilters: boolean;
}

interface UseFiltersOptions {
  /** Replace instead of push to the history stack. Defaults to true. */
  replace?: boolean;
  /** Operators to allow. Defaults to all operators. */
  allowedOperators?: FilterOperator[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const OPERATOR_DELIMITER = ".";
const MULTI_VALUE_SEPARATOR = ",";
const ALL_OPERATORS: FilterOperator[] = ["in", "nin", "has", "eq", "neq", "gt", "gte", "lt", "lte"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

/**
 * Builds the URL param name for a key + operator pair.
 * `("language", "in")` → `"language.in"`
 * `("language", undefined)` → `"language"`
 */
function buildParamKey(key: string, operator?: FilterOperator): string {
  return operator ? `${key}${OPERATOR_DELIMITER}${operator}` : key;
}

/**
 * Parses a raw URL param name into its key and optional operator.
 * Uses lastIndexOf so dotted key names (e.g. "created.at") are handled
 * correctly — the operator is always the rightmost segment.
 * `"language.in"` → `{ key: "language", operator: "in" }`
 * `"created.at.gte"` → `{ key: "created.at", operator: "gte" }`
 * `"language"` → `{ key: "language", operator: undefined }`
 */
function parseParamKey(
  raw: string,
  allowedOperators: Set<FilterOperator>
): { key: string; operator: FilterOperator | undefined } {
  const delimIdx = raw.lastIndexOf(OPERATOR_DELIMITER);
  if (delimIdx !== -1) {
    const key = raw.slice(0, delimIdx);
    const op = raw.slice(delimIdx + 1) as FilterOperator;
    if (key.length > 0 && allowedOperators.has(op)) {
      return { key, operator: op };
    }
  }
  return { key: raw, operator: undefined };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useFilters<Keys extends string>(
  allowedKeys: readonly Keys[],
  options: UseFiltersOptions = {}
): UseFiltersReturn<Keys> {
  const { replace = true, allowedOperators = ALL_OPERATORS } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allowedKeySet = useMemo(() => new Set(allowedKeys), [allowedKeys]);
  const allowedOperatorSet = useMemo(
    () => new Set(allowedOperators),
    [allowedOperators]
  );

  // ── Parse current filter state from URL ────────────────────────────────────

  const filters = useMemo<FilterMap<Keys>>(() => {
    const map: FilterMap<Keys> = {};

    for (const [rawParam, rawValue] of searchParams.entries()) {
      const { key, operator } = parseParamKey(rawParam, allowedOperatorSet);

      if (!allowedKeySet.has(key as Keys)) continue;

      const typedKey = key as Keys;
      const slot = operator ?? "__default__";
      const values = decodeValues(rawValue);
      if (values.length === 0) continue;

      if (!map[typedKey]) map[typedKey] = {};
      map[typedKey]![slot] = values;
    }

    return map;
  }, [searchParams, allowedKeySet, allowedOperatorSet]);

  const activeFilters = useMemo<FilterEntry[]>(() => {
    const entries: FilterEntry[] = [];
    for (const [key, operatorMap] of Object.entries(filters) as [
      Keys,
      Partial<Record<FilterOperator | "__default__", string[]>>,
    ][]) {
      for (const [slot, values] of Object.entries(operatorMap) as [
        FilterOperator | "__default__",
        string[],
      ][]) {
        entries.push({
          key,
          operator: slot === "__default__" ? undefined : slot,
          values,
        });
      }
    }
    return entries;
  }, [filters]);

  const hasActiveFilters = useMemo(
    () => activeFilters.length > 0,
    [activeFilters]
  );

  // ── Navigation helpers ─────────────────────────────────────────────────────

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

  // ── Public API ─────────────────────────────────────────────────────────────

  const getFilter = useCallback(
    (key: Keys, operator?: FilterOperator): string[] => {
      const slot = operator ?? "__default__";
      return filters[key]?.[slot] ?? [];
    },
    [filters]
  );

  const setFilter = useCallback(
    (key: Keys, value: FilterValue, operator?: FilterOperator) => {
      if (!allowedKeySet.has(key)) return;
      if (operator && !allowedOperatorSet.has(operator)) return;

      const params = cloneParams();
      const paramKey = buildParamKey(key, operator);
      const values = toArray(value);

      if (values.length === 0) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, encodeValues(values));
      }

      navigate(params);
    },
    [allowedKeySet, allowedOperatorSet, cloneParams, navigate]
  );

  const addFilter = useCallback(
    (key: Keys, value: string | string[], operator?: FilterOperator) => {
      if (!allowedKeySet.has(key)) return;
      if (operator && !allowedOperatorSet.has(operator)) return;

      const params = cloneParams();
      const paramKey = buildParamKey(key, operator);
      const incoming = toArray(value);
      const existing = decodeValues(params.get(paramKey) ?? "");
      const merged = Array.from(new Set([...existing, ...incoming]));

      params.set(paramKey, encodeValues(merged));
      navigate(params);
    },
    [allowedKeySet, allowedOperatorSet, cloneParams, navigate]
  );

  const removeFilter = useCallback(
    (key: Keys, value: string | string[], operator?: FilterOperator) => {
      if (!allowedKeySet.has(key)) return;
      if (operator && !allowedOperatorSet.has(operator)) return;

      const params = cloneParams();
      const paramKey = buildParamKey(key, operator);
      const toRemove = new Set(toArray(value));
      const existing = decodeValues(params.get(paramKey) ?? "");
      const remaining = existing.filter((v) => !toRemove.has(v));

      if (remaining.length === 0) {
        params.delete(paramKey);
      } else {
        params.set(paramKey, encodeValues(remaining));
      }

      navigate(params);
    },
    [allowedKeySet, allowedOperatorSet, cloneParams, navigate]
  );

  const deleteFilter = useCallback(
    (key: Keys, operator?: FilterOperator) => {
      if (!allowedKeySet.has(key)) return;

      const params = cloneParams();

      if (operator) {
        // Delete only the specific operator variant
        params.delete(buildParamKey(key, operator));
      } else {
        // Delete the bare key AND all operator variants
        params.delete(key);
        for (const op of allowedOperators) {
          params.delete(buildParamKey(key, op));
        }
      }

      navigate(params);
    },
    [allowedKeySet, allowedOperators, cloneParams, navigate]
  );

  const clearFilters = useCallback(() => {
    const params = cloneParams();
    for (const key of allowedKeys) {
      params.delete(key);
      for (const op of allowedOperators) {
        params.delete(buildParamKey(key, op));
      }
    }
    navigate(params);
  }, [allowedKeys, allowedOperators, cloneParams, navigate]);

  return {
    filters,
    activeFilters,
    getFilter,
    setFilter,
    addFilter,
    removeFilter,
    deleteFilter,
    clearFilters,
    hasActiveFilters,
  };
}
