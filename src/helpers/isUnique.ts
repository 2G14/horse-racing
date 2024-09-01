import unique from '@/helpers/unique.ts';

function isUnique<T>(array: T[]): boolean;
function isUnique<T>(array: T[], f: (item: T) => PropertyKey): boolean;
function isUnique<T>(array: T[], f?: (item: T) => PropertyKey): boolean;
function isUnique<T>(array: T[], f?: (item: T) => PropertyKey): boolean {
  return array.length === unique(array, f).length;
}

export default isUnique;
