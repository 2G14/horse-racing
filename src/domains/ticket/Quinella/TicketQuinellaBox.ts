import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';
import TicketQuinellaSingle from '@/domains/ticket/Quinella/TicketQuinellaSingle.ts';
import assertMinLength from '@/helpers/assertMinLength.ts';
import assertUnique from '@/helpers/assertUnique.ts';

export default class TicketQuinellaBox {
  private constructor(
    public readonly horseNumbers: HorseNumber[],
  ) {
    this.horseNumbers = horseNumbers.toSorted((a, b) => a.compare(b));
  }

  static create(horseNumbers: HorseNumber[]): Result<TicketQuinellaBox, Error> {
    try {
      assertMinLength(horseNumbers, 2, 'You need to select at least two horse numbers.');
      assertUnique(horseNumbers, (n) => n.value, 'Cannot select the same horse number.');
    } catch (e: unknown) {
      if (e instanceof Error) {
        return Result.failure(e);
      }
    }

    return Result.success(
      new TicketQuinellaBox(horseNumbers),
    );
  }

  *combinationsGenerator() {
    const horseNumbers = this.horseNumbers;
    for (const [index, horseNumber1] of horseNumbers.entries()) {
      for (const horseNumber2 of horseNumbers.slice(index + 1)) {
        const single = TicketQuinellaSingle.create(
          horseNumber1,
          horseNumber2,
        );
        if (single.isSuccess()) {
          yield single.value;
        }
      }
    }
  }

  get combinations(): TicketQuinellaSingle[] {
    return [...this.combinationsGenerator()];
  }

  equals(target: TicketQuinellaBox): boolean {
    if (this.horseNumbers.length !== target.horseNumbers.length) {
      return false;
    }
    return this.horseNumbers.every((n, i) => n.equals(target.horseNumbers[i]));
  }
}
