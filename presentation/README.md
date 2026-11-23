# AIP02 Round 1 발표: 어디에 버리지?

분리배출 도우미 프로덕트(`../src`)와 **별도**인 발표용 랜딩 페이지입니다. 스크롤형 단일 페이지이며, 섹션 순서가 곧 발표 순서입니다. 프로덕트 코드는 수정하지 않습니다.

- 발표 링크: https://jurnjihyun-spec.github.io/where-to-throw/aip02/
- 프로덕트 시연: https://jurnjihyun-spec.github.io/where-to-throw/
- 발표 스크립트: [presentation-script.md](./presentation-script.md)

## 조작
| 키 | 동작 |
|---|---|
| ↓ / → / PageDown | 다음 섹션 |
| ↑ / ← / PageUp | 이전 섹션 |
| F | 전체화면 |
| 상단 메뉴 | 해당 섹션으로 이동 |

## 구조
- `src/App.jsx`: 섹션별 내용(Hero → 01 문제 → … → 07 결정 → 마무리)과 키보드 이동
- `src/styles.css`: 디자인
- `public/shots/`: 실제 프로덕트 화면 캡처, `public/items/`: 프로덕트와 같은 물품 그림
- `scripts/make-qr.js`: 빌드 전 프로덕트 링크 QR 코드 생성 (외부 API 없음)

## 실행·배포
```bash
npm install
npm run dev     # 로컬 확인
npm run build   # dist/ 생성 → gh-pages 브랜치의 aip02/ 폴더로 배포
```

## 내용 원칙
- 사용자 발언은 원문 그대로 인용하며, 생략은 '…'로 표시합니다.
- 측정하지 않은 수치(시간, 정확도, 성공률)는 쓰지 않습니다.
- 사용자 이름은 가운데 글자를 0으로 가려 표기합니다.
- 사진형 물품 목록은 미리 등록된 그림을 고르는 목록이며, AI 인식이 아닙니다.
