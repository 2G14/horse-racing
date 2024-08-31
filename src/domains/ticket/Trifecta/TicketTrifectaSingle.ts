import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketTrifectaSingle {
  private constructor(
    public readonly horseNumber1: HorseNumber,
    public readonly horseNumber2: HorseNumber,
    public readonly horseNumber3: HorseNumber,
  ) {}

  static create(
    horseNumber1: HorseNumber,
    horseNumber2: HorseNumber,
    horseNumber3: HorseNumber,
  ): Result<TicketTrifectaSingle, Error> {
    if (
      horseNumber1.equals(horseNumber2) ||
      horseNumber1.equals(horseNumber3) ||
      horseNumber2.equals(horseNumber3)
    ) {
      return Result.failure(
        new Error('Cannot select the same horse number.'),
      );
    }
    return Result.success(
      new TicketTrifectaSingle(
        horseNumber1,
        horseNumber2,
        horseNumber3,
      ),
    );
  }

  equals(target: TicketTrifectaSingle): boolean {
    return this.horseNumber1.equals(target.horseNumber1) &&
      this.horseNumber2.equals(target.horseNumber2) &&
      this.horseNumber3.equals(target.horseNumber3);
  }

  compare(target: TicketTrifectaSingle): number {
    return this.horseNumber1.compare(target.horseNumber1) ||
      this.horseNumber2.compare(target.horseNumber2) ||
      this.horseNumber3.compare(target.horseNumber3);
  }
}
