// 참고 자료 목록
// - 물품 데이터(items.js)에서는 아래 id로 출처를 참조합니다.
// - url이 null인 자료는 링크 없이 이름만 표시됩니다.
// - 새로운 자료를 추가할 때는 실제로 확인한 공식 자료만 등록해주세요.

export const SOURCES = {
  moe_guide: {
    title: '재활용품 분리배출 가이드라인',
    publisher: '환경부',
    url: 'https://www.me.go.kr',
    note: '환경부 누리집 자료실에서 원문을 확인할 수 있습니다.',
  },
  moe_app: {
    title: '내 손안의 분리배출 (모바일 앱)',
    publisher: '환경부 · 한국환경공단',
    url: null,
    note: '품목별 배출 요령과 Q&A를 제공하는 공식 앱입니다.',
  },
  seoul_guide: {
    title: '분리배출 가이드라인 (2025.7.)',
    publisher: '서울특별시 기후환경본부 · 환경분야 누리집',
    url: 'https://news.seoul.go.kr/env/archives/564022',
  },
  seoul_fake: {
    title: '알쏭달쏭 재활용 가능한 척하는 일반 쓰레기는?',
    publisher: '서울특별시 · 내 손안에 서울',
    url: 'https://mediahub.seoul.go.kr/archives/2003449',
  },
  seoul_medicine: {
    title: '폐의약품, 수거함에 양보하세요! 헷갈리는 배출 방법 총정리',
    publisher: '서울특별시 · 내 손안에 서울',
    url: 'https://mediahub.seoul.go.kr/archives/2017600',
  },
  gangnam_cup: {
    title: '컵라면 이렇게 버리면 혼난다 (카드뉴스)',
    publisher: '서울특별시 강남구청',
    url: 'https://www.gangnam.go.kr/board/cardnews/197/view.do',
  },
};
