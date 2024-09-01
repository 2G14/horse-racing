import isUnique from '@/helpers/isUnique.ts';

function assertUnique<T>(array: T[]): void;
function assertUnique<T>(array: T[], message: string): void;
function assertUnique<T>(array: T[], f: (item: T) => PropertyKey): void;
function assertUnique<T>(array: T[], f: (item: T) => PropertyKey, message: string): void;
function assertUnique<T, E extends Error = Error>(array: T[], error: E): void;
function assertUnique<T, E extends Error = Error>(array: T[], f: (item: T) => PropertyKey, error: E): void;
function assertUnique<T, E extends Error = Error>(
  array: T[],
  arg1?: string | E | ((item: T) => PropertyKey),
  arg2?: string | E,
): void;
function assertUnique<T, E extends Error = Error>(
  array: T[],
  arg1?: string | E | ((item: T) => PropertyKey),
  arg2?: string | E,
): void {
  const error = typeof arg1 !== 'function' ? arg1 : arg2;
  const f = typeof arg1 === 'function' ? arg1 : undefined;
  if (!isUnique(array, f)) {
    throw error instanceof Error ? error : new Error(error);
  }
}

export default assertUnique;
