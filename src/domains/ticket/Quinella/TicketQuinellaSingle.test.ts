import TicketQuinellaSingle from '@/domains/ticket/Quinella/TicketQuinellaSingle.ts';
import HorseNumber from '@/domains/HorseNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert } from '@std/assert';

Deno.test('create: 馬番を昇順で与えた時、昇順で生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const ticketResult = TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.horseNumber1.equals(horseNumber1));
  assert(ticket.horseNumber2.equals(horseNumber2));
});

Deno.test('create: 馬番を降順で与えた時、昇順で生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(2));
  const horseNumber2 = unsafe(HorseNumber.create(1));
  const ticketResult = TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.horseNumber1.equals(horseNumber2));
  assert(ticket.horseNumber2.equals(horseNumber1));
});

Deno.test('create: 同じ馬番を与えた時、生成に失敗する', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(1));
  const ticketResult = TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  );
  assert(ticketResult.isFailure());
});

Deno.test('equals: 馬番1,2が同じ時、馬券は同じ馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));

  assert(ticket1.equals(ticket2));
  assert(ticket2.equals(ticket1));
});

Deno.test('equals: 馬番1が異なる時、異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber3,
    horseNumber2,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('equals: 馬番2が異なる時、異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber3,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('compare: 馬番1,2が同じ時、馬券は同じ馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));

  assert(ticket1.compare(ticket2) === 0);
  assert(ticket2.compare(ticket1) === 0);
});

Deno.test('compare: 馬番1が異なる時、馬番1の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber3,
    horseNumber2,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});

Deno.test('compare: 馬番1が同じで馬番2が異なる時、馬番2の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber2,
  ));
  const ticket2 = unsafe(TicketQuinellaSingle.create(
    horseNumber1,
    horseNumber3,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});
