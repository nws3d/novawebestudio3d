const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  console.log('Navigating to live site...');
  await page.goto('https://nws3d.github.io/novawebestudio3d/', { waitUntil: 'networkidle0' });
  
  console.log('Page loaded. Checking for elements...');
  const body = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log('Body start:', body);

  await browser.close();
})();
