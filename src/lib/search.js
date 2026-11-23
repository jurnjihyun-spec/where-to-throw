import { ITEMS } from '../data/items.js';

// 공백·기호 제거 + 소문자화
export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\s·.,\-_/()()]/g, '');
}

// 한글 초성 추출 (예: '종이컵' → 'ㅈㅇㅋ')
const CHOSEONG = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
function toChoseong(text) {
  let out = '';
  for (const ch of text) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code >= 0 && code < 11172) out += CHOSEONG[Math.floor(code / 588)];
    else out += ch;
  }
  return out;
}
const isChoseongOnly = (text) => /^[ㄱ-ㅎ]+$/.test(text);

// 글자 2개 단위(bigram) 유사도 — 오타·어순 차이 대응
function bigrams(text) {
  if (text.length < 2) return [text];
  const out = [];
  for (let i = 0; i < text.length - 1; i += 1) out.push(text.slice(i, i + 2));
  return out;
}
function similarity(a, b) {
  const A = bigrams(a);
  const B = bigrams(b);
  const pool = [...B];
  let hit = 0;
  for (const g of A) {
    const idx = pool.indexOf(g);
    if (idx !== -1) {
      hit += 1;
      pool.splice(idx, 1);
    }
  }
  return (2 * hit) / (A.length + B.length);
}

// 검색어 하나와 후보 문자열 하나의 점수 (0 ~ 100)
function scoreTerm(query, term) {
  if (!term) return 0;
  if (term === query) return 100;
  if (term.startsWith(query)) return 85;
  if (term.includes(query)) return 70;
  if (query.length >= 2 && query.includes(term) && term.length >= 2) return 60;
  if (isChoseongOnly(query) && toChoseong(term).startsWith(query)) return 55;
  const sim = similarity(query, term);
  return sim >= 0.4 ? Math.round(sim * 50) : 0;
}

// 물품 검색: 점수 순으로 정렬된 물품 배열 반환
export function searchItems(rawQuery, limit = 20) {
  const query = normalize(rawQuery);
  if (!query) return [];

  const results = [];
  for (const item of ITEMS) {
    const nameScore = scoreTerm(query, normalize(item.name));
    let keywordScore = 0;
    for (const kw of item.keywords) {
      keywordScore = Math.max(keywordScore, scoreTerm(query, normalize(kw)));
      if (keywordScore === 100) break;
    }
    // 이름 일치를 키워드 일치보다 약간 우대
    const score = Math.max(nameScore + 2, keywordScore);
    if (score > 2) results.push({ item, score });
  }

  results.sort((a, b) => b.score - a.score);
  // 확실한 결과가 있으면, 글자 유사도로만 걸린 약한 결과는 숨김
  const top = results[0]?.score || 0;
  const cutoff = top >= 70 ? 45 : 0;
  return results
    .filter((r) => r.score >= cutoff)
    .slice(0, limit)
    .map((r) => r.item);
}

export function getItem(id) {
  return ITEMS.find((item) => item.id === id);
}

export function getItemsByCategory(categoryId) {
  return ITEMS.filter((item) => item.category === categoryId);
}

// 메인 '많이 헷갈리는 물품' (confusing 값 순서)
export function getConfusingItems() {
  return ITEMS.filter((item) => item.confusing).sort((a, b) => a.confusing - b.confusing);
}
