# 어디에 버리지? — 분리배출 도우미 (AIP01 MVP)

헷갈리는 쓰레기를 검색하거나 카테고리에서 골라, 상태별 질문에 답하면 올바른 분리배출 방법을 단계별로 안내하는 모바일 중심 웹사이트입니다.

## 실행
```bash
npm install
npm run dev      # 개발 서버
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 확인
```

## Netlify 배포
- Build command: `npm run build`
- Publish directory: `dist`
- `netlify.toml`에 위 설정이 들어 있어, 저장소 연결 또는 `dist` 폴더 드래그&드롭으로 배포할 수 있습니다.

## 폴더 구조
```
src/
  data/
    items.js        ← 물품 데이터 (추가·수정은 여기서)
    sources.js      ← 참고 자료(출처) 목록
    categories.js   ← 카테고리, 배출 유형
  lib/search.js     ← 검색 (부분 일치, 초성, 오타 유사도)
  lib/router.js     ← 해시 라우터 (#/item/paper-cup 등)
  components/       ← 화면
```

## 물품 추가 방법
`src/data/items.js` 상단 주석의 형식에 맞춰 객체를 하나 추가하면 검색·카테고리·결과 화면에 자동 반영됩니다.
- 상태에 따라 배출 방법이 달라지면 `result` 대신 `question`을 사용합니다.
- 공식 자료로 확인하지 못한 내용은 `verification: 'needs-check'` 또는 옵션의 `needsCheck`로 표시하면 화면에 **확인 필요**가 표시됩니다.

## 데이터 출처와 한계
- 모든 물품(44개)은 실제로 열람한 자료에 근거합니다. 근거 우선순위는 다음과 같습니다.
  1. 환경부 **생활폐기물 분리배출 누리집**(wasteguide.or.kr, 2025.9. 개설, 현행 기준) — 물품별 결과 페이지를 `wg:품목명`으로 연결
  2. 환경부 지침·설명자료 (대한민국 정책브리핑 korea.kr)
  3. 서울시 표준 분리배출 기준(2025)과 '내 손안에 서울' 안내
- 자료끼리 다른 경우(즉석밥 용기, 빨대, 랩, 치약 튜브, 우산 등)는 현행 환경부 누리집을 따르고, 다른 안내는 '예외 및 주의사항'에 출처와 함께 적었습니다.
- 공식 기준과 다른 주장을 소개할 때만 언론 보도를 근거 자료에 포함하고 '(언론 보도)'로 표시합니다.
- 지자체마다 기준이 다를 수 있으며, 결과 화면에 우리 동네 기준 확인 안내를 포함했습니다.
- 물품 아이콘은 직접 제작한 SVG입니다(`src/components/Icon.jsx`). 외부 이미지는 사용하지 않습니다.
- 이미지 인식(AI) 기능은 포함되어 있지 않습니다.

## 배포 (GitHub Pages)
`main`에서 빌드한 `dist`를 `gh-pages` 브랜치에 올리면 https://jurnjihyun-spec.github.io/where-to-throw/ 에 반영됩니다.
