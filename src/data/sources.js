// 참고 자료(공식 근거) 목록
// - 물품 데이터(items.js)에서는 아래 id로 출처를 참조합니다.
// - 모든 항목은 2026년 11월에 원문을 직접 열람해 내용을 확인한 자료입니다.
// - 새 자료를 추가할 때도 실제로 열어본 공식 페이지만 등록해주세요.

export const SOURCES = {
  // ---------------------------------------------------------------- 환경부 / 정부
  wasteguide: {
    title: '생활폐기물 분리배출 누리집 (분리배출.kr)',
    publisher: '환경부',
    date: '2025.9. 개설',
    url: 'https://wasteguide.or.kr',
    note: '730개 품목의 배출 방법과 우리 동네(시군구) 기준을 검색할 수 있어요.',
  },
  korea_wasteguide: {
    title: '지역마다 다른 생활폐기물 분리배출…"쉽게, 한 번에 확인을"',
    publisher: '대한민국 정책브리핑 · 환경부',
    date: '2025.9.5.',
    url: 'https://m.korea.kr/news/policyNewsView.do?newsId=148948744',
  },
  korea_ricebowl: {
    title: '즉석밥 용기 재활용 가능…생산부터 재활용 고려토록 지속 관리',
    publisher: '대한민국 정책브리핑 · 환경부 설명자료',
    date: '2020.11.27.',
    url: 'https://www.korea.kr/briefing/actuallyView.do?newsId=148880304',
  },
  korea_policy: {
    title: '분리배출 방법, 꼼꼼히 알려드려요!',
    publisher: '대한민국 정책브리핑 · 환경부',
    date: '2018.4.9.',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148849590',
  },
  korea_brief: {
    title: '분리배출만 잘해도…생활 속 탄소중립 실천방법은?',
    publisher: '대한민국 정책브리핑 · 환경부 부처 브리핑',
    date: '2021.6.24.',
    url: 'https://www.korea.kr/briefing/policyBriefingView.do?newsId=148889163',
  },
  korea_holiday: {
    title: '명절에 많이 나오는 쓰레기 분리배출 완벽 가이드',
    publisher: '대한민국 정책브리핑 · 환경부',
    date: '2020.10.6.',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148878454',
  },
  korea_10y: {
    title: '재활용품 분리배출 경력 10년에도 몰랐던 사실',
    publisher: '대한민국 정책브리핑 · 정책기자',
    date: '2021.3.30.',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148885369',
  },
  korea_paper: {
    title: '지구를 구하는 일상 속 분리배출 - 종이 편',
    publisher: '대한민국 정책브리핑 · 환경부',
    date: '2023.7.31.',
    url: 'https://www.korea.kr/multi/visualNewsView.do?newsId=148918297',
  },
  korea_capsule: {
    title: '네스프레소 커피캡슐도 우체국서 회수…폐자원 재활용 촉진',
    publisher: '대한민국 정책브리핑 · 환경부',
    date: '2025.4.22.',
    url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148942194',
  },

  // ---------------------------------------------------------------- 서울시 / 자치구
  seoul_guide: {
    title: '헷갈리는 분리배출 기준, 서울시가 알려드립니다! (붙임: 환경부 분리배출 요령)',
    publisher: '서울특별시 자원순환과 · 환경분야 누리집',
    date: '2025.8.6. 수정',
    url: 'https://news.seoul.go.kr/env/archives/564022',
  },
  seoul_rubber: {
    title: '고무장갑은 재활용? 종량제봉투? 서울시 배출기준 마련',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2025.6.17.',
    url: 'https://mediahub.seoul.go.kr/archives/2014828',
  },
  seoul_fake: {
    title: '알쏭달쏭 재활용 가능한 척하는 일반 쓰레기는?',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2021.12.10.',
    url: 'https://mediahub.seoul.go.kr/archives/2003449',
  },
  seoul_vinyl: {
    title: '비닐 분리배출 방법 헷갈릴 때 이것만은 꼭 기억해요!',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2021.6.10.',
    url: 'https://mediahub.seoul.go.kr/archives/2001916',
  },
  seoul_icepack: {
    title: '냉동실에 쌓인 아이스팩, 어떻게 버려야 할까?',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2021.5.14.',
    url: 'https://mediahub.seoul.go.kr/archives/2001619',
  },
  seoul_cosmetic: {
    title: '알쏭달쏭~ 헷갈리는 화장품 분리배출, 이렇게 하세요!',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2024.9.19.',
    url: 'https://mediahub.seoul.go.kr/archives/2011746',
  },
  seoul_tips: {
    title: '헷갈리기 쉬운 재활용품, 올바른 분리배출 방법은 이렇게!',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2025.3.7. 수정',
    url: 'https://mediahub.seoul.go.kr/archives/2010772',
  },
  seoul_toothpaste: {
    title: '치약용기는 재활용이 될까? 올바른 분리배출법 확인하세요!',
    publisher: '서울특별시 · 내 손안에 서울 (시민기자)',
    date: '2021.10.1.',
    url: 'https://mediahub.seoul.go.kr/archives/2002772',
  },
  seoul_medicine: {
    title: '폐의약품, 수거함에 양보하세요! 헷갈리는 배출 방법 총정리',
    publisher: '서울특별시 · 내 손안에 서울',
    date: '2026.3.30.',
    url: 'https://mediahub.seoul.go.kr/archives/2017600',
  },
  gangnam_cup: {
    title: '[카드뉴스] 컵라면 이렇게 버리면 혼난다',
    publisher: '서울특별시 강남구청',
    date: '2019.11.26.',
    url: 'https://www.gangnam.go.kr/board/cardnews/197/view.do',
  },
};
