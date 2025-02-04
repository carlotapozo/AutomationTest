import { chromium } from '@playwright/test';

 (async () => {
  //Step 1: Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  //Step 2 : Go to Ecossia
  await page.goto('https://www.duckduckgo.org/');

  //Step 3 : Search for "automation"
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).click();
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('automation');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  
  //Step 4: Find Automation Wikipedia link 
  await page.getByRole('link', { name: 'Automation - Wikipedia' }).click();

  // Step 5: Take a screenshot of the Wikipedia page
  await page.getByRole('link', { name: 'History', exact: true }).click();
  await page.getByRole('link', { name: 'Early history' }).click();

  const timestamp = new Date().toISOString().replace(/[-:T]/g, '_').split('.')[0];
  const screenshotPath = `screenshots/wikipedia_automation_${timestamp}.png`;
  await page.screenshot({ path: screenshotPath}); 

  // Step 6 : Close the browser
  await browser.close();
})();