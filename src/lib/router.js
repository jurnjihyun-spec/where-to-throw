import { useEffect, useState } from 'react';

// 아주 단순한 해시 라우터
//   #/                      메인
//   #/search?q=종이컵        검색 결과
//   #/category/plastic      카테고리
//   #/item/paper-cup        물품 (질문이 있으면 질문 화면)
//   #/item/paper-cup/1      물품 + 선택한 상태(옵션 index)

function parse(hash) {
  const raw = hash.replace(/^#/, '') || '/';
  const [path, queryString = ''] = raw.split('?');
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const params = new URLSearchParams(queryString);
  return { parts, params };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function navigate(path) {
  window.location.hash = path;
}

export const paths = {
  home: () => '#/',
  search: (q) => `#/search?q=${encodeURIComponent(q)}`,
  category: (id) => `#/category/${id}`,
  item: (id, option) => (option === undefined ? `#/item/${id}` : `#/item/${id}/${option}`),
};
