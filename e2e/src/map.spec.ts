import { expect, test } from '@playwright/test';
import { setupServer } from 'msw/node'; // Import your MSW handlers

import { handlers } from '../../src/app/mocks/handlers';

const server = setupServer(...handlers);

test.beforeAll(() => {
    server.listen();
});

test.afterAll(() => {
    server.close();
});
test.describe('Overview Map Component Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
    });

    // test('Check if Map Exists', async ({ page }) => {
    //     await expect(page.locator('.mapboxgl-canvas')).toBeVisible();
    // });
    //
    // test('Check if Markers are Present on the Map', async ({ page }) => {
    //     await expect(page.locator('.mapboxgl-canvas')).toBeVisible();
    //
    //     const markers = page.locator('[aria-label="Map marker"]');
    //     await expect(markers).toHaveCount(11, { timeout: 5000 });
    // });

    // test('Check if Clusters are Present on the Map after zoom out', async ({ page }) => {
    //     // Perform a scroll action on the map to zoom out
    //     await page.mouse.wheel(0, 1250000); // Adjust the scroll values as needed
    //
    //     // Optionally, add a wait here if needed for dynamic loading or rendering
    //     await page.waitForTimeout(20000); // Adjust timeout as needed
    //
    //     const clusterMarker = page.locator('[data-testid^="cluster-"]');
    //
    //     // Check if at least one cluster marker exists
    //     await expect(clusterMarker).toHaveCount(1);
    // });

    // test('Check if Popup Opens and Contains Correct Content', async ({ page }) => {
    //     const firstMarker = page.locator('[aria-label="Map marker"]').first();
    //     await firstMarker.click();
    //
    //     const popup = page.locator('[data-testid="markerPopupContent"]');
    //     await expect(popup).toBeVisible();
    //
    //     await expect(popup.locator('text=pci:')).toBeVisible();
    //     await expect(popup.locator('text=gnbDuId:')).toBeVisible();
    //     await expect(popup.locator('text=uplink')).toBeVisible();
    //     await expect(popup.locator('text=downlink')).toBeVisible();
    //     await expect(popup.locator('text=See details')).toBeVisible();
    // });
    //
    // test('Verify Redirection after Clicking "See details in popup"', async ({ page }) => {
    //     const firstMarker = page.locator('[aria-label="Map marker"]').first();
    //     await firstMarker.click();
    //
    //     const popup = page.locator('[data-testid="markerPopupContent"]');
    //     await expect(popup).toBeVisible();
    //
    //     const detailsButton = popup.locator('text=See details');
    //     await detailsButton.click();
    //
    //     await expect(page).toHaveURL(/\/graph/, { timeout: 5000 });
    // });

    test('Verify Redirection after Clicking "See details in cardlist"', async ({ page }) => {
        const firstMarker = page.locator('[data-testid^="radioCellCard-"]').first();
        await firstMarker.locator('text=See details').click();

        await expect(page).toHaveURL(/\/graph/, { timeout: 5000 });

        // const popup = page.locator('[data-testid="markerPopupContent"]');
        // await expect(popup).toBeVisible();
        //
        // const detailsButton = popup.locator('text=See details');
        // await detailsButton.click();
    });
});
