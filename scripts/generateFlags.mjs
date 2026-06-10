import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'src', 'assets', 'flags');
mkdirSync(outDir, { recursive: true });

const flags = [
  ['germany', 'DE', ['#000000', '#dd0000', '#ffce00']],
  ['spain', 'ES', ['#aa151b', '#f1bf00', '#aa151b']],
  ['france', 'FR', ['#0055a4', '#ffffff', '#ef4135']],
  ['england', 'EN', ['#ffffff', '#cf142b', '#ffffff']],
  ['portugal', 'PT', ['#006600', '#ff0000', '#ffcc00']],
  ['netherlands', 'NL', ['#ae1c28', '#ffffff', '#21468b']],
  ['italy', 'IT', ['#009246', '#ffffff', '#ce2b37']],
  ['croatia', 'HR', ['#ff0000', '#ffffff', '#171796']],
  ['belgium', 'BE', ['#000000', '#fae042', '#ed2939']],
  ['switzerland', 'CH', ['#d52b1e', '#ffffff', '#d52b1e']],
  ['denmark', 'DK', ['#c60c30', '#ffffff', '#c60c30']],
  ['austria', 'AT', ['#ed2939', '#ffffff', '#ed2939']],
  ['serbia', 'RS', ['#c6363c', '#0c4076', '#ffffff']],
  ['poland', 'PL', ['#ffffff', '#dc143c', '#dc143c']],
  ['turkey', 'TR', ['#e30a17', '#ffffff', '#e30a17']],
  ['ukraine', 'UA', ['#005bbb', '#ffd500', '#ffd500']],
  ['argentina', 'AR', ['#74acdf', '#ffffff', '#74acdf']],
  ['brazil', 'BR', ['#009c3b', '#ffdf00', '#002776']],
  ['uruguay', 'UY', ['#ffffff', '#0038a8', '#ffffff']],
  ['colombia', 'CO', ['#fcd116', '#003893', '#ce1126']],
  ['ecuador', 'EC', ['#ffdd00', '#034ea2', '#ed1c24']],
  ['paraguay', 'PY', ['#d52b1e', '#ffffff', '#0038a8']],
  ['usa', 'US', ['#b22234', '#ffffff', '#3c3b6e']],
  ['mexico', 'MX', ['#006847', '#ffffff', '#ce1126']],
  ['canada', 'CA', ['#ff0000', '#ffffff', '#ff0000']],
  ['jamaica', 'JM', ['#009b3a', '#fed100', '#000000']],
  ['honduras', 'HN', ['#00b4e5', '#ffffff', '#00b4e5']],
  ['panama', 'PA', ['#ffffff', '#005293', '#d21034']],
  ['japan', 'JP', ['#ffffff', '#bc002d', '#ffffff']],
  ['south_korea', 'KR', ['#ffffff', '#c60c30', '#003478']],
  ['iran', 'IR', ['#239f40', '#ffffff', '#da0000']],
  ['australia', 'AU', ['#012169', '#ffffff', '#e4002b']],
  ['saudi_arabia', 'SA', ['#006c35', '#ffffff', '#006c35']],
  ['qatar', 'QA', ['#ffffff', '#8a1538', '#8a1538']],
  ['iraq', 'IQ', ['#ce1126', '#ffffff', '#000000']],
  ['uzbekistan', 'UZ', ['#1eb5e5', '#ffffff', '#009b3a']],
  ['morocco', 'MA', ['#c1272d', '#006233', '#c1272d']],
  ['senegal', 'SN', ['#00853f', '#fdef42', '#e31b23']],
  ['nigeria', 'NG', ['#008753', '#ffffff', '#008753']],
  ['cameroon', 'CM', ['#007a5e', '#ce1126', '#fcd116']],
  ['egypt', 'EG', ['#ce1126', '#ffffff', '#000000']],
  ['south_africa', 'ZA', ['#007a4d', '#ffb612', '#de3831']],
  ['tunisia', 'TN', ['#e70013', '#ffffff', '#e70013']],
  ['algeria', 'DZ', ['#006233', '#ffffff', '#d21034']],
  ['dr_congo', 'CD', ['#007fff', '#f7d618', '#ce1021']],
  ['new_zealand', 'NZ', ['#00247d', '#ffffff', '#cc142b']],
  ['indonesia', 'ID', ['#ff0000', '#ffffff', '#ffffff']],
  ['trinidad', 'TT', ['#ce1126', '#ffffff', '#000000']],
];

function svgFor(code, colors) {
  const [a, b, c] = colors;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 64" role="img" aria-label="${code} flag">
  <defs>
    <linearGradient id="shine" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".28"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".22"/>
    </linearGradient>
  </defs>
  <rect width="96" height="64" rx="8" fill="${a}"/>
  <rect y="21.333" width="96" height="21.334" fill="${b}"/>
  <rect y="42.667" width="96" height="21.333" fill="${c}"/>
  <rect width="96" height="64" rx="8" fill="url(#shine)"/>
  <rect x="1.5" y="1.5" width="93" height="61" rx="6.5" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="3"/>
  <text x="48" y="41" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" letter-spacing="1.5" fill="#fff" stroke="#000" stroke-opacity=".34" stroke-width="3" paint-order="stroke">${code}</text>
</svg>`;
}

for (const [id, code, colors] of flags) {
  writeFileSync(join(outDir, `${id}.svg`), svgFor(code, colors), 'utf8');
}

console.log(`Generated ${flags.length} flag SVG files in ${outDir}`);
