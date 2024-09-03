import unique from '@/helpers/unique.ts';
import { assertEquals } from '@std/assert';

Deno.test('プリミティブな値の重複除去', () => {
  const input = [1, 2, 2, 3, 4, 4, 5];
  const result = unique(input);
  assertEquals(result, [1, 2, 3, 4, 5]);
});

Deno.test('オブジェクト型の重複除去', () => {
  const input = [{ id: 1 }, { id: 2 }, { id: 1 }];
  const result = unique(input, (item) => item.id);
  assertEquals(result, [{ id: 1 }, { id: 2 }]);
});

Deno.test('空配列を渡すと空配列が返る', () => {
  const result = unique([]);
  assertEquals(result, []);
});
