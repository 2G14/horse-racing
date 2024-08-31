import TicketTrifectaSingle from '@/domains/ticket/Trifecta/TicketTrifectaSingle.ts';
import HorseNumber from '@/domains/HorseNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert } from '@std/assert';

Deno.test('create: 馬番を昇順で与えた時、そのまま生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const ticketResult = TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.horseNumber1.equals(horseNumber1));
  assert(ticket.horseNumber2.equals(horseNumber2));
  assert(ticket.horseNumber3.equals(horseNumber3));
});

Deno.test('create: 馬番を非昇順で与えた時、そのまま生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(3));
  const horseNumber2 = unsafe(HorseNumber.create(1));
  const horseNumber3 = unsafe(HorseNumber.create(2));
  const ticketResult = TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.horseNumber1.equals(horseNumber1));
  assert(ticket.horseNumber2.equals(horseNumber2));
  assert(ticket.horseNumber3.equals(horseNumber3));
});

Deno.test('create: 馬番1と馬番2が同じ時、生成に失敗する', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(1));
  const horseNumber3 = unsafe(HorseNumber.create(2));
  const ticketResult = TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  );
  assert(ticketResult.isFailure());
});

Deno.test('create: 馬番1と馬番3が同じ時、生成に失敗する', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(1));
  const ticketResult = TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  );
  assert(ticketResult.isFailure());
});

Deno.test('create: 馬番2と馬番3が同じ時、生成に失敗する', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(2));
  const ticketResult = TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  );
  assert(ticketResult.isFailure());
});

Deno.test('equals: 全ての馬番が同じ時、同じ馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));

  assert(ticket1.equals(ticket2));
  assert(ticket2.equals(ticket1));
});

Deno.test('equals: 馬番1が異なる時、異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber4,
    horseNumber2,
    horseNumber3,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('equals: 馬番2が異なる時、異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber4,
    horseNumber3,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('equals: 馬番3が異なる時、異なる馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber4,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('compare: 全ての馬番が同じ時、同じ馬券の判定になる', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));

  assert(ticket1.compare(ticket2) === 0);
  assert(ticket2.compare(ticket1) === 0);
});

Deno.test('compare: 馬番1が異なる時、馬番1の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber4,
    horseNumber2,
    horseNumber3,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});

Deno.test('compare: 馬番2が異なる時、馬番2の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber4,
    horseNumber3,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});

Deno.test('compare: 馬番3が異なる時、馬番3の大小で比較される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumber3 = unsafe(HorseNumber.create(3));
  const horseNumber4 = unsafe(HorseNumber.create(4));

  const ticket1 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber3,
  ));
  const ticket2 = unsafe(TicketTrifectaSingle.create(
    horseNumber1,
    horseNumber2,
    horseNumber4,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});
