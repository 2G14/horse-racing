import Result from '@/helpers/result.ts';
import BracketNumber from '@/domains/BracketNumber.ts';

export default class TicketBracketExactaSingle {
  private constructor(
    public readonly bracketNumber1: BracketNumber,
    public readonly bracketNumber2: BracketNumber,
  ) {}

  static create(
    bracketNumber1: BracketNumber,
    bracketNumber2: BracketNumber,
  ): Result<TicketBracketExactaSingle, Error> {
    return Result.success(
      new TicketBracketExactaSingle(
        bracketNumber1,
        bracketNumber2,
      ),
    );
  }

  equals(target: TicketBracketExactaSingle): boolean {
    return this.bracketNumber1.equals(target.bracketNumber1) &&
      this.bracketNumber2.equals(target.bracketNumber2);
  }

  compare(target: TicketBracketExactaSingle): number {
    return this.bracketNumber1.compare(target.bracketNumber1) ||
      this.bracketNumber2.compare(target.bracketNumber2);
  }
}
