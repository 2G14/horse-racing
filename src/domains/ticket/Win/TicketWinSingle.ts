import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketWinSingle {
  private constructor(
    public readonly horseNumber: HorseNumber,
  ) {}

  static create(horseNumber: HorseNumber): Result<TicketWinSingle, Error> {
    return Result.success(
      new TicketWinSingle(horseNumber),
    );
  }

  equals(target: TicketWinSingle): boolean {
    return this.horseNumber.equals(target.horseNumber);
  }

  compare(target: TicketWinSingle): number {
    return this.horseNumber.compare(target.horseNumber);
  }
}
