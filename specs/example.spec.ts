import { test, expect } from '@playwright/test';
import { resolve } from 'path';
//https://github.com/microsoft/playwright/issues/19710#issuecomment-1366206282
import { generateMockData } from './__mock__/generateMockData.js';

test.only('モックテスト', async ({ page }) => {
  await page.route('http://maching.com/api/list/all', async (route) => {
    const json = generateMockData();
    await route.fulfill({ json });
  });
  await page.goto('http://localhost:5173');
  await expect(page.getByText('出会い系サイト')).toHaveCount(1);
  await expect(page.getByText('基本情報')).toHaveCount(1);
  await expect(page.getByText('プロフィール')).toHaveCount(1);
  await page.getByText('次へ').click();
  await page.getByText('前へ').click();
});
