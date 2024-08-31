import Result from '@/helpers/result.ts';
import BracketNumber from '@/domains/BracketNumber.ts';

export default class TicketBracketQuinellaSingle {
  private constructor(
    public readonly bracketNumber1: BracketNumber,
    public readonly bracketNumber2: BracketNumber,
  ) {
    // Store bracket numbers in ascending order
    const [b1, b2] = [bracketNumber1, bracketNumber2].toSorted((a, b) => a.compare(b));
    this.bracketNumber1 = b1;
    this.bracketNumber2 = b2;
  }

  static create(
    bracketNumber1: BracketNumber,
    bracketNumber2: BracketNumber,
  ): Result<TicketBracketQuinellaSingle, Error> {
    return Result.success(
      new TicketBracketQuinellaSingle(
        bracketNumber1,
        bracketNumber2,
      ),
    );
  }

  equals(target: TicketBracketQuinellaSingle): boolean {
    return this.bracketNumber1.equals(target.bracketNumber1) &&
      this.bracketNumber2.equals(target.bracketNumber2);
  }

  compare(target: TicketBracketQuinellaSingle): number {
    return this.bracketNumber1.compare(target.bracketNumber1) ||
      this.bracketNumber2.compare(target.bracketNumber2);
  }
}
