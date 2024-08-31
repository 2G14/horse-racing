import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketTrioSingle {
  private constructor(
    public readonly horseNumber1: HorseNumber,
    public readonly horseNumber2: HorseNumber,
    public readonly horseNumber3: HorseNumber,
  ) {
    // Store horse numbers in ascending order
    const [h1, h2, h3] = [horseNumber1, horseNumber2, horseNumber3].toSorted((a, b) => a.compare(b));
    this.horseNumber1 = h1;
    this.horseNumber2 = h2;
    this.horseNumber3 = h3;
  }

  static create(
    horseNumber1: HorseNumber,
    horseNumber2: HorseNumber,
    horseNumber3: HorseNumber,
  ): Result<TicketTrioSingle, Error> {
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
      new TicketTrioSingle(
        horseNumber1,
        horseNumber2,
        horseNumber3,
      ),
    );
  }

  equals(target: TicketTrioSingle): boolean {
    return this.horseNumber1.equals(target.horseNumber1) &&
      this.horseNumber2.equals(target.horseNumber2) &&
      this.horseNumber3.equals(target.horseNumber3);
  }

  compare(target: TicketTrioSingle): number {
    return this.horseNumber1.compare(target.horseNumber1) ||
      this.horseNumber2.compare(target.horseNumber2) ||
      this.horseNumber3.compare(target.horseNumber3);
  }
}
