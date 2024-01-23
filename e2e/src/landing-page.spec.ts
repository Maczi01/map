import { expect, test } from '@playwright/test';

test('Overview Map Component Tests', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Page has title', async ({ page }) => {
        await page.goto('http://localhost:4200/');

        expect(await page.title()).toBe('RappUi');
    });

    test('Main page contains logo', async ({ page }) => {
        await page.goto('http://localhost:4200/');

        const logoImage = page.locator('img[alt="logo"]');

        await expect(logoImage).toBeVisible();
    });
});
