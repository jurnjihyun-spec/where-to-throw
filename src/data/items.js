// =====================================================================
// 분리배출 물품 데이터
// =====================================================================
// 물품을 추가·수정할 때는 아래 형식을 따라주세요.
//
// {
//   id: 'unique-id',            // 영문/숫자/하이픈, 중복 불가 (URL에 사용)
//   name: '물품명',
//   category: 'plastic',        // categories.js의 CATEGORIES id
//   icon: 'bottle',             // components/Icon.jsx의 아이콘 이름
//   keywords: ['검색어', ...],   // 별칭, 일상 표현, 흔한 오타
//   confusing: 1,               // (선택) 메인 '많이 헷갈리는 물품' 노출 순서
//   reason: '판단 이유 1~2문장', // 왜 그 유형인지 (질문형은 옵션별 reason이 우선)
//   verification: 'confirmed',  // 'confirmed' = 공식 자료 원문에서 확인
//                               // 'needs-check' = 일부 확인 불가 → '추가 확인 필요' 표시
//   sources: ['wg:품목명', 'seoul_guide'],
//                               // 'wg:품목명' = 환경부 생활폐기물 분리배출 누리집 품목 페이지
//                               // 그 외 = sources.js의 id (실제로 열람한 자료만)
//   cautions: ['...'],          // (선택) 예외 조건·주의사항 (모든 결과에 공통)
//   related: ['item-id'],       // (선택) 함께 헷갈리는 물품 링크
//
//   // 결과가 하나인 물품 → result
//   result: { type: 'plastic', steps: ['...'], cautions: ['...'] },
//
//   // 상태·재질 표시에 따라 결과가 달라지는 물품만 → question
//   question: {
//     text: '질문 문구',
//     options: [
//       { label: '선택지', hint: '(선택)',
//         result: { type, reason, steps, cautions, needsCheck: '(선택) 확인 필요 사유' } },
//     ],
//   },
// }
//
// - 근거 우선순위: ① 환경부 생활폐기물 분리배출 누리집(2025~, 현행) ② 환경부 지침·설명자료
//   ③ 서울시 표준 기준(2025) ④ 기타 지자체·기사. 자료끼리 다르면 cautions에 차이를 적습니다.
// - type 값은 categories.js의 DISPOSAL_TYPES 키를 사용합니다.
// - 배출 방법(steps)은 2~3단계로 짧게 작성합니다.
// - 공식 자료로 확인되지 않은 내용은 작성하지 말고 needsCheck / 'needs-check'로 표시합니다.
// =====================================================================

const CHECK_LOCAL = '세부 기준은 지자체마다 다를 수 있어요. 생활폐기물 분리배출 누리집(wasteguide.or.kr)의 \'우리동네 배출방법\'에서 확인할 수 있어요.';

export const ITEMS = [
  // ================================================================== 플라스틱
  {
    id: 'instant-rice',
    name: '즉석밥 용기',
    category: 'plastic',
    icon: 'rice',
    keywords: ['햇반', '햇반 용기', '햇반그릇', '즉석밥', '즉석 밥', '밥 용기', '밥용기', '밥그릇', '오뚜기밥', '컵밥 용기', '전자레인지 밥', '즉석밥 그릇'],
    confusing: 1,
    reason: '환경부 분리배출 누리집은 즉석밥 용기를 플라스틱 수거함에 배출하라고 안내해요. 복합재질(OTHER)이라 같은 플라스틱으로 다시 만들기는 어렵지만, 화학적 재활용이나 에너지 재활용으로 활용되기 때문이에요.',
    verification: 'confirmed',
    sources: ['wg:즉석밥 용기', 'korea_ricebowl', 'nongmin_rice'],
    result: {
      type: 'plastic',
      steps: [
        '뚜껑 필름을 떼어주세요.',
        '밥알 등 이물질을 물로 씻어주세요.',
        '플라스틱류로 배출해주세요.',
      ],
      cautions: [
        '\'햇반 용기는 재활용이 안 되니 일반쓰레기\'라는 기사도 있어요(농민신문, 2024). OTHER 재질이라 재활용이 어렵다는 이유인데, 현행 환경부 누리집은 OTHER류도 플라스틱 수거함으로 배출하도록 안내해요.',
        '떼어낸 필름은 깨끗하면 비닐류로, 이물질을 제거하기 어려우면 종량제봉투에 버려주세요.',
        '제조사(CJ제일제당)가 햇반 용기를 따로 회수하는 프로그램을 운영해 왔어요(농민신문 보도). 환경부는 따로 회수된 용기는 다른 PP 재질과 함께 재활용된다고 설명했어요. 운영 여부는 제조사에 확인해주세요.',
        CHECK_LOCAL,
      ],
    },
  },
  {
    id: 'pet-bottle',
    name: '투명 페트병',
    category: 'plastic',
    icon: 'bottle',
    keywords: ['페트병', '생수병', '물병', '음료수병', '음료병', '페트', 'pet', '탄산음료병', '투명페트', '생수', '무색페트병'],
    reason: '먹는샘물·음료를 담은 무색 페트병은 고품질 원료로 재활용할 수 있어, 다른 플라스틱과 구분해 무색페트병 수거함에 따로 배출해요.',
    verification: 'confirmed',
    sources: ['wg:무색페트병', 'seoul_guide'],
    result: {
      type: 'pet',
      steps: [
        '라벨과 내용물을 제거하고 물로 헹궈주세요.',
        '납작하게 압착한 뒤 뚜껑을 닫아주세요.',
        '무색페트병 수거함에 배출해주세요.',
      ],
      cautions: ['색이 있는 페트병이나 페트 재질 용기는 플라스틱류로 배출해요.', CHECK_LOCAL],
    },
  },
  {
    id: 'delivery-container',
    name: '플라스틱 배달 용기',
    category: 'plastic',
    icon: 'tray',
    keywords: ['배달용기', '배달 그릇', '포장용기', '포장 용기', '일회용 용기', '도시락 용기', '반찬통', '반찬 용기', '테이크아웃 용기', '플라스틱 용기', '떡볶이 용기', '배달 플라스틱'],
    reason: '플라스틱 용기는 이물질을 제거하면 재활용되지만, 씻기 어려울 만큼 오염된 용기는 재활용되지 않아요.',
    verification: 'confirmed',
    sources: ['seoul_guide', 'seoul_tips'],
    question: {
      text: '음식물이나 기름이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요',
          result: {
            type: 'plastic',
            reason: '깨끗한 플라스틱 용기는 플라스틱류로 재활용돼요.',
            steps: ['뚜껑, 랩 등 다른 재질을 분리해주세요.', '플라스틱류로 배출해주세요.'],
          },
        },
        {
          label: '오염되어 있지만 씻을 수 있어요',
          result: {
            type: 'plastic',
            reason: '환경부 분리배출 요령은 플라스틱 용기의 내용물을 비우고 물로 헹구는 등 이물질을 제거해 배출하도록 하고 있어요.',
            steps: [
              '남은 음식물을 비우고 물로 씻어주세요.',
              '뚜껑, 랩 등 다른 재질을 분리해주세요.',
              '플라스틱류로 배출해주세요.',
            ],
          },
        },
        {
          label: '오염이 심해서 씻기 어려워요',
          result: {
            type: 'general',
            reason: '세척이 어려운 용기는 재활용이 어려워 종량제봉투에 버려야 해요.',
            steps: ['남은 음식물을 비워주세요.', '종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
  },
  {
    id: 'sauce-bottle',
    name: '마요네즈·케첩 통',
    category: 'plastic',
    icon: 'squeeze',
    keywords: ['마요네즈', '케첩', '케찹', '소스통', '소스 통', '기름통', '식용유 통', '드레싱 통', '머스터드', '마요네즈 용기', '케첩 용기'],
    reason: '마요네즈 통은 플라스틱(PE, PET) 재질이라 내용물을 비우고 헹구면 플라스틱으로 재활용돼요. 기름기가 남아 씻을 수 없다면 종량제봉투 대상이에요.',
    verification: 'confirmed',
    sources: ['wg:마요네즈 용기', 'seoul_tips'],
    question: {
      text: '안쪽을 깨끗이 씻을 수 있나요?',
      options: [
        {
          label: '네, 씻을 수 있어요',
          result: {
            type: 'plastic',
            steps: ['남은 내용물을 비우고 물로 헹궈주세요.', '뚜껑 등 다른 재질을 분리해 플라스틱류로 배출해주세요.'],
          },
        },
        {
          label: '기름기가 남아 씻기 어려워요',
          result: {
            type: 'general',
            steps: ['종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
  },
  {
    id: 'cosmetic-container',
    name: '화장품 용기',
    category: 'plastic',
    icon: 'jar',
    keywords: ['화장품', '로션', '스킨', '토너', '크림통', '크림 통', '파운데이션', '에센스', '화장품 병', '틴트', '마스카라', '립스틱'],
    reason: '화장품 용기는 재질이 다양해서 용기에 적힌 분리배출 표시에 따라 배출해야 해요. 크기가 작거나 분리배출이 안 되는 용기는 일반쓰레기예요.',
    verification: 'confirmed',
    sources: ['seoul_cosmetic'],
    result: {
      type: 'material',
      steps: [
        '남은 내용물은 휴지에 흡수시켜 일반쓰레기로 버려주세요.',
        '뚜껑 등 다른 재질을 분리해주세요.',
        '용기에 적힌 분리배출 표시에 맞는 재질로 배출해주세요.',
      ],
      cautions: [
        '틴트, 마스카라, 아이라이너, 펜슬 같은 색조 화장품은 소재가 다양해 일반쓰레기로 버려주세요.',
        '크기가 작은 샘플은 분리수거 대상이 아니에요.',
        '액체 화장품을 물에 씻어 흘려보내지 마세요.',
      ],
    },
    related: ['pump-container', 'toothpaste-tube', 'gas-can'],
  },
  {
    id: 'pump-container',
    name: '샴푸·펌프형 용기',
    category: 'plastic',
    icon: 'pump',
    keywords: ['샴푸', '샴푸 용기', '샴푸통', '린스', '컨디셔너', '바디워시', '핸드워시', '펌프', '펌프 용기', '펌핑 용기', '세정제 용기', '로션 펌프'],
    reason: '샴푸 같은 플라스틱 용기는 재활용되지만, 펌프는 플라스틱과 고철이 섞인 복합재질이라 재활용이 어려워 떼어내야 해요.',
    verification: 'confirmed',
    sources: ['wg:샴푸', 'seoul_guide', 'seoul_fake'],
    result: {
      type: 'plastic',
      steps: [
        '펌프와 라벨을 떼어주세요. 펌프는 종량제봉투에 버려주세요.',
        '용기의 내용물을 비우고 물로 헹궈주세요.',
        '용기는 플라스틱류로 배출해주세요.',
      ],
      cautions: ['펌프를 종량제봉투에 버리라는 안내는 서울시 자료를 따랐어요. 환경부 누리집은 \'펌프를 제거한 후 배출\'하도록만 안내해요.'],
    },
    related: ['cosmetic-container'],
  },
  {
    id: 'toothpaste-tube',
    name: '치약 튜브',
    category: 'plastic',
    icon: 'tube',
    keywords: ['치약', '치약통', '치약 용기', '튜브', '튜브형', '튜브 용기', '연고 튜브', '핸드크림 튜브', '클렌징폼'],
    confusing: 8,
    reason: '환경부 누리집은 치약 용기를 분리배출 표시에 따라 다르게 안내해요. \'플라스틱\' 표시는 플라스틱류, \'도포·첩합\' 표시는 재활용이 어려워 종량제봉투예요.',
    verification: 'confirmed',
    sources: ['wg:치약 용기(플라스틱)', 'wg:치약 용기(도포·첩합)', 'seoul_guide'],
    question: {
      text: '튜브에 어떤 분리배출 표시가 있나요?',
      options: [
        {
          label: '\'플라스틱\' 표시가 있어요',
          result: {
            type: 'plastic',
            steps: ['내용물을 최대한 짜내 비우고, 물로 최대한 헹궈주세요.', '뚜껑을 분리해 플라스틱류로 배출해주세요.'],
          },
        },
        {
          label: '\'도포·첩합\' 표시가 있어요',
          result: {
            type: 'general',
            reason: '\'도포·첩합\' 표시는 재활용이 어려워 잔재물로 처리되는 제품이라는 뜻이에요.',
            steps: ['종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
    cautions: ['튜브형 화장품은 반으로 잘라 내용물을 닦아낸 뒤, 용기에 적힌 안내에 따라 배출해주세요.'],
  },
  {
    id: 'styrofoam',
    name: '스티로폼 박스·완충재',
    category: 'plastic',
    icon: 'foam',
    keywords: ['스티로폼', '스치로폼', '스티로폴', '스티로폼 박스', '아이스박스', '완충재', '발포', '발포합성수지', '택배 스티로폼', '포장 스티로폼', '스티로폼 상자', '스티로폼 접시'],
    reason: '깨끗한 스티로폼 포장재는 색깔과 상관없이 스티로폼으로 재활용돼요. 음식물이 묻어 제거하기 어려운 스티로폼은 재활용되지 않아요.',
    verification: 'confirmed',
    sources: ['wg:스티로폼', 'seoul_guide', 'korea_policy'],
    question: {
      text: '음식물이나 이물질이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요 (씻으면 깨끗해져요)',
          result: {
            type: 'styrofoam',
            steps: [
              '내용물을 비우고, 묻은 것이 있다면 물로 헹궈주세요.',
              '테이프, 운송장, 라벨 등 다른 재질을 모두 떼어주세요.',
              '스티로폼 수거함에 배출해주세요.',
            ],
          },
        },
        {
          label: '음식물이 묻어 제거하기 어려워요',
          result: {
            type: 'general',
            steps: ['스티로폼을 쪼개 종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
    cautions: [
      'TV 등 전자제품 완충재로 쓰인 스티로폼은 가급적 구입처에 반납해주세요.',
      '다른 재질과 코팅되거나 붙어 있는 스티로폼은 종량제봉투에 버려주세요.',
      '건축용 내·외장재 스티로폼은 대형폐기물로 처리해요.',
    ],
    related: ['fruit-net', 'cup-noodle'],
  },
  {
    id: 'fruit-net',
    name: '과일 포장망',
    category: 'plastic',
    icon: 'net',
    keywords: ['과일망', '과일 망', '과일 그물망', '과일그물망', '과일 포장재', '그물망', '스티로폼 망', '스티로폼 그물', '사과 망', '배 망', '복숭아 망', '완충망', '팬캡', '과일 완충재'],
    confusing: 2,
    reason: '스티로폼처럼 보이지만 EPE라는 다른 재질이에요. 재활용 업체가 적고 일반 스티로폼(EPS)과 나눠 모으기 어려워, 가정에서 소량 나오면 일반쓰레기로 버려요.',
    verification: 'confirmed',
    sources: ['wg:과일 그물망', 'seoul_guide', 'korea_holiday'],
    result: {
      type: 'general',
      steps: ['스티로폼 수거함에 넣지 말고, 종량제봉투에 넣어 버려주세요.'],
      cautions: ['양파망처럼 비닐 재질의 망은 비닐류로 배출해요.'],
    },
    related: ['onion-net', 'styrofoam'],
  },
  {
    id: 'cup-noodle',
    name: '컵라면 용기',
    category: 'plastic',
    icon: 'noodle',
    keywords: ['컵라면', '컵라면 그릇', '라면 용기', '사발면', '컵누들', '스티로폼 컵라면', '종이 컵라면'],
    confusing: 4,
    reason: '컵라면 용기는 재질과 오염 정도에 따라 달라요. 종이 용기는 씻으면 종이류, 스티로폼 용기는 국물이 배거나 색·인쇄가 있으면 일반쓰레기예요.',
    verification: 'confirmed',
    sources: ['wg:종이 컵라면', 'wg:스티로폼 컵라면', 'gangnam_cup'],
    question: {
      text: '용기 재질과 상태가 어떤가요?',
      options: [
        {
          label: '종이 용기이고, 씻으면 깨끗해져요',
          result: {
            type: 'paper',
            steps: ['남은 국물과 건더기를 비우고 물로 헹궈주세요.', '뚜껑을 분리해 종이류로 배출해주세요.'],
          },
        },
        {
          label: '스티로폼 용기예요',
          result: {
            type: 'general',
            reason: '스티로폼 컵라면 용기는 국물·기름으로 오염·착색되거나 색·인쇄가 있으면 재활용이 어려워요.',
            steps: ['남은 국물과 건더기를 비워주세요.', '종량제봉투에 넣어 버려주세요.'],
            cautions: ['사용하지 않았거나 오염되지 않은 깨끗한 흰색 스티로폼 용기만 스티로폼 수거함에 배출할 수 있어요.'],
          },
        },
        {
          label: '빨간 기름 자국이 지워지지 않아요',
          result: {
            type: 'general',
            reason: '물로 헹궈도 기름기가 배어 지워지지 않는 용기는 종량제봉투에 버려야 해요.',
            steps: ['남은 국물과 건더기를 비워주세요.', '종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
  },
  {
    id: 'straw',
    name: '일회용 빨대',
    category: 'plastic',
    icon: 'straw',
    keywords: ['빨대', '플라스틱 빨대', '스트로우', '스트로', '음료 빨대', '스텐 빨대', '스테인리스 빨대'],
    reason: '환경부 누리집은 빨대처럼 작은 플라스틱도 이물질이 묻지 않았다면 플라스틱으로 배출하라고 안내해요. 일회용 빨대는 보통 PP 단일재질이에요.',
    verification: 'confirmed',
    sources: ['wg:빨대', 'seoul_fake'],
    result: {
      type: 'plastic',
      steps: ['음료가 남지 않게 헹궈주세요.', '플라스틱 빨대는 플라스틱류로 배출해주세요.'],
      cautions: [
        '스테인리스 빨대는 고철로 배출해요.',
        '자료마다 달라요. 서울시 기사(2021)는 빨대 같은 작은 플라스틱은 선별이 어렵다며 종량제봉투를 안내했어요. 거주 지역 기준을 확인해주세요.',
      ],
    },
    related: ['plastic-cutlery'],
  },
  {
    id: 'plastic-cutlery',
    name: '일회용 숟가락·젓가락',
    category: 'plastic',
    icon: 'spoon',
    keywords: ['플라스틱 숟가락', '숟가락', '일회용 숟가락', '플라스틱 젓가락', '일회용 수저', '스푼', '아이스크림 숟가락', '요플레 숟가락', '수저'],
    reason: '플라스틱(PP 등) 단일 재질 숟가락·젓가락은 플라스틱으로 배출해요. 나무·실리콘이거나 여러 재질이 섞였다면 종량제봉투예요.',
    verification: 'confirmed',
    sources: ['wg:숟가락(단일 재질)', 'wg:숟가락(복합 재질)', 'seoul_fake'],
    result: {
      type: 'plastic',
      steps: ['재질을 확인하고 이물질을 헹궈주세요.', '플라스틱 단일 재질이면 플라스틱류로 배출해주세요.'],
      cautions: [
        '나무·실리콘·멜라민 재질이나 여러 재질이 섞인 제품은 종량제봉투에 버려주세요.',
        '스테인리스 재질은 고철로 배출해요.',
        '서울시 기사(2021)는 작은 플라스틱이 선별 기계에 끼어 종량제봉투를 안내하기도 했어요. 지역 기준을 확인해주세요.',
      ],
    },
    related: ['straw', 'chopsticks'],
  },

  // ================================================================== 비닐
  {
    id: 'bubble-wrap',
    name: '뽁뽁이 (에어캡)',
    category: 'vinyl',
    icon: 'bubble',
    keywords: ['뽁뽁이', '뾱뾱이', '에어캡', '에어 캡', '버블랩', '완충 비닐', '택배 뽁뽁이', '포장 뽁뽁이', '에어 쿠션', '유색 에어캡'],
    confusing: 3,
    reason: '뽁뽁이는 비닐 재질이라 비닐류로 재활용돼요. 비닐은 재질·색상과 상관없이 모아서 플라스틱 배수로, 건축 자재 등으로 다시 만들어져요.',
    verification: 'confirmed',
    sources: ['wg:에어캡', 'seoul_vinyl', 'seoul_guide'],
    result: {
      type: 'vinyl',
      steps: [
        '붙어 있는 테이프, 송장 같은 이물질을 떼어주세요.',
        '흩날리지 않게 봉투에 모아 비닐류로 배출해주세요.',
      ],
      cautions: ['비닐류는 플라스틱류와 섞어서 버리지 마세요.'],
    },
    related: ['vinyl-packaging', 'parcel-box'],
  },
  {
    id: 'vinyl-packaging',
    name: '비닐 포장재·과자 봉지',
    category: 'vinyl',
    icon: 'bag',
    keywords: ['비닐', '비닐봉지', '비닐봉투', '포장 비닐', '포장비닐', '과자봉지', '과자 봉지', '라면봉지', '라면 봉지', '택배 비닐', '택배봉투', '커피 비닐', '세탁소 비닐', '봉지', '필름', '사탕봉지'],
    reason: '과자 봉지 같은 대부분의 비닐 포장재는 재활용 의무 대상이라 비닐류로 재활용돼요. 분리배출 표시가 없는 필름·작은 포장재도 비닐류예요.',
    verification: 'confirmed',
    sources: ['wg:과자봉지', 'seoul_guide', 'seoul_vinyl'],
    result: {
      type: 'vinyl',
      steps: [
        '내용물을 비우고, 음식물이 묻었다면 물로 헹궈주세요.',
        '흩날리지 않게 투명·반투명 봉투에 모아 비닐류로 배출해주세요.',
      ],
      cautions: [
        '이물질을 제거하기 어려운 비닐은 종량제봉투에 버려주세요. (환경부)',
        '서울시 표준 기준(2025)은 작거나 물·기름이 묻은 비닐도 비닐류로 분리배출할 수 있다고 안내해요. 지역마다 다를 수 있어요.',
        '택배봉투는 송장이 떼어지지 않아도 비닐류로 배출할 수 있어요. (서울시)',
      ],
    },
    related: ['bubble-wrap', 'plastic-wrap'],
  },
  {
    id: 'plastic-wrap',
    name: '비닐랩',
    category: 'vinyl',
    icon: 'wrap',
    keywords: ['랩', '랩필름', '랩 필름', '위생랩', '주방 랩', '크린랩', '음식 랩', '포장 랩'],
    reason: '가정용 랩은 PE 재질이라 깨끗하면 비닐류로 재활용돼요. 음식물로 오염된 랩은 일반쓰레기예요.',
    verification: 'confirmed',
    sources: ['wg:랩', 'seoul_guide', 'korea_holiday'],
    question: {
      text: '랩이 깨끗한가요?',
      options: [
        {
          label: '깨끗해요 (헹구면 깨끗해져요)',
          result: {
            type: 'vinyl',
            steps: ['물로 헹궈 이물질을 없애주세요.', '비닐류로 배출해주세요.'],
          },
        },
        {
          label: '음식물이 묻어 있어요',
          result: {
            type: 'general',
            steps: ['종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
    cautions: [
      '배달 음식 포장 랩, 마트에서 쓰는 포장용 랩은 PVC 재질이라 재활용이 안 돼요.',
      '서울시 표준 기준(2025)은 랩을 종량제봉투로 안내해요. 거주 지역 기준을 확인해주세요.',
    ],
  },
  {
    id: 'onion-net',
    name: '양파망',
    category: 'vinyl',
    icon: 'net',
    keywords: ['양파망', '양파 망', '채소망', '채소 망', '배추망', '마늘망', '귤망'],
    reason: '양파·배추 등을 담는 합성수지 그물망은 재활용 의무 대상이고 비닐과 성질이 비슷해 비닐 수거함으로 배출해요.',
    verification: 'confirmed',
    sources: ['wg:양파망', 'seoul_guide', 'korea_holiday'],
    result: {
      type: 'vinyl',
      steps: ['안에 남은 흙이나 이물질을 털어주세요.', '비닐류로 배출해주세요.'],
    },
    related: ['fruit-net'],
  },

  // ================================================================== 종이
  {
    id: 'paper-cup',
    name: '종이컵',
    category: 'paper',
    icon: 'cup',
    keywords: ['종이 컵', '일회용 종이컵', '커피컵', '커피 컵', '테이크아웃 컵', '자판기 컵', '코팅 종이컵', '코팅된 종이컵', '양면 코팅 종이컵', '정수기 컵'],
    confusing: 5,
    reason: '종이컵은 다른 종이와 섞지 않고 따로 모아 배출해요. 단, 차가운 음료용으로 양면이 코팅된 종이컵은 물에 풀리지 않아 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['seoul_guide', 'wg:양면 코팅종이컵', 'wg:음수대용 종이컵'],
    result: {
      type: 'paperpack',
      steps: [
        '뚜껑을 분리하고, 내용물을 비운 뒤 물로 헹궈주세요.',
        '납작하게 압착해주세요.',
        '봉투에 넣거나 묶어서 다른 종이와 구분해 배출해주세요.',
      ],
      cautions: [
        '양면이 코팅된 종이컵은 종량제봉투에 버려주세요.',
        '정수기용 종이컵은 압착해서 묶어 종이류로 배출해요.',
        '자원순환보증금 대상 일회용컵은 매장·무인회수기에 반납하면 보증금을 돌려받을 수 있어요.',
      ],
    },
  },
  {
    id: 'receipt',
    name: '영수증',
    category: 'paper',
    icon: 'receipt',
    keywords: ['감열지', '카드 영수증', '카드전표', '전표', '택배 송장', '택배전표', '운송장', '송장', '대기번호표', '번호표', '로또 용지'],
    confusing: 6,
    reason: '영수증은 화학물질을 바른 감열지라서 재활용하면 얼룩이 생겨요. 종이처럼 보여도 종량제봉투에 버려야 해요.',
    verification: 'confirmed',
    sources: ['wg:영수증', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['개인정보가 있다면 가리거나 찢어주세요.', '종량제봉투에 넣어 버려주세요.'],
      cautions: ['택배 전표(송장)도 종량제봉투 대상이에요. (서울시)'],
    },
  },
  {
    id: 'parcel-box',
    name: '택배 상자',
    category: 'paper',
    icon: 'box',
    keywords: ['택배박스', '박스', '상자', '종이상자', '종이 박스', '골판지', '라면 박스', '택배 포장재', '택배 포장'],
    reason: '골판지 상자는 테이프·송장 같은 다른 재질만 제거하면 종이류로 재활용돼요. 일반 종이와는 구분해서 배출해요.',
    verification: 'confirmed',
    sources: ['wg:택배 상자', 'seoul_guide'],
    result: {
      type: 'paper',
      steps: [
        '테이프, 송장, 철핀을 모두 제거해주세요.',
        '상자를 접어 납작하게 만들어주세요.',
        '일반 종이와 섞이지 않게 종이류로 배출해주세요.',
      ],
      cautions: ['떼어낸 송장은 종량제봉투에 버려주세요.'],
    },
    related: ['paper-cooler-box', 'bubble-wrap', 'styrofoam'],
  },
  {
    id: 'milk-carton',
    name: '우유팩 (종이팩)',
    category: 'paper',
    icon: 'carton',
    keywords: ['우유팩', '우유곽', '종이팩', '두유팩', '주스팩', '쥬스팩', '멸균팩', '살균팩', '소주팩'],
    reason: '종이팩은 고품질 펄프로 만들어져 미용 티슈, 화장지 같은 제품으로 재활용돼요. 그래서 일반 종이와 따로 모아야 해요.',
    verification: 'confirmed',
    sources: ['wg:우유팩', 'seoul_guide'],
    result: {
      type: 'paperpack',
      steps: [
        '내용물을 비우고 물로 헹군 뒤 말려주세요.',
        '빨대, 비닐 등 다른 재질을 떼어주세요.',
        '종이팩 수거함에 배출해주세요. 일반팩·멸균팩은 구분하지 않아도 돼요.',
      ],
      cautions: ['종이팩 수거함이 없다면 종이팩만 묶어서 일반 종이와 구분해 종이류로 배출해주세요.'],
    },
  },
  {
    id: 'pizza-box',
    name: '피자·치킨 박스',
    category: 'paper',
    icon: 'pizza',
    keywords: ['피자박스', '피자 박스', '피자 상자', '치킨 박스', '치킨박스', '배달 상자', '음식 상자', '케이크 박스', '기름 묻은 종이'],
    reason: '음식 포장 박스는 내용물을 비우고 이물질이 묻지 않았다면 종이류로 재활용돼요. 이물질이 묻었다면 종량제봉투예요.',
    verification: 'confirmed',
    sources: ['wg:피자 박스', 'seoul_tips'],
    question: {
      text: '기름이나 음식물이 묻어 있나요?',
      options: [
        {
          label: '깨끗해요',
          result: {
            type: 'paper',
            steps: ['고정핀, 테이프 등 다른 재질을 떼어주세요.', '접어서 종이류로 배출해주세요.'],
          },
        },
        {
          label: '기름·음식물이 묻었어요',
          result: {
            type: 'general',
            steps: ['종량제봉투에 넣어 버려주세요.'],
          },
        },
      ],
    },
  },
  {
    id: 'coated-paper',
    name: '코팅된 종이',
    category: 'paper',
    icon: 'sheet',
    keywords: ['코팅지', '코팅 종이', '코팅된 종이', '코팅 전단지', '비닐코팅 광고지', '사진', '사진용지', '금박지', '은박지', '종이호일', '색지', '방수 포스터', '명함'],
    reason: '비닐 코팅이나 금속 박이 붙은 종이는 종이와 분리되지 않아 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['seoul_guide', 'seoul_tips', 'korea_paper'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: ['서울시 기준에 따르면 사진용지, 종이호일, 색지, 방수 가공 포스터도 종량제봉투 대상이에요.'],
    },
    related: ['vinyl-coated-box', 'paper-cup'],
  },
  {
    id: 'vinyl-coated-box',
    name: '비닐 코팅 포장재',
    category: 'paper',
    icon: 'package',
    keywords: ['비닐 코팅 포장재', '비닐코팅 포장재', '코팅 포장재', '코팅된 상자', '코팅 박스', '화장품 상자', '치약 상자', '생필품 포장박스', '쌀 포대', '쌀포대', '종이 비닐 포장'],
    reason: '정부 안내(2023)는 비닐로 코팅된 포장박스는 재활용이 어려우니 종량제봉투에 배출하라고 해요.',
    verification: 'confirmed',
    sources: ['korea_paper', 'seoul_vinyl'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: [
        '자료마다 기준이 달라요. 서울시 기사(2021)는 쌀 포장재처럼 비닐과 종이가 합쳐진 포장재를 단면 코팅이면 종이류, 양면 코팅이면 비닐류로 안내했어요.',
        CHECK_LOCAL,
      ],
    },
    related: ['coated-paper'],
  },
  {
    id: 'paper-cooler-box',
    name: '종이 보랭박스',
    category: 'paper',
    icon: 'cooler',
    keywords: ['보랭박스', '보냉박스', '보냉 상자', '보랭 상자', '보냉 택배', '은박 택배 상자', '알루미늄 택배 상자', '종이 보냉박스'],
    reason: '골판지 상자 안쪽에 알루미늄 필름을 붙인 상자예요. 필름을 떼어내면 종이류로 재활용할 수 있어요.',
    verification: 'confirmed',
    sources: ['wg:종이 보랭박스', 'seoul_guide'],
    result: {
      type: 'paper',
      steps: ['안쪽 알루미늄 필름을 떼어주세요.', '접어서 종이류로 배출해주세요.'],
      cautions: ['필름이 종이와 분리되지 않는 상자는 종량제봉투에 버려주세요. (서울시)'],
    },
    related: ['cooler-bag', 'parcel-box'],
  },
  {
    id: 'newspaper-book',
    name: '신문·책·노트',
    category: 'paper',
    icon: 'book',
    keywords: ['신문', '신문지', '책', '공책', '노트', '전단지', '잡지', '종이', 'a4', '달력'],
    reason: '종이는 비닐 코팅·스프링 같은 다른 재질을 제거하면 종이류로 재활용돼요.',
    verification: 'confirmed',
    sources: ['wg:신문지', 'seoul_guide'],
    result: {
      type: 'paper',
      steps: [
        '비닐, 코팅 표지, 스프링 등 종이가 아닌 부분을 제거해주세요.',
        '반듯하게 펴서 쌓은 뒤 묶어주세요.',
        '물에 젖지 않게 종이류로 배출해주세요.',
      ],
    },
  },

  // ================================================================== 유리·금속
  {
    id: 'glass-bottle',
    name: '유리병',
    category: 'glass-metal',
    icon: 'glass-bottle',
    keywords: ['병', '소주병', '맥주병', '음료병', '잼병', '유리 병', '와인병', '드링크병', '소스병'],
    reason: '깨끗한 유리병은 유리병류로 재활용돼요. 소주·맥주병 같은 빈용기보증금 대상 병은 그대로 씻어서 다시 쓰여요.',
    verification: 'confirmed',
    sources: ['wg:유리병', 'seoul_guide'],
    result: {
      type: 'glass',
      steps: [
        '뚜껑을 분리하고 내용물을 비운 뒤 헹궈주세요.',
        '깨지지 않게 유리병 수거함에 배출해주세요.',
      ],
      cautions: [
        '빈용기보증금 대상 병은 빈용기 반환 수집소나 무인회수기에 반환하면 보증금을 돌려받을 수 있어요.',
        '병 안에 담배꽁초 등 이물질을 넣지 마세요.',
      ],
    },
    related: ['broken-glass', 'ceramic'],
  },
  {
    id: 'broken-glass',
    name: '깨진 유리',
    category: 'glass-metal',
    icon: 'shard',
    keywords: ['유리 조각', '유리조각', '깨진 컵', '깨진 유리컵', '유리컵', '깨진 병', '거울', '판유리'],
    reason: '깨진 유리는 재활용이 어렵고 불에 타지 않는 불연성 폐기물이에요. 불연성 마대에 담아 매립해요.',
    verification: 'confirmed',
    sources: ['wg:깨진 유리', 'seoul_guide'],
    result: {
      type: 'special_bag',
      steps: [
        '다치지 않게 신문지, 테이프 등으로 충분히 감싸주세요.',
        '불연성 종량제 특수마대에 담아 배출해주세요. 소량이면 감싸서 종량제봉투에 버려도 괜찮아요.',
      ],
      cautions: ['거울, 판유리도 유리병류가 아니에요.'],
    },
    related: ['ceramic'],
  },
  {
    id: 'ceramic',
    name: '도자기·내열유리',
    category: 'glass-metal',
    icon: 'bowl',
    keywords: ['도자기', '사기그릇', '그릇', '접시', '뚝배기', '머그컵', '내열유리', '내열 유리', '내열식기', '크리스탈', '유리 식기', '깨진 도자기', '돌솥'],
    reason: '도자기와 내열유리는 재활용이 어렵고 불에 타지 않는 불연성 폐기물이에요. 유리병과 섞으면 안 돼요.',
    verification: 'confirmed',
    sources: ['wg:도자기', 'wg:내열유리', 'seoul_guide'],
    result: {
      type: 'special_bag',
      steps: [
        '깨진 조각은 신문지 등으로 감싸주세요.',
        '불연성 종량제 특수마대에 담아 배출해주세요.',
      ],
      cautions: ['크기가 큰 제품은 대형폐기물로 배출해요.'],
    },
  },
  {
    id: 'can',
    name: '음료 캔·통조림 캔',
    category: 'glass-metal',
    icon: 'can',
    keywords: ['캔', '맥주캔', '콜라캔', '음료캔', '참치캔', '통조림', '알루미늄캔', '철캔', '깡통'],
    reason: '음료·식료품 캔은 내용물과 다른 재질을 제거하면 금속캔으로 재활용돼요.',
    verification: 'confirmed',
    sources: ['wg:음료캔', 'seoul_guide'],
    result: {
      type: 'can',
      steps: [
        '내용물을 비우고 물로 헹궈주세요.',
        '플라스틱 뚜껑 등 다른 재질을 제거해주세요.',
        '금속캔 수거함에 배출해주세요.',
      ],
      cautions: ['페인트통처럼 내용물이 남은 캔은 특수규격마대 등 지역 기준에 따라 배출해요.'],
    },
  },
  {
    id: 'gas-can',
    name: '부탄가스·스프레이 캔',
    category: 'glass-metal',
    icon: 'spray',
    keywords: ['부탄가스', '가스통', '휴대용 가스', '스프레이', '에어로졸', '살충제', '헤어스프레이', '방향제', '픽서'],
    reason: '가스를 완전히 비운 용기는 금속캔으로 재활용돼요. 가스가 남아 있으면 폭발 위험이 있어요.',
    verification: 'confirmed',
    sources: ['wg:부탄가스', 'seoul_guide', 'seoul_cosmetic'],
    result: {
      type: 'can',
      steps: [
        '화기가 없고 환기가 잘 되는 곳에서 노즐을 눌러 가스를 완전히 빼주세요.',
        '금속캔 수거함에 배출해주세요.',
      ],
      cautions: [
        '내용물이 남아 있는 락카 등은 캔류가 아니라 특수규격마대 대상이에요. (서울시)',
        '구멍을 뚫어야 하는지는 자료·지역마다 안내가 달라요.',
      ],
    },
  },
  {
    id: 'aluminum-foil',
    name: '알루미늄 호일',
    category: 'glass-metal',
    icon: 'foil',
    keywords: ['호일', '쿠킹호일', '쿠킹 호일', '은박', '알루미늄 포일', '포일'],
    reason: '선별장에서 알루미늄 캔은 골라내지만 얇은 호일은 선별이 어려워요. 그래서 금속캔이 아니라 종량제봉투에 버려요.',
    verification: 'confirmed',
    sources: ['wg:알루미늄 호일', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: ['금속캔·고철로 배출할 수 없어요.'],
    },
  },

  // ================================================================== 생활용품
  {
    id: 'toothbrush',
    name: '칫솔',
    category: 'household',
    icon: 'brush',
    keywords: ['칫솔', '치솔', '칫솔모', '플라스틱 칫솔', '대나무 칫솔', '치간칫솔'],
    confusing: 7,
    reason: '칫솔은 플라스틱, 솔, 고무 등이 섞인 복합재질이라 재질별로 나누기 어려워 재활용되지 않아요.',
    verification: 'confirmed',
    sources: ['wg:칫솔', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: ['배터리가 내장된 제품은 통째로 초소형 전자제품 배출함에 배출해요. (서울시)'],
    },
  },
  {
    id: 'ice-pack',
    name: '아이스팩',
    category: 'household',
    icon: 'icepack',
    keywords: ['아이스 팩', '냉매팩', '젤 아이스팩', '물 아이스팩', '얼음팩', '아이스팩 젤'],
    reason: '젤 아이스팩 내용물(고흡수성수지)은 재활용이 안 되고 하수구에 버리면 안 돼요. 뜯지 말고 그대로 전용 수거함이나 종량제봉투에 버려요.',
    verification: 'confirmed',
    sources: ['wg:젤 아이스팩', 'wg:물 아이스팩', 'seoul_icepack'],
    result: {
      type: 'general',
      steps: [
        '아이스팩 전용 수거함이 있다면 그대로 넣어주세요.',
        '수거함이 없다면 뜯지 말고 종량제봉투에 넣어 버려주세요.',
      ],
      cautions: [
        '물로 된 아이스팩은 물을 하수구에 버리고, 포장재는 비닐류로 배출해요.',
        '깨끗한 아이스팩은 재사용하는 것도 좋아요.',
      ],
    },
    related: ['cooler-bag'],
  },
  {
    id: 'cooler-bag',
    name: '보냉팩·보랭가방',
    category: 'household',
    icon: 'icepack',
    keywords: ['보냉팩', '보냉백', '보랭가방', '보냉가방', '보냉 봉투', '은박 보냉', '은박 봉투', '보온보냉팩', '보온보랭팩', '보냉 파우치'],
    reason: '은박(알루미늄), 발포지, 에어캡 등이 섞인 복합재질이라 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['wg:보온보냉팩', 'wg:보랭가방', 'korea_brief'],
    result: {
      type: 'general',
      steps: ['안에 든 아이스팩과 내용물을 빼주세요.', '종량제봉투에 넣어 버려주세요.'],
      cautions: [
        '크기가 커서 종량제봉투에 안 들어가는 보랭가방은 대형폐기물로 배출해요.',
        '일부 지자체는 조례로 보온보냉백을 비닐로 배출하도록 정하기도 해요.',
      ],
    },
    related: ['ice-pack', 'paper-cooler-box'],
  },
  {
    id: 'wet-wipes',
    name: '물티슈',
    category: 'household',
    icon: 'wipes',
    keywords: ['물 티슈', '물휴지', '부직포', '화장지', '휴지', '키친타월'],
    reason: '물티슈는 폴리에스터, 부직포 등으로 만들어져 종이처럼 보여도 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['wg:물티슈', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: ['물티슈 포장재는 비닐류로, 플라스틱 뚜껑(캡)은 플라스틱류로 배출해요.'],
    },
  },
  {
    id: 'rubber-gloves',
    name: '고무장갑',
    category: 'household',
    icon: 'glove',
    keywords: ['고무 장갑', '주방장갑', '일회용 장갑', '고무호스', '호스', '식탁보', '비닐 식탁보'],
    reason: '가정용 고무 제품은 주로 두 가지 이상 재질이 섞인 합성 고무라 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['wg:고무장갑', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
      cautions: ['고무호스, 비닐 식탁보도 종량제봉투 대상이에요. (서울시)'],
    },
  },
  {
    id: 'chopsticks',
    name: '나무젓가락',
    category: 'household',
    icon: 'chopsticks',
    keywords: ['나무 젓가락', '일회용 젓가락', '이쑤시개', '아이스크림 막대', '나무 숟가락'],
    reason: '나무(목재) 젓가락은 재활용이 어려워 종량제봉투에 버려요.',
    verification: 'confirmed',
    sources: ['wg:젓가락(복합 재질)', 'gangnam_cup'],
    result: {
      type: 'general',
      steps: ['종량제봉투에 넣어 버려주세요.'],
    },
    related: ['plastic-cutlery'],
  },
  {
    id: 'umbrella',
    name: '우산',
    category: 'household',
    icon: 'umbrella',
    keywords: ['장우산', '접이식 우산', '양산', '고장난 우산'],
    reason: '우산은 고철, 천, 플라스틱 등이 섞인 복합재질이에요. 재질별로 분리할 수 있으면 나눠서 배출하고, 어려우면 종량제봉투에 버려요.',
    verification: 'confirmed',
    sources: ['wg:우산', 'seoul_guide'],
    result: {
      type: 'material',
      steps: [
        '분리할 수 있다면 살대 등 금속은 고철로, 비닐 천은 비닐류로 나눠주세요.',
        '분리가 어렵다면 종량제봉투에, 봉투에 안 들어가면 대형폐기물로 배출해주세요.',
      ],
      cautions: ['서울시 표준 기준(2025)은 우산을 대형폐기물로 안내해요. 거주 지역 기준을 확인해주세요.'],
    },
  },

  // ================================================================== 기타
  {
    id: 'pill-blister',
    name: '알약 포장재',
    category: 'etc',
    icon: 'blister',
    keywords: ['알약 포장', '알약포장재', '약 포장', '약 껍데기', 'ptp', '블리스터', '판포장', '약 포장지', '알루미늄 약 포장'],
    reason: '알약 포장재는 윗면 플라스틱과 아랫면 알루미늄이 붙은 복합재질이라 재활용이 어려워요.',
    verification: 'confirmed',
    sources: ['wg:알약 포장재', 'korea_policy', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['약을 다 꺼낸 빈 포장재만 종량제봉투에 넣어 버려주세요.'],
      cautions: ['먹지 않은 약이 남아 있다면 포장재를 뜯지 말고 그대로 폐의약품 수거함에 배출해주세요.'],
    },
    related: ['medicine'],
  },
  {
    id: 'medicine',
    name: '폐의약품',
    category: 'etc',
    icon: 'pill',
    keywords: ['약', '먹다 남은 약', '알약', '물약', '연고', '감기약', '시럽', '의약품', '유통기한 지난 약', '가루약', '안약'],
    reason: '폐의약품은 생활계 유해폐기물이에요. 땅이나 하천에 흘러들면 오염과 내성균 확산을 일으킬 수 있어 전용 수거함에 버려야 해요.',
    verification: 'confirmed',
    sources: ['seoul_medicine'],
    result: {
      type: 'medicine',
      steps: [
        '조제약·가루약은 약봉지를 뜯지 말고, 판포장 알약은 겉 종이상자만 버려주세요.',
        '물약·연고는 마개를 꼭 잠가 용기째 준비해주세요.',
        '주민센터·보건소 등의 폐의약품 수거함에 넣어주세요.',
      ],
      cautions: [
        '알약·가루약·캡슐은 종이봉투에 담아 \'폐의약품\'이라고 적고 밀봉하면 우체통에도 넣을 수 있어요. 물약·안약·연고는 우체통에 넣을 수 없어요.',
        '홍삼, 자양강장제 같은 건강보조식품은 수거함이 아니라 종량제봉투에 버려주세요.',
      ],
    },
    related: ['pill-blister'],
  },
  {
    id: 'coffee-capsule',
    name: '커피 캡슐',
    category: 'etc',
    icon: 'capsule',
    keywords: ['커피캡슐', '캡슐커피', '캡슐 커피', '네스프레소', '카누 캡슐', '돌체구스토', '캡슐', '알루미늄 캡슐'],
    reason: '알루미늄 커피 캡슐은 금속이라 뚜껑과 커피 찌꺼기를 제거하면 고철로 재활용돼요.',
    verification: 'confirmed',
    sources: ['wg:커피캡슐', 'korea_capsule'],
    result: {
      type: 'scrap',
      steps: [
        '캡슐 뚜껑을 떼고 커피 찌꺼기를 빼주세요.',
        '알루미늄 캡슐 용기만 고철 수거함에 배출해주세요.',
      ],
      cautions: [
        '네스프레소 등 일부 제품은 우편회수봉투에 담아 우체국 창구나 에코우체통으로 회수해요. 이 경우 제조사 안내를 따라주세요.',
        '플라스틱 재질 캡슐의 배출 기준은 공식 자료에서 확인하지 못했어요. 용기의 분리배출 표시를 확인해주세요.',
      ],
    },
  },
  {
    id: 'battery',
    name: '건전지',
    category: 'etc',
    icon: 'battery',
    keywords: ['배터리', '폐건전지', 'aa', 'aaa', '건전지', '코인전지', '수은전지', '전지', '보조배터리', '충전지', 'cr 건전지'],
    reason: '전지 안의 전해질·아연 등이 새어 나오면 환경과 건강에 해로울 수 있어요. 다른 재활용품과 섞이지 않게 전지 수거함에 따로 버려야 해요.',
    verification: 'confirmed',
    sources: ['wg:건전지', 'korea_wasteguide', 'seoul_guide'],
    result: {
      type: 'battery',
      steps: [
        '제품에서 전지를 분리해주세요.',
        '주민센터·아파트 등에 있는 전지 수거함에 넣어주세요.',
      ],
      cautions: ['생활폐기물 분리배출 누리집에서 가까운 전지 수거함 위치를 지도로 찾을 수 있어요.'],
    },
  },
  {
    id: 'fluorescent-lamp',
    name: '형광등',
    category: 'etc',
    icon: 'lamp',
    keywords: ['폐형광등', '형광 등', '형광램프', '삼파장', '깨진 형광등'],
    reason: '형광등에는 수은이 들어 있어 형광등 전용 수거함으로 따로 모아야 해요.',
    verification: 'confirmed',
    sources: ['wg:형광등', 'seoul_guide'],
    result: {
      type: 'lamp',
      steps: ['깨지지 않게 조심해서 옮겨주세요.', '형광등 전용 수거함에 넣어주세요.'],
      cautions: ['깨진 형광등은 신문지 등으로 충분히 감싸 불연성 종량제 마대로 배출해요. 서울시는 소량이면 종량제봉투도 가능하다고 안내해요.'],
    },
  },
  {
    id: 'food-not-food',
    name: '뼈·껍데기·티백',
    category: 'etc',
    icon: 'bone',
    keywords: ['닭뼈', '생선뼈', '뼈', '조개껍데기', '조개 껍데기', '게 껍데기', '갑각류', '달걀 껍데기', '계란 껍데기', '알 껍질', '과일 씨', '복숭아 씨', '티백', '양파 껍질', '채소 뿌리'],
    reason: '음식물쓰레기는 사료·퇴비로 재활용되는데, 뼈처럼 딱딱한 것은 처리시설을 고장 낼 수 있어요. 그래서 음식물이 아니라 종량제봉투에 버려요.',
    verification: 'confirmed',
    sources: ['wg:닭뼈', 'wg:티백', 'seoul_guide'],
    result: {
      type: 'general',
      steps: ['물기를 빼고 종량제봉투에 넣어 버려주세요.'],
      cautions: ['서울시 기준: 어패류·갑각류 껍데기, 딱딱한 과일 껍데기와 씨, 육류·생선 뼈, 양파 껍질·채소 뿌리, 달걀 등 알 껍질, 티백이 해당돼요.'],
    },
  },
];
