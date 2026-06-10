import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'src', 'assets', 'flags');
mkdirSync(outDir, { recursive: true });

const flags = {
  germany: 'de',
  spain: 'es',
  france: 'fr',
  england: 'gb-eng',
  portugal: 'pt',
  netherlands: 'nl',
  italy: 'it',
  croatia: 'hr',
  belgium: 'be',
  switzerland: 'ch',
  denmark: 'dk',
  austria: 'at',
  serbia: 'rs',
  poland: 'pl',
  turkey: 'tr',
  ukraine: 'ua',
  argentina: 'ar',
  brazil: 'br',
  uruguay: 'uy',
  colombia: 'co',
  ecuador: 'ec',
  paraguay: 'py',
  usa: 'us',
  mexico: 'mx',
  canada: 'ca',
  jamaica: 'jm',
  honduras: 'hn',
  panama: 'pa',
  japan: 'jp',
  south_korea: 'kr',
  iran: 'ir',
  australia: 'au',
  saudi_arabia: 'sa',
  qatar: 'qa',
  iraq: 'iq',
  uzbekistan: 'uz',
  morocco: 'ma',
  senegal: 'sn',
  nigeria: 'ng',
  cameroon: 'cm',
  egypt: 'eg',
  south_africa: 'za',
  tunisia: 'tn',
  algeria: 'dz',
  dr_congo: 'cd',
  new_zealand: 'nz',
  indonesia: 'id',
  trinidad: 'tt',
};

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (
        response.statusCode &&
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location &&
        redirects < 4
      ) {
        response.resume();
        resolve(get(new URL(response.headers.location, url).toString(), redirects + 1));
        return;
      }

      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Failed ${url}: ${response.statusCode}`));
        return;
      }

      response.setEncoding('utf8');
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

function cleanSvg(svg) {
  return svg
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<desc>[\s\S]*?<\/desc>/g, '')
    .trim();
}

const entries = Object.entries(flags);

for (const [id, code] of entries) {
  const url = `https://flagcdn.com/${code}.svg`;
  const svg = cleanSvg(await get(url));
  if (!svg.includes('<svg')) {
    throw new Error(`Downloaded content for ${id} is not SVG`);
  }
  writeFileSync(join(outDir, `${id}.svg`), svg, 'utf8');
}

console.log(`Downloaded ${entries.length} standard flag SVG files into ${outDir}`);
