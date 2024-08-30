import BracketNumber from '@/domains/BracketNumber.ts';
import { unsafe } from '@/helpers/result.ts';
import { assert, assertEquals } from '@std/assert';

Deno.test('create: 1以上8以下の整数を与えた時、生成される', async (t) => {
  const testCases = [1, 2, 3, 4, 5, 6, 7, 8];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const bracketNumberResult = BracketNumber.create(testCase);
        assert(bracketNumberResult.isSuccess());
        const bracketNumber = bracketNumberResult.value;
        assertEquals(bracketNumber.value, testCase);
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
        const bracketNumberResult = BracketNumber.create(testCase);
        assert(bracketNumberResult.isFailure());
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('create: 8より大きい整数を与えた時、生成に失敗する', async (t) => {
  const testCases = [9, 10, 50, 100];
  await Promise.all(testCases.map((testCase) =>
    t.step({
      name: `case ${testCase}`,
      fn() {
        const bracketNumberResult = BracketNumber.create(testCase);
        assert(bracketNumberResult.isFailure());
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
        const bracketNumberResult = BracketNumber.create(testCase);
        assert(bracketNumberResult.isFailure());
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('equals: 同じ枠番を与えた時、同じ判定になる', async (t) => {
  const testCase = [
    { value1: 1, value2: 1 },
    { value1: 2, value2: 2 },
    { value1: 3, value2: 3 },
  ];
  await Promise.all(testCase.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const bracketNumber1 = unsafe(BracketNumber.create(testCase.value1));
        const bracketNumber2 = unsafe(BracketNumber.create(testCase.value2));
        assert(bracketNumber1.equals(bracketNumber2));
        assert(bracketNumber2.equals(bracketNumber1));
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('equals: 異なる枠番を与えた時、異なる判定になる', async (t) => {
  const testCase = [
    { value1: 1, value2: 2 },
    { value1: 2, value2: 3 },
    { value1: 3, value2: 4 },
  ];
  await Promise.all(testCase.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const bracketNumber1 = unsafe(BracketNumber.create(testCase.value1));
        const bracketNumber2 = unsafe(BracketNumber.create(testCase.value2));
        assert(!bracketNumber1.equals(bracketNumber2));
        assert(!bracketNumber2.equals(bracketNumber1));
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('compare: 同じ枠番を与えた時、同じ判定になる', async (t) => {
  const testCase = [
    { value1: 1, value2: 1 },
    { value1: 2, value2: 2 },
    { value1: 3, value2: 3 },
  ];
  await Promise.all(testCase.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const bracketNumber1 = unsafe(BracketNumber.create(testCase.value1));
        const bracketNumber2 = unsafe(BracketNumber.create(testCase.value2));
        assert(bracketNumber1.compare(bracketNumber2) === 0);
        assert(bracketNumber2.compare(bracketNumber1) === 0);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});

Deno.test('compare: 異なる枠番を与えた時、枠番の大小で比較される', async (t) => {
  const testCase = [
    { value1: 1, value2: 2 },
    { value1: 2, value2: 3 },
    { value1: 3, value2: 4 },
  ];
  await Promise.all(testCase.map((testCase) =>
    t.step({
      name: `case ${JSON.stringify(testCase)}`,
      fn() {
        const bracketNumber1 = unsafe(BracketNumber.create(testCase.value1));
        const bracketNumber2 = unsafe(BracketNumber.create(testCase.value2));
        assert(bracketNumber1.compare(bracketNumber2) < 0);
        assert(bracketNumber2.compare(bracketNumber1) > 0);
      },
      sanitizeOps: false,
      sanitizeResources: false,
      sanitizeExit: false,
    })
  ));
});
