
export function formatUrl(url: string, fallback: string = "") {
  return url.split(/https:\/\//i)[1] ?? fallback;
}
