import TicketPlaceSingle from '@/domains/ticket/Place/TicketPlaceSingle.ts';
import HorseNumber from '@/domains/HorseNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert } from '@std/assert';

Deno.test('create: 馬番を与えた時、生成される', () => {
  const horseNumber = unsafe(HorseNumber.create(1));
  const ticketResult = TicketPlaceSingle.create(horseNumber);
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.horseNumber.equals(horseNumber));
});

Deno.test('equals: 馬番が同じ時、馬券は同じ馬券の判定になる', () => {
  const horseNumber = unsafe(HorseNumber.create(1));

  const ticket1 = unsafe(TicketPlaceSingle.create(horseNumber));
  const ticket2 = unsafe(TicketPlaceSingle.create(horseNumber));

  assert(ticket1.equals(ticket2));
});

Deno.test('equals: 馬番が異なる時、馬券は異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));

  const ticket1 = unsafe(TicketPlaceSingle.create(horseNumber1));
  const ticket2 = unsafe(TicketPlaceSingle.create(horseNumber2));

  assert(!ticket1.equals(ticket2));
});

Deno.test('compare: 馬番が同じ時、馬券は同じ馬券の判定になる', () => {
  const horseNumber = unsafe(HorseNumber.create(1));

  const ticket1 = unsafe(TicketPlaceSingle.create(horseNumber));
  const ticket2 = unsafe(TicketPlaceSingle.create(horseNumber));

  assert(ticket1.compare(ticket2) === 0);
});

Deno.test('compare: 馬番が異なる時、馬番の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));

  const ticket1 = unsafe(TicketPlaceSingle.create(horseNumber1));
  const ticket2 = unsafe(TicketPlaceSingle.create(horseNumber2));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});
