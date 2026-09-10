// Automated Link & API Health Audit Script for Oulun Ju-jutsuklubi
// Usage: node scripts/verify-all-links.mjs

import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const driveUrl = process.env.GOOGLE_DRIVE_FOLDER_URL || 'https://drive.google.com/drive/folders/10GSV-Au7XPeJRZCAVzhy5fCPgrk-izHM?usp=sharing';

const URLS_TO_TEST = [
  { name: 'Google Drive Materials Folder', url: driveUrl },
  { name: 'Hokutoryu Ju-Jutsu Finland', url: 'https://www.hokutoryu.com' },
  { name: 'Facebook Page', url: 'https://www.facebook.com/jujutsuoulu' },
  { name: 'Instagram Profile', url: 'https://www.instagram.com/jujutsuoulu' },
  { name: 'YouTube Channel', url: 'https://www.youtube.com/@jujutsuoulu' },
  { name: 'Formspree Backup Endpoint', url: 'https://formspree.io/f/xvovbqqr' },
  { name: 'Telegram Bot API Server', url: 'https://api.telegram.org/bot8870450469:AAHO3AWsuuVKfeT3D16LtMNRmUvY87UOTl8/getMe' }
];

function checkUrl(item) {
  return new Promise((resolve) => {
    const client = item.url.startsWith('https') ? https : http;
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const req = client.get(item.url, options, (res) => {
      // 2xx, 3xx, and 400/405 (Formspree GET without POST body) are valid live endpoints
      const ok = typeof res.statusCode === 'number' && res.statusCode < 500 && res.statusCode !== 404;
      resolve({ name: item.name, url: item.url, status: res.statusCode, ok });
    });

    req.on('error', (err) => {
      resolve({ name: item.name, url: item.url, status: err.message, ok: false });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ name: item.name, url: item.url, status: 'TIMEOUT', ok: false });
    });

    req.end();
  });
}

function verifyHtmlForms() {
  console.log('---------------------------------------------------------');
  console.log('📋 AUDITOIDAAN KAIKKI HTML-LOMAKKEET (HTML Forms Audit)...');
  let issues = 0;
  const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    const formRegex = /<form\b[^>]*>/gi;
    let match;
    let formCount = 0;

    while ((match = formRegex.exec(content)) !== null) {
      formCount++;
      const tag = match[0];
      const actionMatch = tag.match(/action=["']([^"']+)["']/i);
      const methodMatch = tag.match(/method=["']([^"']+)["']/i);

      const action = actionMatch ? actionMatch[1] : null;
      const method = methodMatch ? methodMatch[1].toUpperCase() : null;

      if (!action || (!action.startsWith('http') && !action.startsWith('/'))) {
        console.error(`❌ [LOMAKEVIRHE] ${file} -> Lomakkeelta puuttuu kelvollinen action: "${tag}"`);
        issues++;
      } else if (method !== 'POST') {
        console.error(`❌ [LOMAKEVIRHE] ${file} -> Lomakkeen method ei ole POST: "${tag}"`);
        issues++;
      } else {
        console.log(`  ✓ [OK] ${file} (Lomake #${formCount}): action="${action}" method="${method}"`);
      }
    }
  }

  return issues;
}

async function verifyAll() {
  console.log('---------------------------------------------------------');
  console.log('🔍 ALOITETAAN VERKKOSIVUSTON LINKKI- JA API-AUDITOINTI');
  console.log('---------------------------------------------------------');

  let failed = 0;

  for (const item of URLS_TO_TEST) {
    const result = await checkUrl(item);
    if (result.ok) {
      console.log(`✅ [OK ${result.status}] ${result.name} -> ${result.url}`);
    } else {
      console.error(`❌ [VIRHE ${result.status}] ${result.name} -> ${result.url}`);
      failed++;
    }
  }

  failed += verifyHtmlForms();

  console.log('---------------------------------------------------------');
  console.log('🧪 TARKISTETAAN SERVERLESS-RAJAPINNAT (api/*.js)...');
  
  const endpoints = [
    { name: 'Sähköpostilista Lead API (api/lead.js)', path: '../api/lead.js' },
    { name: 'Peruskurssi Ilmoittautumiset (api/enroll.js)', path: '../api/enroll.js' },
    { name: 'Kysy Koutsilta Forwarder (api/ask-instructor.js)', path: '../api/ask-instructor.js' }
  ];

  for (const ep of endpoints) {
    try {
      const handlerModule = await import(ep.path);
      if (typeof handlerModule.default === 'function') {
        console.log(`✅ [OK] ${ep.name} ladattu ja valmis!`);
      } else {
        console.error(`❌ [VIRHE] ${ep.name} ei palauttanut funktiota`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [VIRHE] ${ep.name} lataus epäonnistui:`, err.message);
      failed++;
    }
  }

  console.log('---------------------------------------------------------');
  if (failed === 0) {
    console.log('🎉 KAIKKI ILMOITTAUTUMIS- JA KYSYMYSRAJAPINNAT AUDITOITU: 100 % VIRHEETÖN!');
    console.log('---------------------------------------------------------');
    process.exit(0);
  } else {
    console.error(`❌ YHTEENSÄ ${failed} KRIITTISTÄ VIRHETTÄ LÖYTYNYT!`);
    console.log('---------------------------------------------------------');
    process.exit(1);
  }
}

verifyAll();
