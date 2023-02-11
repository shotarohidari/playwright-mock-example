import { test, expect } from '@playwright/test';
import {resolve} from "path";
//https://github.com/microsoft/playwright/issues/19710#issuecomment-1366206282
import { generateMockData } from './__mock__/generateMockData.js';
test.only('has title', async ({ page }) => {
  const a = resolve();
  console.log({a});
  await page.route('http://maching.com/api/list/all', async route => {
  const json = generateMockData();
  await route.fulfill({ json });
});
  await page.goto('http://localhost:5173');

  await page.pause();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
