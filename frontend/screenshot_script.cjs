const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR);
}

const pages = [
  { name: '01_landing', url: '/' },
  { name: '02_explore', url: '/campaigns' },
  { name: '03_campaign_details', url: '/campaigns/1' },
  { name: '04_create_campaign', url: '/create', auth: { id: 'user_123', name: 'John Doe', email: 'john@example.com', role: 'USER' } },
  { name: '05_login', url: '/login' },
  { name: '06_register', url: '/register' },
  { name: '07_user_dashboard', url: '/dashboard', auth: { id: 'user_123', name: 'John Doe', email: 'john@example.com', role: 'USER' } },
  { name: '08_admin_panel', url: '/admin', auth: { id: 'admin_1', name: 'Admin User', email: 'admin@crowdfundx.com', role: 'ADMIN' } },
];

(async () => {
  const browser = await chromium.launch();

  for (const p of pages) {
    console.log(`Processing ${p.name}...`);
    let context;
    try {
      context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
      });

      if (p.auth) {
        await context.addInitScript((userData) => {
          window.localStorage.setItem('crowdfundx_user', JSON.stringify(userData));
        }, p.auth);
      }

      const page = await context.newPage();
      
      // Try with a very basic wait strategy for /create
      const waitStrategy = p.url === '/create' ? 'commit' : 'load';
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: waitStrategy, timeout: 60000 });

      // Extra wait time for everything to settle
      await page.waitForTimeout(5000);

      // Hide any persistent loading spinners
      await page.evaluate(() => {
        const spinners = document.querySelectorAll('.animate-spin');
        spinners.forEach(s => s.style.display = 'none');
      });
      
      await page.screenshot({ 
        path: path.join(SCREENSHOT_DIR, `${p.name}.png`),
        fullPage: true 
      });
      console.log(`Successfully captured ${p.name}`);
    } catch (err) {
      console.error(`Failed to capture ${p.name}: ${err.message}`);
    } finally {
      if (context) await context.close();
    }
  }

  await browser.close();
  console.log('Finished processing all pages.');
})();
