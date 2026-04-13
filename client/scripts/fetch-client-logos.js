/**
 * Script to fetch client logos from webmart.by
 * Run: node scripts/fetch-client-logos.js
 * Requires: npm install node-fetch (or use fetch in Node 18+)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '../public/clients');

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullUrl = url.startsWith('http') ? url : `https://webmart.by${url}`;
    const file = fs.createWriteStream(filepath);
    https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { fs.unlink(filepath, () => {}); reject(e); });
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    const html = await fetchPage('https://webmart.by');
    const imgRegex = /<img[^>]+src=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["'][^>]*>/gi;
    const urlRegex = /url\(["']?([^"')]+\.(?:png|jpg|jpeg|webp|svg))["']?\)/gi;
    let match;
    const urls = new Set();
    while ((match = imgRegex.exec(html)) !== null) {
      let src = match[1];
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = 'https://webmart.by' + src;
      if (!src.includes('gravatar') && !src.includes('avatar')) urls.add(src);
    }
    while ((match = urlRegex.exec(html)) !== null) {
      let src = match[1];
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = 'https://webmart.by' + src;
      if (!src.includes('gravatar')) urls.add(src);
    }
    
    console.log('Found image URLs:', [...urls].slice(0, 20));
    let i = 0;
    for (const url of urls) {
      const ext = path.extname(new URL(url).pathname) || '.png';
      const filepath = path.join(OUTPUT_DIR, `logo-${i}${ext}`);
      try {
        await downloadImage(url, filepath);
        console.log('Saved:', filepath);
        i++;
      } catch (e) {
        console.warn('Failed:', url, e.message);
      }
    }
    console.log('Done. Downloaded', i, 'images');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();
