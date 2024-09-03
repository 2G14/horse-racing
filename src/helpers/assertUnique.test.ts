import assertUnique from '@/helpers/assertUnique.ts';
import { assertThrows } from '@std/assert';

Deno.test('プリミティブな値の重複を検出する', () => {
  const input = [1, 2, 2, 3];
  assertThrows(() => assertUnique(input), '重複あり');
});

Deno.test('オブジェクト型の重複を検出する', () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
  assertThrows(() => assertUnique(input, (item) => item.id), '重複あり');
});

Deno.test('重複がない場合はエラーを投げない', () => {
  const input = [1, 2, 3];
  assertUnique(input); // 何も起こらないことを期待
});

Deno.test('オブジェクト型の重複を検出する', () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
  assertThrows(() => assertUnique(input, (item) => item.id), '重複あり');
});

Deno.test('空配列を渡すとエラーを投げない', () => {
  const input: unknown[] = [];
  assertUnique(input); // 何も起こらないことを期待
});
