// 카테고리 (메인 화면 / 카테고리 탐색에 사용)
export const CATEGORIES = [
  { id: 'plastic', name: '플라스틱', desc: '페트병, 배달 용기, 스티로폼' },
  { id: 'paper', name: '종이', desc: '종이컵, 영수증, 상자, 종이팩' },
  { id: 'vinyl', name: '비닐', desc: '포장 비닐, 과자·라면 봉지' },
  { id: 'glass-metal', name: '유리·금속', desc: '유리병, 캔, 깨진 유리' },
  { id: 'household', name: '생활용품', desc: '칫솔, 아이스팩, 물티슈' },
  { id: 'etc', name: '기타', desc: '건전지, 형광등, 의약품' },
];

// 배출 유형 (결과 화면의 강조 배지 색상에 사용)
// tone: green(재활용) / gray(일반쓰레기) / amber(전용 수거·특수 배출)
export const DISPOSAL_TYPES = {
  pet: { label: '투명 페트병', tone: 'green' },
  plastic: { label: '플라스틱류', tone: 'green' },
  styrofoam: { label: '발포합성수지(스티로폼)', tone: 'green' },
  paper: { label: '종이류', tone: 'green' },
  paperpack: { label: '종이팩·종이컵', tone: 'green' },
  vinyl: { label: '비닐류', tone: 'green' },
  glass: { label: '유리병류', tone: 'green' },
  can: { label: '캔류', tone: 'green' },
  material: { label: '재질별 분리배출', tone: 'green' },
  general: { label: '일반쓰레기 (종량제봉투)', tone: 'gray' },
  special_bag: { label: '불연성 쓰레기 (특수규격마대)', tone: 'amber' },
  battery: { label: '폐건전지 전용 수거함', tone: 'amber' },
  lamp: { label: '폐형광등 전용 수거함', tone: 'amber' },
  medicine: { label: '폐의약품 수거함', tone: 'amber' },
  bulky: { label: '대형폐기물 (지자체 신고)', tone: 'amber' },
};
