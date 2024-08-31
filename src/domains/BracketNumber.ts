import Result from '@/helpers/result.ts';

export default class BracketNumber {
  private constructor(
    public readonly value: number,
  ) {}

  static readonly MIN = 1;
  static readonly MAX = 8;

  static create(value: number): Result<BracketNumber, Error> {
    if (value < this.MIN || value > this.MAX || !Number.isInteger(value)) {
      return Result.failure(
        new Error(`Bracket number must be an integer between ${this.MIN} and ${this.MAX}`),
      );
    }
    return Result.success(
      new BracketNumber(value),
    );
  }

  equals(target: BracketNumber): boolean {
    return this.value === target.value;
  }

  compare(target: BracketNumber): number {
    return this.value - target.value;
  }
}
