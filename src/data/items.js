// =====================================================================
// 분리배출 물품 데이터
// =====================================================================
// 물품을 추가·수정할 때는 아래 형식을 따라주세요.
//
// {
//   id: 'unique-id',            // 영문/숫자/하이픈, 중복 불가 (URL에 사용)
//   name: '물품명',
//   category: 'plastic',        // categories.js의 CATEGORIES id
//   keywords: ['검색어', ...],   // 비슷한 이름, 줄임말, 흔한 오타 등
//   popular: true,              // (선택) 메인 '자주 찾는 물품'에 노출
//   verification: 'confirmed',  // 'confirmed' = 공식·지자체 자료에서 확인
//                               // 'needs-check' = 원문 대조 전 → 화면에 '확인 필요' 표시
//   sources: ['moe_guide'],     // sources.js의 id
//   cautions: ['...'],          // (선택) 모든 결과에 공통으로 붙는 주의사항
//
//   // 결과가 하나인 물품 → result
//   result: { type: 'plastic', steps: ['...'], cautions: ['...'] },
//
//   // 상태에 따라 결과가 달라지는 물품 → question
//   question: {
//     text: '질문 문구',
//     options: [
//       { label: '선택지', hint: '(선택) 보조 설명',
//         result: { type, steps, cautions, needsCheck: '(선택) 확인 필요 사유' } },
//     ],
//   },
// }
//
// type 값은 categories.js의 DISPOSAL_TYPES 키를 사용합니다.
// 공식 자료로 확인되지 않은 내용은 임의로 작성하지 말고 needsCheck / 'needs-check'로 표시해주세요.
// =====================================================================

export const ITEMS = [
  // ------------------------------------------------------------------ 플라스틱
  {
    id: 'pet-bottle',
    name: '투명 페트병',
    category: 'plastic',
    keywords: ['페트병', '생수병', '물병', '음료수병', '음료병', '페트', 'pet', '탄산음료병', '투명페트'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'pet',
      steps: [
        '내용물을 깨끗이 비우고 헹궈주세요.',
        '몸통에 붙은 라벨(부착상표)을 떼어주세요.',
        '가능한 한 납작하게 압착한 뒤 뚜껑을 닫아주세요.',
        '투명 페트병 전용 수거함(또는 투명 봉투에 따로 모아)에 배출해주세요.',
      ],
      cautions: [
        '색이 있는 페트병은 투명 페트병과 섞지 말고 플라스틱류로 배출해주세요.',
        '배출 요일과 방식(전용 수거함, 별도 봉투 등)은 지역마다 다를 수 있어요.',
      ],
    },
  },
  {
    id: 'delivery-container',
    name: '플라스틱 배달 용기',
    category: 'plastic',
    keywords: ['배달용기', '배달 그릇', '포장용기', '포장 용기', '일회용 용기', '도시락 용기', '반찬통', '반찬 용기', '테이크아웃 용기', '플라스틱 용기', '떡볶이 용기'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    question: {
      text: '음식물이나 기름이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요',
          result: {
            type: 'plastic',
            steps: [
              '뚜껑, 비닐 랩 등 다른 재질의 부착물을 분리해주세요.',
              '플라스틱류 수거함에 배출해주세요.',
            ],
          },
        },
        {
          label: '오염되어 있지만 씻을 수 있어요',
          result: {
            type: 'plastic',
            steps: [
              '남은 음식물을 비워주세요.',
              '용기에 묻은 이물질을 물로 씻어주세요.',
              '뚜껑, 비닐 랩 등 다른 재질의 부착물을 분리해주세요.',
              '플라스틱류 수거함에 배출해주세요.',
            ],
            cautions: ['씻은 뒤에도 기름기나 색이 남아 있다면 일반쓰레기로 배출해주세요.'],
          },
        },
        {
          label: '오염이 심해서 씻기 어려워요',
          result: {
            type: 'general',
            steps: [
              '남은 음식물을 비워주세요.',
              '종량제봉투에 넣어 일반쓰레기로 배출해주세요.',
            ],
            cautions: ['이물질이 제거되지 않은 용기는 선별이 어려워 재활용되지 않아요.'],
          },
        },
      ],
    },
  },
  {
    id: 'cosmetic-container',
    name: '화장품 용기',
    category: 'plastic',
    keywords: ['화장품', '로션', '스킨', '토너', '크림통', '샴푸통', '샴푸', '바디워시', '펌프', '펌프 용기', '선크림', '튜브', '스프레이'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_app', 'seoul_guide'],
    cautions: ['용기에 인쇄된 분리배출 표시(재질)를 먼저 확인해주세요.'],
    question: {
      text: '어떤 형태의 용기인가요?',
      options: [
        {
          label: '병·통 형태 (물로 헹굴 수 있어요)',
          hint: '스킨, 로션 병, 크림 통 등',
          result: {
            type: 'material',
            steps: [
              '남은 내용물을 비우고 휴지 등으로 닦아 종량제봉투에 버려주세요.',
              '용기를 물로 헹궈주세요.',
              '뚜껑 등 다른 재질의 부품을 분리해주세요.',
              '분리배출 표시에 맞는 재질(플라스틱류, 유리병류 등)로 배출해주세요.',
            ],
          },
        },
        {
          label: '펌프가 달린 용기',
          hint: '샴푸, 로션 펌프 용기 등',
          result: {
            type: 'material',
            steps: [
              '펌프를 분리해주세요. 펌프는 내부에 스프링이 있어 종량제봉투에 버려주세요.',
              '몸체의 남은 내용물을 비우고 물로 헹궈주세요.',
              '몸체는 분리배출 표시에 맞는 재질로 배출해주세요.',
            ],
            cautions: ['몸체를 깨끗이 헹굴 수 없다면 종량제봉투에 버려주세요.'],
          },
        },
        {
          label: '튜브·소형 용기 (헹굴 수 없어요)',
          hint: '튜브형 크림, 립스틱, 마스카라 등',
          result: {
            type: 'general',
            steps: ['내용물이 남은 채로 종량제봉투에 넣어 일반쓰레기로 배출해주세요.'],
            cautions: ['물로 헹굴 수 없는 구조의 용기는 재활용이 어려워요.'],
          },
        },
        {
          label: '스프레이(캔) 형태',
          hint: '헤어스프레이, 미스트 캔 등',
          result: {
            type: 'can',
            steps: [
              '화기가 없고 통풍이 잘 되는 곳에서 가스를 모두 배출해주세요.',
              '플라스틱 뚜껑을 분리해주세요.',
              '캔류로 배출해주세요.',
            ],
            cautions: ['캔에 구멍을 뚫어야 하는지는 지역마다 안내가 달라요. 거주 지역 기준을 확인해주세요.'],
          },
        },
      ],
    },
  },
  {
    id: 'styrofoam',
    name: '스티로폼',
    category: 'plastic',
    keywords: ['스치로폼', '스티로폴', '스티로폼 박스', '아이스박스', '완충재', '발포', '택배 스티로폼', '포장 스티로폼'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide', 'seoul_fake'],
    question: {
      text: '스티로폼의 상태가 어떤가요?',
      options: [
        {
          label: '깨끗해요',
          hint: '가전·택배 완충재, 깨끗한 스티로폼 박스',
          result: {
            type: 'styrofoam',
            steps: [
              '내용물을 비워주세요.',
              '테이프, 운송장, 라벨 등 다른 재질을 모두 떼어주세요.',
              '스티로폼 수거함(또는 지역 안내에 따른 배출 장소)에 배출해주세요.',
            ],
          },
        },
        {
          label: '음식물이 묻어 있어요',
          hint: '육류·생선 포장 용기 등',
          result: {
            type: 'general',
            steps: [
              '물로 씻어 이물질이 완전히 제거되면 위의 \'깨끗해요\'와 같이 배출해주세요.',
              '씻어도 지워지지 않으면 종량제봉투에 넣어 일반쓰레기로 배출해주세요.',
            ],
          },
        },
        {
          label: '건축용 단열재예요',
          hint: '공사·인테리어에서 나온 스티로폼',
          result: {
            type: 'bulky',
            steps: ['일반 재활용품으로 내놓지 말고, 거주 지역 구청·주민센터 안내에 따라 배출해주세요.'],
            needsCheck: '건축용 스티로폼의 처리 방식(대형폐기물 신고 등)은 지자체마다 달라 확인이 필요합니다.',
          },
        },
      ],
    },
    cautions: ['과일 포장용 그물망(발포 망)은 종량제봉투에 버려주세요.'],
  },
  {
    id: 'cup-noodle',
    name: '컵라면 용기',
    category: 'plastic',
    keywords: ['컵라면', '컵밥', '컵밥 용기', '라면 용기', '사발면', '컵누들'],
    popular: true,
    verification: 'confirmed',
    sources: ['seoul_guide', 'gangnam_cup'],
    question: {
      text: '국물 자국이 깨끗하게 씻기나요?',
      options: [
        {
          label: '네, 깨끗하게 씻겨요',
          result: {
            type: 'material',
            steps: [
              '남은 국물과 건더기를 비워주세요.',
              '용기를 물로 깨끗이 헹궈주세요.',
              '뚜껑 등 다른 재질은 분리해주세요.',
              '용기 바닥의 분리배출 표시를 확인해 해당 재질(종이, 스티로폼 등)로 배출해주세요.',
            ],
          },
        },
        {
          label: '빨간 기름 자국이 지워지지 않아요',
          result: {
            type: 'general',
            steps: [
              '남은 국물과 건더기를 비워주세요.',
              '종량제봉투에 넣어 일반쓰레기로 배출해주세요.',
            ],
            cautions: ['물로 헹궈도 이염이 남은 용기는 재활용이 어려워요.'],
          },
        },
      ],
    },
  },

  // ------------------------------------------------------------------ 종이
  {
    id: 'paper-cup',
    name: '종이컵',
    category: 'paper',
    keywords: ['종이 컵', '일회용 종이컵', '커피컵', '커피 컵', '테이크아웃 컵', '자판기 컵'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'paperpack',
      steps: [
        '내용물을 비우고 물로 헹궈주세요.',
        '플라스틱 뚜껑은 분리해 플라스틱류로 배출해주세요.',
        '컵을 납작하게 압착해주세요.',
        '봉투에 넣거나 묶어서 일반 종이류와 구분해 배출해주세요. (종이팩·종이컵 전용 수거함이 있으면 이용)',
      ],
      cautions: [
        '종이컵은 일반 종이(신문, 상자)와 섞어서 버리지 마세요.',
        '양면이 코팅된 종이컵은 재활용 대상이 아니므로 종량제봉투에 버려주세요.',
      ],
    },
  },
  {
    id: 'receipt',
    name: '영수증',
    category: 'paper',
    keywords: ['감열지', '카드 영수증', '카드전표', '전표', '택배 송장', '운송장', '송장', '대기번호표', '번호표'],
    popular: true,
    verification: 'confirmed',
    sources: ['seoul_guide', 'seoul_fake'],
    result: {
      type: 'general',
      steps: [
        '개인정보가 적혀 있다면 가리거나 잘게 찢어주세요.',
        '종량제봉투에 넣어 일반쓰레기로 배출해주세요.',
      ],
      cautions: [
        '영수증(감열지)은 종이처럼 보이지만 종이류로 분리배출할 수 없어요.',
        '택배 운송장(전표)도 같은 이유로 종량제봉투에 버려주세요.',
      ],
    },
  },
  {
    id: 'parcel-box',
    name: '택배 상자',
    category: 'paper',
    keywords: ['택배박스', '박스', '상자', '종이상자', '종이 박스', '골판지', '라면 박스'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'paper',
      steps: [
        '테이프, 운송장, 철핀을 모두 제거해주세요.',
        '안에 든 완충재(비닐, 스티로폼 등)는 따로 분리해주세요.',
        '상자를 접어 납작하게 만들어주세요.',
        '종이류로 배출해주세요.',
      ],
      cautions: ['운송장은 재활용되지 않으므로 떼어서 종량제봉투에 버려주세요.'],
    },
  },
  {
    id: 'milk-carton',
    name: '우유팩 (종이팩)',
    category: 'paper',
    keywords: ['우유팩', '우유곽', '종이팩', '두유팩', '주스팩', '멸균팩', '음료팩'],
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'paperpack',
      steps: [
        '내용물을 비우고 물로 헹궈주세요.',
        '빨대, 비닐 등 다른 재질은 떼어주세요.',
        '일반 종이류와 섞이지 않도록 종이팩 전용 수거함에 배출해주세요.',
      ],
      cautions: [
        '종이팩은 일반 종이와 재활용 공정이 달라 꼭 구분해야 해요.',
        '주민센터에서 종이팩을 모아 가면 생활용품으로 교환해주는 지역도 있어요. (지역별 상이)',
      ],
    },
  },
  {
    id: 'pizza-box',
    name: '피자 박스',
    category: 'paper',
    keywords: ['피자박스', '피자 상자', '치킨 박스', '치킨박스', '배달 상자', '음식 상자'],
    verification: 'confirmed',
    sources: ['seoul_guide'],
    question: {
      text: '기름이나 음식물이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요',
          result: {
            type: 'paper',
            steps: ['테이프 등 다른 재질을 떼어주세요.', '접어서 종이류로 배출해주세요.'],
          },
        },
        {
          label: '일부분만 묻어 있어요',
          result: {
            type: 'paper',
            steps: [
              '기름·음식물이 묻은 부분을 잘라내 종량제봉투에 버려주세요.',
              '깨끗한 부분만 접어서 종이류로 배출해주세요.',
            ],
          },
        },
        {
          label: '전체적으로 오염되어 있어요',
          result: {
            type: 'general',
            steps: ['종량제봉투에 넣어 일반쓰레기로 배출해주세요.'],
            cautions: ['오염된 종이는 재활용되지 않아요.'],
          },
        },
      ],
    },
  },
  {
    id: 'newspaper-book',
    name: '신문·책·노트',
    category: 'paper',
    keywords: ['신문', '신문지', '책', '공책', '노트', '전단지', '잡지', '종이', 'a4'],
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'paper',
      steps: [
        '스프링, 비닐 코팅 표지 등 종이가 아닌 부분을 제거해주세요.',
        '펴서 차곡차곡 쌓은 뒤 끈으로 묶어주세요.',
        '물에 젖지 않게 종이류로 배출해주세요.',
      ],
      cautions: ['비닐 코팅된 광고지, 코팅지는 종이류에 섞지 말고 종량제봉투에 버려주세요.'],
    },
  },

  // ------------------------------------------------------------------ 비닐
  {
    id: 'vinyl-packaging',
    name: '비닐 포장재',
    category: 'vinyl',
    keywords: ['비닐', '비닐봉지', '비닐봉투', '포장 비닐', '포장비닐', '에어캡', '뽁뽁이', '과자봉지', '과자 봉지', '라면봉지', '라면 봉지', '택배 비닐', '봉지'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    question: {
      text: '음식물 등 이물질이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요',
          result: {
            type: 'vinyl',
            steps: [
              '내용물을 비워주세요.',
              '흩날리지 않도록 투명 봉투에 모아 비닐류로 배출해주세요.',
            ],
          },
        },
        {
          label: '묻어 있지만 씻을 수 있어요',
          result: {
            type: 'vinyl',
            steps: [
              '부스러기와 이물질을 털어내고 물로 헹궈주세요.',
              '물기를 뺀 뒤 투명 봉투에 모아 비닐류로 배출해주세요.',
            ],
          },
        },
        {
          label: '오염이 심해서 씻기 어려워요',
          result: {
            type: 'general',
            steps: ['종량제봉투에 넣어 일반쓰레기로 배출해주세요.'],
          },
        },
      ],
    },
    cautions: [
      '비닐은 색과 종류에 상관없이 비닐류로 모으되, 플라스틱류와 섞지 마세요.',
    ],
  },

  // ------------------------------------------------------------------ 유리·금속
  {
    id: 'glass-bottle',
    name: '유리병',
    category: 'glass-metal',
    keywords: ['병', '소주병', '맥주병', '음료병', '잼병', '유리 병', '와인병', '드링크병'],
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    result: {
      type: 'glass',
      steps: [
        '뚜껑을 분리해 재질에 맞게 따로 배출해주세요.',
        '내용물을 비우고 물로 헹궈주세요.',
        '유리병류로 배출해주세요.',
      ],
      cautions: [
        '거울, 도자기, 내열·크리스탈 유리, 판유리는 유리병류가 아니에요.',
        '빈용기보증금 대상 병(소주병, 맥주병 등)은 판매처에 반환하면 보증금을 돌려받을 수 있어요.',
      ],
    },
  },
  {
    id: 'broken-glass',
    name: '깨진 유리',
    category: 'glass-metal',
    keywords: ['유리 조각', '유리조각', '깨진 컵', '깨진 유리컵', '유리컵', '깨진 병', '거울'],
    verification: 'confirmed',
    sources: ['moe_guide', 'seoul_guide'],
    question: {
      text: '양이 얼마나 되나요?',
      options: [
        {
          label: '조금이에요',
          result: {
            type: 'general',
            steps: [
              '다치지 않도록 신문지 등으로 단단히 감싸주세요.',
              '종량제봉투에 넣어 배출해주세요.',
            ],
          },
        },
        {
          label: '많아요',
          result: {
            type: 'special_bag',
            steps: [
              '다치지 않도록 신문지 등으로 감싸주세요.',
              '특수규격마대(불연성 쓰레기 마대)에 담아 배출해주세요.',
            ],
            cautions: ['특수규격마대는 지역 판매처(주민센터, 편의점 등)에서 구입할 수 있어요. 판매처는 지역마다 달라요.'],
          },
        },
      ],
    },
    cautions: ['깨진 유리는 유리병류로 배출하지 마세요.', '봉투 겉에 \'깨진 유리\'라고 적어두면 수거하는 분이 다치지 않아요.'],
  },
  {
    id: 'can',
    name: '음료 캔·통조림 캔',
    category: 'glass-metal',
    keywords: ['캔', '맥주캔', '콜라캔', '음료캔', '참치캔', '통조림', '알루미늄캔', '철캔', '깡통'],
    verification: 'needs-check',
    sources: ['moe_guide'],
    result: {
      type: 'can',
      steps: [
        '내용물을 비우고 물로 헹궈주세요.',
        '플라스틱 뚜껑 등 다른 재질은 분리해주세요.',
        '캔류로 배출해주세요.',
      ],
      cautions: ['통조림 캔의 날카로운 뚜껑에 다치지 않도록 주의해주세요.'],
    },
  },
  {
    id: 'gas-can',
    name: '부탄가스·스프레이 캔',
    category: 'glass-metal',
    keywords: ['부탄가스', '가스통', '휴대용 가스', '스프레이', '에어로졸', '살충제', '헤어스프레이', '방향제'],
    verification: 'confirmed',
    sources: ['moe_guide', 'moe_app'],
    result: {
      type: 'can',
      steps: [
        '화기가 없고 통풍이 잘 되는 곳에서 남은 가스를 모두 배출해주세요.',
        '플라스틱 뚜껑을 분리해주세요.',
        '캔류로 배출해주세요.',
      ],
      cautions: [
        '가스가 남아 있으면 수거·선별 과정에서 폭발·화재 위험이 있어요.',
        '구멍을 뚫어 배출해야 하는지는 지역마다 안내가 달라요. 거주 지역 기준을 확인해주세요.',
      ],
    },
  },

  // ------------------------------------------------------------------ 생활용품
  {
    id: 'toothbrush',
    name: '칫솔',
    category: 'household',
    keywords: ['칫솔', '전동칫솔모', '칫솔모', '치솔'],
    popular: true,
    verification: 'confirmed',
    sources: ['seoul_guide', 'seoul_fake'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 일반쓰레기로 배출해주세요.'],
      cautions: [
        '칫솔은 손잡이와 솔 등 여러 재질이 섞여 있어 플라스틱류로 재활용되지 않아요.',
        '전동칫솔 본체는 전자제품이므로 칫솔과 다르게 처리해야 해요. (거주 지역 안내 확인)',
      ],
    },
  },
  {
    id: 'ice-pack',
    name: '아이스팩',
    category: 'household',
    keywords: ['아이스 팩', '보냉팩', '냉매팩', '젤 아이스팩', '얼음팩'],
    verification: 'confirmed',
    sources: ['seoul_guide', 'gangnam_cup'],
    question: {
      text: '내용물이 어떤가요?',
      options: [
        {
          label: '젤 형태예요',
          hint: '말랑하고 투명하거나 흰 젤',
          result: {
            type: 'general',
            steps: ['내용물을 뜯지 말고 그대로 종량제봉투에 넣어 배출해주세요.'],
            cautions: ['젤(고흡수성수지)을 하수구나 변기에 버리면 수질오염을 일으킬 수 있어요.'],
          },
        },
        {
          label: '물 형태예요',
          hint: '녹이면 물처럼 흐르는 내용물',
          result: {
            type: 'general',
            steps: ['거주 지역의 아이스팩 배출 안내를 확인해주세요.'],
            needsCheck: '물로 된 아이스팩의 내용물·포장재 분리 배출 기준은 공식 자료로 확인하지 못했습니다. 확인 전까지는 종량제봉투에 버리는 것이 안전합니다.',
          },
        },
      ],
    },
    cautions: ['일부 지역은 깨끗한 아이스팩을 재사용 목적으로 따로 수거해요. 주민센터에 수거함이 있는지 확인해보세요.'],
  },
  {
    id: 'wet-wipes',
    name: '물티슈',
    category: 'household',
    keywords: ['물 티슈', '물휴지', '부직포', '마스크', '키친타월'],
    verification: 'confirmed',
    sources: ['seoul_guide'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 일반쓰레기로 배출해주세요.'],
      cautions: [
        '물티슈는 종이가 아닌 부직포(합성섬유)라서 종이류로 재활용되지 않아요.',
        '변기에 버리면 배관이 막힐 수 있어요.',
      ],
    },
  },

  // ------------------------------------------------------------------ 기타
  {
    id: 'battery',
    name: '건전지',
    category: 'etc',
    keywords: ['배터리', '폐건전지', 'aa', 'aaa', '건전지', '코인전지', '수은전지', '전지'],
    popular: true,
    verification: 'confirmed',
    sources: ['moe_guide'],
    result: {
      type: 'battery',
      steps: [
        '종량제봉투에 넣지 말고 따로 모아주세요.',
        '주민센터, 아파트 단지 등에 설치된 폐건전지 전용 수거함에 넣어주세요.',
      ],
      cautions: [
        '폐건전지는 유해폐기물로 분류되어 일반쓰레기와 섞으면 안 돼요.',
        '수거함 위치는 거주 지역 주민센터나 구청에서 확인할 수 있어요.',
      ],
    },
  },
  {
    id: 'fluorescent-lamp',
    name: '형광등',
    category: 'etc',
    keywords: ['폐형광등', '전구', '형광 등', '램프', '조명'],
    verification: 'confirmed',
    sources: ['moe_guide'],
    result: {
      type: 'lamp',
      steps: [
        '깨지지 않도록 조심해서 다뤄주세요.',
        '주민센터, 아파트 단지 등에 설치된 폐형광등 전용 수거함에 넣어주세요.',
      ],
      cautions: ['형광등은 유해폐기물로 분류되어 일반쓰레기와 섞으면 안 돼요.'],
    },
    // 깨진 형광등, LED 등은 처리 기준을 확인하지 못해 등록하지 않았습니다.
  },
  {
    id: 'medicine',
    name: '폐의약품',
    category: 'etc',
    keywords: ['약', '먹다 남은 약', '알약', '물약', '연고', '감기약', '시럽', '의약품', '유통기한 지난 약'],
    popular: true,
    verification: 'confirmed',
    sources: ['seoul_medicine'],
    question: {
      text: '어떤 형태의 약인가요?',
      options: [
        {
          label: '알약·가루약',
          result: {
            type: 'medicine',
            steps: [
              '포장(포장지, 상자)을 벗기고 약만 모아주세요.',
              '약국·보건소·주민센터 등의 폐의약품 수거함에 넣어주세요.',
            ],
            cautions: ['일부 지역은 밀봉 후 봉투에 \'폐의약품\'이라고 적어 우체통에 넣을 수도 있어요.'],
          },
        },
        {
          label: '물약·시럽·연고',
          result: {
            type: 'medicine',
            steps: [
              '물약은 마개를 꼭 닫아주세요.',
              '약국·보건소 등의 폐의약품 전용 수거함에 넣어주세요.',
            ],
            cautions: ['물약과 연고는 우편물을 오염시킬 수 있어 우체통에 넣으면 안 돼요.'],
          },
        },
      ],
    },
    cautions: [
      '종량제봉투나 싱크대·변기에 버리면 환경과 건강에 해로울 수 있어요.',
      '비타민, 홍삼 같은 건강기능식품은 의약품이 아니므로 일반쓰레기로 버려주세요.',
    ],
  },
  {
    id: 'ceramic',
    name: '깨진 도자기·뚝배기',
    category: 'etc',
    keywords: ['도자기', '사기그릇', '그릇', '접시', '뚝배기', '머그컵', '내열유리', '내열 유리', '화분'],
    verification: 'needs-check',
    sources: ['seoul_guide'],
    result: {
      type: 'special_bag',
      steps: [
        '깨진 조각은 다치지 않도록 신문지 등으로 감싸주세요.',
        '특수규격마대(불연성 쓰레기 마대)에 담아 배출해주세요.',
      ],
      cautions: [
        '도자기, 내열유리는 유리병류로 재활용되지 않아요.',
        '소량일 때 종량제봉투 배출이 가능한지는 지역마다 달라요.',
      ],
    },
  },
];
