import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketExactaSingle {
  private constructor(
    public readonly horseNumber1: HorseNumber,
    public readonly horseNumber2: HorseNumber,
  ) {}

  static create(
    horseNumber1: HorseNumber,
    horseNumber2: HorseNumber,
  ): Result<TicketExactaSingle, Error> {
    if (horseNumber1.value === horseNumber2.value) {
      return Result.failure(
        new Error('Cannot select the same horse number.'),
      );
    }
    return Result.success(
      new TicketExactaSingle(
        horseNumber1,
        horseNumber2,
      ),
    );
  }

  equals(target: TicketExactaSingle): boolean {
    return this.horseNumber1.equals(target.horseNumber1) &&
      this.horseNumber2.equals(target.horseNumber2);
  }

  compare(target: TicketExactaSingle): number {
    return this.horseNumber1.compare(target.horseNumber1) ||
      this.horseNumber2.compare(target.horseNumber2);
  }
}
