import TicketBracketQuinellaSingle from '@/domains/ticket/BracketQuinella/TicketBracketQuinellaSingle.ts';
import BracketNumber from '@/domains/BracketNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert } from '@std/assert';

Deno.test('create: 枠番を昇順で与えた時、昇順で生成される', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));
  const ticketResult = TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.bracketNumber1.equals(bracketNumber1));
  assert(ticket.bracketNumber2.equals(bracketNumber2));
});

Deno.test('create: 枠番を降順で与えた時、昇順で生成される', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(2));
  const bracketNumber2 = unsafe(BracketNumber.create(1));
  const ticketResult = TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  );
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  assert(ticket.bracketNumber1.equals(bracketNumber2));
  assert(ticket.bracketNumber2.equals(bracketNumber1));
});

Deno.test('equals: 枠番1,2が同じ時、馬券は同じ馬券の判定になる', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));

  assert(ticket1.equals(ticket2));
  assert(ticket2.equals(ticket1));
});

Deno.test('equals: 枠番1が異なる時、異なる馬券の判定になる', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));
  const bracketNumber3 = unsafe(BracketNumber.create(3));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber3,
    bracketNumber2,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('equals: 枠番2が異なる時、異なる馬券の判定になる', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));
  const bracketNumber3 = unsafe(BracketNumber.create(3));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber3,
  ));

  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});

Deno.test('compare: 枠番1,2が同じ時、馬券は同じ馬券の判定になる', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));

  assert(ticket1.compare(ticket2) === 0);
  assert(ticket2.compare(ticket1) === 0);
});

Deno.test('compare: 枠番1が異なる時、枠番1の大小で比較される', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));
  const bracketNumber3 = unsafe(BracketNumber.create(3));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber3,
    bracketNumber2,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});

Deno.test('compare: 枠番1が同じで枠番2が異なる時、枠番2の大小で比較される', () => {
  const bracketNumber1 = unsafe(BracketNumber.create(1));
  const bracketNumber2 = unsafe(BracketNumber.create(2));
  const bracketNumber3 = unsafe(BracketNumber.create(3));

  const ticket1 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber2,
  ));
  const ticket2 = unsafe(TicketBracketQuinellaSingle.create(
    bracketNumber1,
    bracketNumber3,
  ));

  assert(ticket1.compare(ticket2) < 0);
  assert(ticket2.compare(ticket1) > 0);
});
