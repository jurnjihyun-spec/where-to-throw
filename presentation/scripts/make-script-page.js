// presentation-script.md → public/script.html (휴대폰에서 보는 발표 스크립트)
// 빌드 전에 자동 실행됩니다. 외부 라이브러리 없이 필요한 마크다운만 변환합니다.
import { readFileSync, writeFileSync } from 'node:fs';

const md = readFileSync(new URL('../presentation-script.md', import.meta.url), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) =>
  esc(s)
    .replace(/"([^"]+)"/g, '<q>$1</q>')
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(https?:\/\/[^\s)<]+)/g, '<a href="$1">$1</a>');

const lines = md.split('\n');
let title = '';
const sections = []; // { id, title, time, html }
let intro = '';
let cur = null;
let html = '';
let listDepth = -1;

const closeLists = (to = -1) => {
  while (listDepth > to) { html += '</li></ul>'; listDepth -= 1; }
};
const flush = () => {
  closeLists();
  if (cur) cur.html = html; else intro = html;
  html = '';
};

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  if (/^# /.test(line)) { title = line.slice(2).trim(); continue; }
  const h = line.match(/^(##|###) (.+)$/);
  if (h) {
    flush();
    const m = h[2].match(/^(.*?)\s*\((\d+:\d+)\)\s*$/);
    cur = { id: `s${sections.length + 1}`, title: m ? m[1] : h[2], time: m ? m[2] : '', html: '' };
    sections.push(cur);
    continue;
  }
  if (/^---\s*$/.test(line)) { closeLists(); continue; }
  if (/^\|/.test(line)) {
    closeLists();
    const rows = [];
    while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i += 1; }
    i -= 1;
    const cells = (r) => r.split('|').slice(1, -1).map((c) => c.trim());
    const [head, , ...body] = rows;
    html += '<table><thead><tr>' + cells(head).map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>'
      + body.map((r) => '<tr>' + cells(r).map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('')
      + '</tbody></table>';
    continue;
  }
  const li = line.match(/^(\s*)- (.+)$/);
  if (li) {
    const depth = Math.floor(li[1].length / 2);
    if (depth > listDepth) { while (listDepth < depth) { html += '<ul><li>'; listDepth += 1; } }
    else { closeLists(depth); html += '</li><li>'; }
    html += inline(li[2]);
    continue;
  }
  if (line.trim() === '') { closeLists(); continue; }
  closeLists();
  html += `<p class="${line.startsWith('**결론부터**') ? 'lead' : ''}">${inline(line)}</p>`;
}
flush();

const nav = sections.map((s) => `<a href="#${s.id}">${esc(s.title.replace(/:.*/, ''))}</a>`).join('');
const body = sections.map((s) => `
<section id="${s.id}">
  <h2>${inline(s.title)}${s.time ? `<span class="time">${s.time}</span>` : ''}</h2>
  ${s.html}
</section>`).join('');

const page = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#0d1210" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<title>발표 스크립트 · AIP02 R1</title>
<style>
  :root { --ink:#0d1210; --mute:#5f6a65; --line:#e3e7e4; --green:#1f7a52; --marker:#bdeccf; --bg:#f3f5f3; }
  * { box-sizing: border-box; }
  html { scroll-padding-top: 64px; -webkit-text-size-adjust: 100%; }
  body { margin: 0; font-family: 'Pretendard Variable', Pretendard, -apple-system, system-ui, 'Apple SD Gothic Neo', sans-serif; color: var(--ink); background: #fff; font-size: 17px; line-height: 1.7; word-break: keep-all; overflow-wrap: anywhere; }
  header.top { padding: 22px 18px 14px; }
  header.top h1 { margin: 0; font-size: 21px; line-height: 1.4; letter-spacing: -0.02em; }
  header.top p { margin: 4px 0 0; font-size: 13px; color: var(--mute); }
  nav { position: sticky; top: 0; z-index: 5; display: flex; gap: 6px; overflow-x: auto; padding: 10px 14px; background: rgba(255,255,255,.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); scrollbar-width: none; }
  nav::-webkit-scrollbar { display: none; }
  nav a { flex-shrink: 0; padding: 7px 12px; border-radius: 999px; background: var(--bg); color: var(--ink); font-size: 14px; font-weight: 600; text-decoration: none; }
  main { padding: 0 18px 60px; }
  .intro { padding: 6px 0 10px; }
  section { padding: 22px 0 8px; border-top: 1px solid var(--line); }
  h2 { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin: 0 0 10px; font-size: 20px; line-height: 1.4; letter-spacing: -0.02em; }
  .time { flex-shrink: 0; padding: 2px 9px; border-radius: 6px; background: var(--ink); color: #fff; font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; }
  p { margin: 0 0 10px; }
  p.lead { padding: 12px 14px; border-left: 4px solid var(--green); background: var(--bg); font-weight: 600; border-radius: 0 6px 6px 0; }
  p.lead b { color: var(--green); }
  ul { margin: 0 0 10px; padding-left: 20px; }
  ul ul { margin: 2px 0 4px; color: var(--mute); }
  li { margin: 4px 0; }
  q { quotes: '“' '”'; background: linear-gradient(transparent 60%, var(--marker) 60%); }
  a { color: var(--green); word-break: break-all; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 15px; }
  th, td { padding: 8px 6px; border-bottom: 1px solid var(--line); text-align: left; }
  th { font-size: 13px; color: var(--mute); }
  td:nth-child(n+2), th:nth-child(n+2) { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .top-btn { position: fixed; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom)); width: 44px; height: 44px; border-radius: 50%; background: var(--ink); color: #fff; display: grid; place-items: center; text-decoration: none; font-size: 18px; box-shadow: 0 6px 16px rgba(0,0,0,.2); }
  @media (min-width: 720px) { main, header.top { max-width: 720px; margin: 0 auto; } body { font-size: 18px; } }
</style>
</head>
<body>
<header class="top"><h1>${inline(title)}</h1><p>휴대폰용 발표 스크립트 · 원본: presentation-script.md</p></header>
<nav>${nav}</nav>
<main>
  <div class="intro">${intro}</div>
  ${body}
</main>
<a class="top-btn" href="#" aria-label="맨 위로">↑</a>
</body>
</html>
`;

writeFileSync(new URL('../public/script.html', import.meta.url), page);
console.log(`script.html generated (${sections.length} sections)`);
