import Result from '@/helpers/result.ts';

export default class HorseNumber {
  private constructor(
    public readonly value: number,
  ) {}

  static readonly MIN = 1;
  static readonly MAX = 18;

  static create(value: number): Result<HorseNumber, Error> {
    if (value < this.MIN || value > this.MAX || !Number.isInteger(value)) {
      return Result.failure(
        new Error(`Horse number must be an integer between ${this.MIN} and ${this.MAX}`),
      );
    }
    return Result.success(
      new HorseNumber(value),
    );
  }

  equals(target: HorseNumber): boolean {
    return this.value === target.value;
  }

  compare(target: HorseNumber): number {
    return this.value - target.value;
  }
}
