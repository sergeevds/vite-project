export const transformUrl = (url: string): string =>
  url.replace('https://swapi.dev/api', '');

export function transformURLs(
  collection: Record<string, string>,
  keys: string[]
): Record<string, string> {
  return Object.keys(collection).reduce((acc, key) => {
    acc[key] = keys.includes(key)
      ? transformUrl(collection[key])
      : collection[key];
    return acc;
  }, {} as Record<string, string>);
}

export function transformURLsArray(
  collection: Record<string, string>[],
  keys: string[]
): Record<string, string>[] {
  return collection.map((item) => transformURLs(item, keys));
}
