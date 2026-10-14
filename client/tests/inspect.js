import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  
  const files = fs.readdirSync('src/assets').filter(f => f.endsWith('.webp') || f.endsWith('.png'));
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="background:#111; color:#eee; font-family:sans-serif; padding:20px; display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
        ${files.map(f => `
          <div style="background:#222; border-radius:8px; padding:10px; text-align:center;">
            <p style="font-size:11px; word-break:break-all; height:32px;">${f}</p>
            <img src="/src/assets/${f}" style="width:100%; height:200px; object-fit:contain; border-radius:6px; background:#000;" />
          </div>
        `).join('')}
      </body>
    </html>
  `;
  fs.writeFileSync('public/inspect.html', html);
  
  await page.goto('http://localhost:5173/inspect.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'tests/all_assets.png', fullPage: true });
  console.log('Saved inspection to tests/all_assets.png');
  await browser.close();
}

main();
