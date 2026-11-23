# AIP02 Round 1 발표 — 어디에 버리지?

분리배출 도우미 프로덕트(`../src`)와 **별도**의 발표용 웹 프레젠테이션입니다. 프로덕트 코드는 수정하지 않습니다.

- 발표 링크: https://jurnjihyun-spec.github.io/where-to-throw/aip02/
- 프로덕트 시연: https://jurnjihyun-spec.github.io/where-to-throw/
- 발표 스크립트: [presentation-script.md](./presentation-script.md)

## 조작
| 키 | 동작 |
|---|---|
| ← / → (PageUp/PageDown, Space) | 이전 / 다음 장표 |
| Home / End | 처음 / 마지막 |
| F | 전체화면 |
| N | 발표자 노트 |
| 상단 탭 | 해당 장표로 이동 (`#3`처럼 주소로 직접 접근 가능) |

장표는 1280×720(16:9) 캔버스이며 화면 크기에 맞춰 자동으로 확대·축소됩니다.

## 구조
- `src/slides.jsx` — 장표 8장의 내용과 발표자 노트
- `src/App.jsx` — 이동·전체화면·노트·비율 맞춤
- `public/shots/` — 실제 프로덕트 화면 캡처 (모바일 390px, 2배율)
- `scripts/make-qr.js` — 빌드 전 프로덕트 링크 QR 코드 생성 (외부 API 없음)

## 실행·배포
```bash
npm install
npm run dev     # 로컬 확인
npm run build   # dist/ 생성 → gh-pages 브랜치의 aip02/ 폴더로 배포
```

## 내용 원칙
- 사용자 발언은 원문 그대로 인용하며, 생략은 '…'로 표시합니다. 사용자 C는 구두 인터뷰라서 발언을 인용하지 않고 요약만 싣습니다.
- 측정하지 않은 수치(시간, 정확도, 성공률)는 쓰지 않습니다.
- 사진형 물품 목록은 미리 등록된 그림을 고르는 목록이며, AI 인식이 아닙니다.
