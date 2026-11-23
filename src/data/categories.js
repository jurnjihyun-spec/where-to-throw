// 카테고리 (메인 화면 / 카테고리 탐색에 사용)
export const CATEGORIES = [
  { id: 'plastic', name: '플라스틱', desc: '즉석밥 용기, 페트병, 스티로폼' },
  { id: 'paper', name: '종이', desc: '종이컵, 영수증, 코팅 종이' },
  { id: 'vinyl', name: '비닐', desc: '뽁뽁이, 과자 봉지, 랩' },
  { id: 'glass-metal', name: '유리·금속', desc: '유리병, 캔, 깨진 유리' },
  { id: 'household', name: '생활용품', desc: '칫솔, 아이스팩, 고무장갑' },
  { id: 'etc', name: '기타', desc: '건전지, 의약품, 커피 캡슐' },
];

// 배출 유형의 큰 분류 (결과 화면 배지 색상)
export const GROUPS = {
  recycle: { label: '재활용 분리배출', tone: 'green' },
  general: { label: '일반쓰레기', tone: 'gray' },
  separate: { label: '별도 수거·배출', tone: 'amber' },
  check: { label: '추가 확인 필요', tone: 'check' },
};

// 배출 유형
export const DISPOSAL_TYPES = {
  pet: { label: '투명 페트병', group: 'recycle' },
  plastic: { label: '플라스틱류', group: 'recycle' },
  styrofoam: { label: '스티로폼(발포합성수지)', group: 'recycle' },
  paper: { label: '종이류', group: 'recycle' },
  paperpack: { label: '종이팩·종이컵', group: 'recycle' },
  vinyl: { label: '비닐류', group: 'recycle' },
  glass: { label: '유리병류', group: 'recycle' },
  can: { label: '캔류', group: 'recycle' },
  scrap: { label: '고철류', group: 'recycle' },
  material: { label: '재질별 분리배출', group: 'recycle' },
  general: { label: '종량제봉투', group: 'general' },
  special_bag: { label: '특수규격마대(불연성)', group: 'separate' },
  battery: { label: '전지류 수거함', group: 'separate' },
  lamp: { label: '형광등 전용 수거함', group: 'separate' },
  medicine: { label: '폐의약품 수거함', group: 'separate' },
  bulky: { label: '대형폐기물 신고', group: 'separate' },
  check: { label: '제품·지역별 확인', group: 'check' },
};
