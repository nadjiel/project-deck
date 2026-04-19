import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Joins a `prefix` to a `suffix` with a `join` `string` inbetween
 * when a given `predicate` is `true`.
 * 
 * @example
 * ```typescript
 * suffix ? `prefix-${suffix}` : prefix;
 * 
 * // Can be replaced by:
 * 
 * joinif(prefix, "-", suffix);
 * ```
 * 
 * @param prefix The base prefix of the `string`.
 * @param join The `string` to place between the `prefix` and the `suffix`.
 * @param suffix The suffix to join to the prefix.
 * @param predicate Defaults to a `boolean` derived from the
 * `suffix`, essentially making it be used when it has a length
 * greater then `0`.
 * @returns The joined result.
 */
export function joinif(
  prefix: string,
  join: string,
  suffix: string,
  predicate: boolean = suffix.length > 0,
) {
  return predicate ? `${prefix}${join}${suffix}` : prefix;
}
