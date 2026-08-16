const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const viewports = [
    { name: 'mobile_375', width: 375, height: 667 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'desktop_1440', width: 1440, height: 900 }
  ];

  const pages = ['index.html', 'jujutsu.html', 'junnut.html', 'kenjutsu.html', 'itsepuolustus-oulu.html', 'maksut.html'];
  const outDir = 'C:/Users/Tehomylly/.gemini/antigravity/brain/85072af9-334d-478b-8618-38d6826e33a5/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const p of pages) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:8085/' + p, { waitUntil: 'networkidle0' });
      const imgPath = path.join(outDir, p.replace('.html', '') + '_' + vp.name + '.png');
      await page.screenshot({ path: imgPath, fullPage: false });
      console.log('Saved screenshot:', imgPath);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => console.error('Puppeteer error:', err));
