function unique<T>(array: T[]): T[];
function unique<T>(array: T[], f: (item: T) => PropertyKey): T[];
function unique<T>(array: T[], f?: (item: T) => PropertyKey): T[];
function unique<T>(array: T[], f?: (item: T) => PropertyKey): T[] {
  if (f) {
    return Array.from(new Map(array.map((item) => [f(item), item])).values());
  }
  return Array.from(new Set(array));
}

export default unique;
