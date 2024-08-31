export class Success<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
  isSuccess(): this is Success<T> {
    return true;
  }
  isFailure(): false {
    return false;
  }
}

export class Failure<E extends Error> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }
  isSuccess(): false {
    return false;
  }
  isFailure(): this is Failure<E> {
    return true;
  }
}

export type Result<T, E extends Error> = Success<T> | Failure<E>;

export const Result = {
  success: <T>(value: T) => new Success(value),
  failure: <E extends Error>(error: E) => new Failure(error),
};

export default Result;

export const unsafe = <T, E extends Error>(result: Result<T, E>): T => {
  return (result as Success<T>).value;
};
