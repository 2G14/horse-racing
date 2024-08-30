import Result from '@/helpers/result.ts';
import HorseNumber from '@/domains/HorseNumber.ts';

export default class TicketPlaceSingle {
  private constructor(
    public readonly horseNumber: HorseNumber,
  ) {}

  static create(horseNumber: HorseNumber): Result<TicketPlaceSingle, Error> {
    return Result.success(
      new TicketPlaceSingle(horseNumber),
    );
  }

  equals(target: TicketPlaceSingle): boolean {
    return this.horseNumber.equals(target.horseNumber);
  }

  compare(target: TicketPlaceSingle): number {
    return this.horseNumber.compare(target.horseNumber);
  }
}
