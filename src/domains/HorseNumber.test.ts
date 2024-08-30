import HorseNumber from '@/domains/HorseNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert, assertEquals } from '@std/assert';

Deno.test('create: 1以上18以下の整数を与えた時、生成される', async (t) => {
  const testCases = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const horseNumberResult = HorseNumber.create(testCase);
        assert(horseNumberResult.isSuccess());
        const horseNumber = horseNumberResult.value;
        assertEquals(horseNumber.value, testCase);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('create: 1未満の整数を与えた時、生成に失敗する', async (t) => {
  const testCases = [0, -1, -10, -100];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const horseNumberResult = HorseNumber.create(testCase);
        assert(horseNumberResult.isFailure());
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('create: 18より大きい整数を与えた時、生成に失敗する', async (t) => {
  const testCases = [19, 20, 50, 100];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const horseNumberResult = HorseNumber.create(testCase);
        assert(horseNumberResult.isFailure());
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('create: 小数を与えた時、生成に失敗する', async (t) => {
  const testCases = [1.1, 1.2, 1.3];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const horseNumberResult = HorseNumber.create(testCase);
        assert(horseNumberResult.isFailure());
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('equals: 同じ馬番を与えた時、同じ判定になる', async (t) => {
  const testCases = [
    { value1: 1, value2: 1 },
    { value1: 2, value2: 2 },
    { value1: 3, value2: 3 },
  ];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const horseNumber1 = unsafe(HorseNumber.create(testCase.value1));
        const horseNumber2 = unsafe(HorseNumber.create(testCase.value2));
        assert(horseNumber1.equals(horseNumber2));
        assert(horseNumber2.equals(horseNumber1));
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('equals: 異なる馬番を与えた時、異なる判定になる', async (t) => {
  const testCases = [
    { value1: 1, value2: 2 },
    { value1: 2, value2: 3 },
    { value1: 3, value2: 4 },
  ];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const horseNumber1 = unsafe(HorseNumber.create(testCase.value1));
        const horseNumber2 = unsafe(HorseNumber.create(testCase.value2));
        assert(!horseNumber1.equals(horseNumber2));
        assert(!horseNumber2.equals(horseNumber1));
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('compare: 同じ馬番を与えた時、同じ判定になる', async (t) => {
  const testCases = [
    { value1: 1, value2: 1 },
    { value1: 2, value2: 2 },
    { value1: 3, value2: 3 },
  ];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const horseNumber1 = unsafe(HorseNumber.create(testCase.value1));
        const horseNumber2 = unsafe(HorseNumber.create(testCase.value2));
        assert(horseNumber1.compare(horseNumber2) === 0);
        assert(horseNumber2.compare(horseNumber1) === 0);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('compare: 異なる馬番を与えた時、馬番の大小で比較される', async (t) => {
  const testCases = [
    { value1: 1, value2: 2 },
    { value1: 2, value2: 3 },
    { value1: 3, value2: 4 },
  ];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const horseNumber1 = unsafe(HorseNumber.create(testCase.value1));
        const horseNumber2 = unsafe(HorseNumber.create(testCase.value2));
        assert(horseNumber1.compare(horseNumber2) < 0);
        assert(horseNumber2.compare(horseNumber1) > 0);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});
