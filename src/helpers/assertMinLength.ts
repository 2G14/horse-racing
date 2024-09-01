function assertMinLength<T>(array: T[], length: number): void;
function assertMinLength<T>(array: T[], length: number, message: string): void;
function assertMinLength<T, E extends Error = Error>(array: T[], length: number, error: E): void;
function assertMinLength<T, E extends Error = Error>(array: T[], length: number, error?: string | E): void;
function assertMinLength<T, E extends Error = Error>(array: T[], length: number, error?: string | E): void {
  if (array.length < length) {
    throw error instanceof Error ? error : new Error(error);
  }
}

export default assertMinLength;
