import isUnique from '@/helpers/isUnique.ts';
import { assert } from '@std/assert';

Deno.test('プリミティブな値で重複がないと、true', () => {
  const input = [1, 2, 3, 4, 5];
  assert(isUnique(input));
});

Deno.test('プリミティブな値で重複があると、false', () => {
  const input = [1, 2, 2, 3, 4, 4, 5];
  assert(!isUnique(input));
});

Deno.test('オブジェクト型で重複がないと、true', () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
  assert(isUnique(input, (item) => item.id));
});

Deno.test('オブジェクト型で重複があると、false', () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
  assert(!isUnique(input, (item) => item.id));
});

Deno.test('空配列を渡すと重複なしとみなす', () => {
  const input: unknown[] = [];
  assert(isUnique(input));
});
