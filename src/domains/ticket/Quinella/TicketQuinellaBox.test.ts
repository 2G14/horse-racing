import TicketQuinellaBox from '@/domains/ticket/Quinella/TicketQuinellaBox.ts';
import HorseNumber from '@/domains/HorseNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert } from '@std/assert';

Deno.test('create: 馬番を2つ以上昇順で選択した時、正常に生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(1));
  const horseNumber2 = unsafe(HorseNumber.create(2));
  const horseNumbers = [
    horseNumber1,
    horseNumber2,
  ];
  const ticketResult = TicketQuinellaBox.create(horseNumbers);
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  const horseNumbersSorted = horseNumbers.toSorted((a, b) => a.compare(b));
  assert(ticket.horseNumbers.length === horseNumbersSorted.length);
  for (let i = 0; i < horseNumbersSorted.length; i++) {
    assert(ticket.horseNumbers[i].equals(horseNumbersSorted[i]));
  }
});

Deno.test('create: 馬番を2つ以上降順で選択した時、正常に生成される', () => {
  const horseNumber1 = unsafe(HorseNumber.create(2));
  const horseNumber2 = unsafe(HorseNumber.create(1));
  const horseNumbers = [
    horseNumber1,
    horseNumber2,
  ];
  const ticketResult = TicketQuinellaBox.create(horseNumbers);
  assert(ticketResult.isSuccess());
  const ticket = ticketResult.value;
  const horseNumbersSorted = horseNumbers.toSorted((a, b) => a.compare(b));
  assert(ticket.horseNumbers.length === horseNumbersSorted.length);
  for (let i = 0; i < horseNumbersSorted.length; i++) {
    assert(ticket.horseNumbers[i].equals(horseNumbersSorted[i]));
  }
});

Deno.test('create: 馬番が1つのみの場合、生成に失敗する', () => {
  const horseNumbers = [
    unsafe(HorseNumber.create(1)),
  ];
  const ticketResult = TicketQuinellaBox.create(horseNumbers);
  assert(ticketResult.isFailure());
});

Deno.test('create: 同じ馬番を選択した場合、生成に失敗する', () => {
  const horseNumbers = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(1)),
  ];
  const ticketResult = TicketQuinellaBox.create(horseNumbers);
  assert(ticketResult.isFailure());
});

Deno.test('create: 馬番の配列が空の場合、生成に失敗する', () => {
  const horseNumbers: HorseNumber[] = [];
  const ticketResult = TicketQuinellaBox.create(horseNumbers);
  assert(ticketResult.isFailure());
});

Deno.test('combinations: 3つの馬番から正しい組み合わせが生成される', () => {
  const horseNumbers = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(2)),
    unsafe(HorseNumber.create(3)),
  ];
  const ticket = unsafe(TicketQuinellaBox.create(horseNumbers));
  const combinations = ticket.combinations;
  assert(combinations.length === 3); // 3C2 = 3
  assert(combinations[0].horseNumber1.value === 1 && combinations[0].horseNumber2.value === 2);
  assert(combinations[1].horseNumber1.value === 1 && combinations[1].horseNumber2.value === 3);
  assert(combinations[2].horseNumber1.value === 2 && combinations[2].horseNumber2.value === 3);
});

Deno.test('combinations: 4つの馬番から正しい組み合わせが生成される', () => {
  const horseNumbers = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(2)),
    unsafe(HorseNumber.create(3)),
    unsafe(HorseNumber.create(4)),
  ];
  const ticket = unsafe(TicketQuinellaBox.create(horseNumbers));
  const combinations = ticket.combinations;
  assert(combinations.length === 6); // 4C2 = 6
  assert(combinations[0].horseNumber1.value === 1 && combinations[0].horseNumber2.value === 2);
  assert(combinations[1].horseNumber1.value === 1 && combinations[1].horseNumber2.value === 3);
  assert(combinations[2].horseNumber1.value === 1 && combinations[2].horseNumber2.value === 4);
  assert(combinations[3].horseNumber1.value === 2 && combinations[3].horseNumber2.value === 3);
  assert(combinations[4].horseNumber1.value === 2 && combinations[4].horseNumber2.value === 4);
  assert(combinations[5].horseNumber1.value === 3 && combinations[5].horseNumber2.value === 4);
});

Deno.test('equals: 馬番が同じ場合、同じ馬券と判定される', () => {
  const horseNumbers1 = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(2)),
  ];
  const horseNumbers2 = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(2)),
  ];
  const ticket1 = unsafe(TicketQuinellaBox.create(horseNumbers1));
  const ticket2 = unsafe(TicketQuinellaBox.create(horseNumbers2));
  assert(ticket1.equals(ticket2));
  assert(ticket2.equals(ticket1));
});

Deno.test('equals: 馬番が異なる場合、異なる馬券と判定される', () => {
  const horseNumbers1 = [
    unsafe(HorseNumber.create(1)),
    unsafe(HorseNumber.create(2)),
  ];
  const horseNumbers2 = [
    unsafe(HorseNumber.create(2)),
    unsafe(HorseNumber.create(3)),
  ];
  const ticket1 = unsafe(TicketQuinellaBox.create(horseNumbers1));
  const ticket2 = unsafe(TicketQuinellaBox.create(horseNumbers2));
  assert(!ticket1.equals(ticket2));
  assert(!ticket2.equals(ticket1));
});
