import { expect, describe, test } from 'vitest';
import { swiper } from '../src/util';

describe('swipe', () => {
  test('始点と終点を渡す、1を渡すと次の数が返ってくる', () => {
    const swipe = swiper(0, 5);
    const nextIdx = swipe(1);
    expect(nextIdx).toBe(1);
  });
  test('進んで戻れる', () => {
    const swipe = swiper(0, 5);
    swipe(1);
    swipe(1);
    const prevIdx = swipe(-1);
    expect(prevIdx).toBe(1);
  });
  test('終点より先に進もうとすると始点に戻る', () => {
    const swipe = swiper(0, 2);
    swipe(1);
    swipe(1);
    const nextIdx = swipe(1);
    expect(nextIdx).toBe(0);
  });
  test('始点より前に戻ろうとすると終点に戻る', () => {
    const swipe = swiper(0, 10);
    const prevIdx = swipe(-1);
    expect(prevIdx).toBe(10);
  });
  test('1か-1以外を渡すと-1が返ってくる', () => {
    const swipe = swiper(0, 10);
    const nextIdx = swipe(11111 as 1);
    expect(nextIdx).toBe(-1);
  });
});
