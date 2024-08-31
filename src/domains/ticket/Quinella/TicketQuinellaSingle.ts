import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketQuinellaSingle {
  private constructor(
    public readonly horseNumber1: HorseNumber,
    public readonly horseNumber2: HorseNumber,
  ) {
    // Store horse numbers in ascending order
    const [h1, h2] = [horseNumber1, horseNumber2].toSorted((a, b) => a.compare(b));
    this.horseNumber1 = h1;
    this.horseNumber2 = h2;
  }

  static create(
    horseNumber1: HorseNumber,
    horseNumber2: HorseNumber,
  ): Result<TicketQuinellaSingle, Error> {
    if (horseNumber1.equals(horseNumber2)) {
      return Result.failure(
        new Error('Cannot select the same horse number.'),
      );
    }
    return Result.success(
      new TicketQuinellaSingle(
        horseNumber1,
        horseNumber2,
      ),
    );
  }

  equals(target: TicketQuinellaSingle): boolean {
    return this.horseNumber1.equals(target.horseNumber1) &&
      this.horseNumber2.equals(target.horseNumber2);
  }

  compare(target: TicketQuinellaSingle) {
    return this.horseNumber1.compare(target.horseNumber1) ||
      this.horseNumber2.compare(target.horseNumber2);
  }
}
