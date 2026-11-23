// =====================================================================
// AIP02 Round 1 발표 장표
// - 모든 장표: 상단 두괄식 Key Message → 근거(다이어그램) → 시사점
// - 사용자 발언은 원문 그대로 인용 (가독성을 위한 생략은 '…'로 표시)
// - 측정하지 않은 수치(정확도·시간 등)는 쓰지 않음
// =====================================================================

export const PRODUCT_URL = 'https://jurnjihyun-spec.github.io/where-to-throw/';
const shot = (name) => `${import.meta.env.BASE_URL}shots/${name}.png`;

function Slide({ eyebrow, message, children, foot }) {
  return (
    <div className="slide">
      <header className="slide__head">
        <p className="slide__eyebrow">{eyebrow}</p>
        <h2 className="slide__message">{message}</h2>
      </header>
      <div className="slide__body">{children}</div>
      {foot && <footer className="slide__foot">{foot}</footer>}
    </div>
  );
}

const Arrow = ({ dir = 'right' }) => (
  <span className={`arrow arrow--${dir}`} aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

const Phone = ({ src, caption, tall }) => (
  <figure className={`phone ${tall ? 'phone--tall' : ''}`}>
    <div className="phone__frame"><img src={src} alt={caption} /></div>
    <figcaption>{caption}</figcaption>
  </figure>
);

// ------------------------------------------------------------------ 1. Executive Summary
function S1() {
  const cols = [
    { n: '01', t: '문제', h: '익숙한 생활용품도 배출 유형을 확신하기 어렵다', b: ['햇반 용기·과일 포장망·뽁뽁이처럼 외형과 실제 배출 유형이 어긋나는 물품', '초기의 \'오염 상태 판단\'보다 선행하는 불확실성으로 재정의'] },
    { n: '02', t: '솔루션', h: '배출 유형 + 판단 이유 + 공식 출처를 먼저 보여준다', b: ['\'어디에 버리지?\' — 검색하면 결과부터', '추가 조건이 필요한 물품만 재질·오염 질문 유지'] },
    { n: '03', t: '검증', h: '출처 기반 안내에 대한 긍정적 반응 확인', b: ['20대 사용자 3명 · 햇반 용기·과일 포장망·뽁뽁이', '탐색 편의·신뢰에 긍정적 진술 / GPT의 입력 편의는 경쟁 요소'] },
    { n: '04', t: '다음 결정', h: '가설 유지, 실제 \'선택\' 여부를 검증한다', b: ['예상과 부합 → 전면 피봇 대신 추가 사용자로 재확인', 'R2: 헷갈리는 순간 GPT·검색 대신 이 서비스를 고를까?'] },
  ];
  return (
    <div className="slide slide--cover">
      <div className="cover__top">
        <p className="slide__eyebrow">AIP02 · Round 1 · 전지현</p>
        <h1 className="cover__title">어디에 버리지? <span>— 분리배출 판단의 불확실성을 줄이는 서비스</span></h1>
        <p className="cover__message">일상적인 물품의 배출 유형을 확신하기 어렵다는 문제를 재정의하고, 출처 기반 안내의 가능성을 사용자 검증으로 확인했다.</p>
      </div>
      <div className="summary">
        {cols.map((c, i) => (
          <div key={c.n} className="summary__item">
            <div className={`summary__card ${i === 3 ? 'is-accent' : ''}`}>
              <p className="summary__label"><b>{c.n}</b> {c.t}</p>
              <p className="summary__head">{c.h}</p>
              <ul className="bullets bullets--sm">{c.b.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            {i < 3 && <Arrow />}
          </div>
        ))}
      </div>
      <div className="timeline">
        <p className="timeline__k">진행 순서</p>
        <ol>
          {[['AIP01', '오염 상태 중심 프로덕트'], ['문제 재정의', '검증 이전'], ['프로덕트 수정', '배출 유형·근거 + 조건 질문'], ['AIP02 1차 검증', '사용자 A·B'], ['추가 검증', '사용자 C'], ['결정', '가설 유지 · R2 과제']].map(([t, s], i) => (
            <li key={t} className={i >= 3 ? 'is-r1' : ''}><b>{t}</b><span>{s}</span></li>
          ))}
        </ol>
      </div>
      <footer className="slide__foot">프로덕트 시연 · <a href={PRODUCT_URL} target="_blank" rel="noreferrer">{PRODUCT_URL.replace('https://', '')}</a></footer>
    </div>
  );
}

// ------------------------------------------------------------------ 2. Problem Discovery
function S2() {
  const cand = ['냉장고 식품 유통기한·보관 관리', '보유 식재료 기반 레시피 추천', '헷갈리는 물품의 분리배출 방법 확인', '세탁 후 건조 시간 예측', '복잡한 Wi-Fi 비밀번호 입력'];
  const cases = [
    ['햇반 용기', '플라스틱처럼 생겼는데', '플라스틱류로 내도 될까?'],
    ['과일 포장망', '스티로폼처럼 보이는데', '재활용? 일반쓰레기?'],
    ['뽁뽁이', '비닐 같긴 한데', '비닐류? 일반쓰레기?'],
  ];
  return (
    <Slide eyebrow="02 · Problem Discovery" message="분리배출 문제는 단순히 오염 상태를 판단하기 어려운 것에 그치지 않았다."
      foot="문제 재정의는 AIP01 이후 문제를 다시 검토하며 이뤄졌으며, 사용자 검증(AIP02) 이전의 판단이다.">
      <div className="pd">
        <section className="pd__pick">
          <p className="col-title">AIP01 · 문제 선택</p>
          <ol className="cand">
            {cand.map((c, i) => <li key={c} className={i === 2 ? 'is-on' : ''}>{c}</li>)}
          </ol>
          <p className="col-sub">선택 이유</p>
          <div className="chips">
            {['반복적으로 발생', '누구나 겪는 문제', '해결 여부 확인이 명확', '단기간 구현 가능', '검증 과업 설계 용이'].map((x) => <span key={x} className="chip">{x}</span>)}
          </div>
        </section>

        <section className="pd__shift">
          <div className="ba ba--before">
            <p className="ba__tag">AIP01 · 초기 인식</p>
            <p className="ba__text">"같은 물품도 <b>오염 상태·재질</b>에 따라 배출 방법이 달라, 판단하기 어렵다."</p>
            <p className="ba__ex">예) 배달 용기 — 깨끗한가? 기름이 묻었나? 씻을 수 있나?</p>
            <p className="ba__sol">→ 물품 선택 + <b>상태 질문</b> 중심의 프로덕트</p>
            <ul className="ba__feat">
              {['물품명 검색', '카테고리별 탐색', '오염 상태 추가 질문', '응답에 따른 배출 방법 안내', '배출 전 해야 할 행동 제시'].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="ba__mid"><Arrow /><span>문제 재검토<br />(검증 이전)</span></div>
          <div className="ba ba--after">
            <p className="ba__tag">재정의 · 핵심 원인 가설 재설정</p>
            <p className="ba__text">"익숙한 생활용품조차 <b>일반쓰레기인지 재활용 대상인지</b> 확신하기 어렵다."</p>
            <ul className="cases">
              {cases.map(([n, a, q]) => (
                <li key={n}><b>{n}</b><span>{a}</span><em>{q}</em></li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="takeaway">
        <span className="takeaway__k">문제 정의</span>
        <span>생활용품을 버리려는 사람은 물품이 무엇인지 <b>알면서도</b>, 외형과 직관만으로는 <b>배출 유형을 확신하지 못한다.</b></span>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 3. Issue Tree
function S3() {
  const branches = [
    { k: '원인 1', t: '정보 접근의 어려움', items: ['기준을 확인하려면 별도 검색이 필요', '여러 검색 결과를 비교해야 하는 번거로움', '즉시 판단이 어려우면 검색 자체를 포기'], tag: '이번 라운드 범위 밖', tone: 'mute' },
    { k: '원인 2', t: '배출 유형 판단의 어려움', items: ['외형과 실제 배출 가능 여부가 불일치', '익숙한 물품도 일반·재활용 여부를 확신 못 함', '판단할 근거가 부족'], tag: '이번 라운드 핵심 검증 대상', tone: 'key' },
    { k: '원인 3', t: '조건별 배출 기준 적용의 어려움', items: ['재질·오염·분리 가능 여부에 따라 조건이 달라짐', '일반 기준을 개별 물품에 적용하기 어려움', '추가 상태 확인이 필요한 경우 존재'], tag: '버리지 않음 → 보조 기능(조건별 질문)으로 유지', tone: 'sub' },
  ];
  return (
    <Slide eyebrow="03 · Issue Tree" message="분리배출 판단의 어려움을 세 가지 원인으로 구조화하고, 배출 유형 판단의 불확실성을 핵심 원인으로 선정했다."
      foot="※ 사용자 검증 이전에 세운 원인 가설로, 확정된 사실이 아니다.">
      <div className="tree">
        <div className="tree__root">
          <p className="tree__rootk">Root Question</p>
          <p className="tree__rootq">왜 사용자는 일상적인 물품의 올바른 분리배출 방법을 판단하기 어려울까?</p>
        </div>
        <svg className="tree__lines" viewBox="0 0 80 420" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 210H40M40 70V350M40 70H80M40 210H80M40 350H80" fill="none" stroke="#9aa6b5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M40 210H80" fill="none" stroke="#2f7d5b" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="tree__branches">
          {branches.map((b) => (
            <div key={b.k} className={`branch branch--${b.tone}`}>
              <div className="branch__head">
                <span className="branch__k">{b.k}</span>
                <span className="branch__t">{b.t}</span>
              </div>
              <ul className="branch__items">{b.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <span className="branch__tag">{b.tag}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="takeaway takeaway--key">
        <span className="takeaway__k">선정 논리</span>
        <span>오염 상태에 따른 기준 적용(원인 3)보다, <b>물품 자체의 배출 유형을 확신하지 못하는 문제(원인 2)가 더 선행할 수 있다</b>고 판단했다.</span>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 4. Solution Evolution
function S4() {
  return (
    <Slide eyebrow="04 · Solution Evolution" message="배출 유형을 즉시 안내하는 방향으로 피봇하되, 재질·오염 상태에 따른 추가 판단 기능은 유지했다."
      foot="물품 수·분기 조건은 현재 프로덕트 데이터 기준(등록 물품 44개). 출처: 환경부 생활폐기물 분리배출 누리집, 서울시 표준 분리배출 기준(2025) 등 물품별 표기.">
      <div className="se">
        <div className="se__left">
          <div className="prio">
            <div className="prio__row prio__row--old">
              <span className="prio__k">AIP01</span>
              <span className="pill">물품 선택</span><Arrow /><span className="pill pill--strong">상태 질문</span><Arrow /><span className="pill">배출 방법</span>
              <span className="prio__note">질문이 기본 경로</span>
            </div>
            <div className="prio__row prio__row--new">
              <span className="prio__k">R1</span>
              <span className="pill">물품 검색</span><Arrow /><span className="pill pill--strong">배출 유형 · 판단 이유 · 공식 출처</span>
              <span className="prio__note">결과가 기본, 질문은 필요할 때만</span>
            </div>
          </div>

          <p className="col-title">사용자 플로우</p>
          <div className="flow">
            <div className="flow__start">물품 검색<small>검색창 · 카테고리</small></div>
            <Arrow />
            <div className="flow__q">추가 조건이<br />필요한 물품인가?</div>
            <div className="flow__cases">
              <div className="case case--a">
                <p className="case__k">CASE A · 아니오 <span>44개 중 37개</span></p>
                <p className="case__flow">바로 결과 → 배출 유형 → 판단 이유 → 공식 출처</p>
                <p className="case__ex">예) 즉석밥 용기, 과일 포장망, 뽁뽁이, 영수증, 칫솔</p>
              </div>
              <div className="case case--b">
                <p className="case__k">CASE B · 예 <span>44개 중 7개</span></p>
                <p className="case__flow">조건 질문 1개 → 조건에 맞는 배출 방법</p>
                <ul className="case__list">
                  <li><b>오염·세척 가능 여부</b> 배달 용기, 피자 박스, 스티로폼, 랩, 소스 통</li>
                  <li><b>재질 + 오염</b> 컵라면 용기 (종이 / 스티로폼)</li>
                  <li><b>분리배출 표시</b> 치약 튜브 ('플라스틱' / '도포·첩합')</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="values">
            <span><b>간편성</b> 결과를 먼저, 행동은 2~3단계</span>
            <span><b>신뢰성</b> 판단 이유 + 출처 링크, 미확인은 단정하지 않음</span>
            <span><b>상황 적합성</b> 필요한 물품만 조건 질문</span>
          </div>
        </div>
        <div className="se__shots">
          <Phone src={shot('result')} caption="CASE A · 결과 화면" />
          <Phone src={shot('question')} caption="CASE B · 조건 질문" />
        </div>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 5. Hypothesis & Test Design
function S5() {
  const criteria = [
    ['실제로 헷갈리는가?', '사용 전 세 물품 배출 예상'],
    ['원하는 정보를 쉽게 찾는가?', '사용 후 탐색 경험 질문'],
    ['안내를 신뢰할 수 있다고 느끼는가?', '사용 후 신뢰 질문'],
    ['기존 방식과 무엇이 다른가?', 'GPT·네이버와 비교 질문'],
  ];
  return (
    <Slide eyebrow="05 · Hypothesis & Test Design" message="물품별 배출 유형과 공식 근거를 제공하면 사용자가 쉽고 신뢰성 있게 판단할 수 있을 것이라 가정했다.">
      <div className="hypo">
        <p className="hypo__k">핵심 검증 가설</p>
        <p className="hypo__s">"분리배출 유형을 확신하지 못하는 사용자에게 물품별 배출 방법과 공식 판단 근거를 간결하게 제공하면, 별도의 복잡한 검색 없이 배출 방법을 확인하고 신뢰할 수 있을 것이다."</p>
        <div className="hypo__parts">
          <div><span>대상</span>분리배출 방법을 확신하지 못하는 사용자</div>
          <Arrow />
          <div><span>해결 방식</span>배출 유형 + 간결한 설명 + 공식 출처</div>
          <Arrow />
          <div><span>기대 행동</span>정보를 쉽게 찾고, 안내를 신뢰하며 판단</div>
        </div>
      </div>

      <div className="td">
        <section>
          <p className="col-title">판단 기준</p>
          <ol className="crit">
            {criteria.map(([q, how], i) => <li key={q}><b>{i + 1}</b><span>{q}</span><small>{how}</small></li>)}
          </ol>
        </section>
        <section>
          <p className="col-title">검증 설계</p>
          <dl className="design">
            <dt>과업</dt><dd>햇반 용기 · 과일 포장망 · 뽁뽁이를 각각 어떻게 버려야 하는지 사이트에서 확인</dd>
            <dt>대상</dt><dd>20대 여성 3명 (05년생) — 1차 A·B, 추가 C</dd>
            <dt>방식</dt><dd>카카오톡 사용 전·후 질문 + 사용 피드백 (C는 구두 인터뷰)</dd>
            <dt>흐름</dt><dd>사용 전: 예상·평소 해결 방식 → 사이트 사용 → 사용 후: 탐색·신뢰·비교·개선점</dd>
          </dl>
        </section>
        <section className="measure">
          <p className="col-title">측정한 것 / 측정하지 않은 것</p>
          <div className="measure__yes">
            <p>측정함 · 정성</p>
            <ul><li>사용 전 예상과 평소 행동 (진술)</li><li>사용 후 탐색·신뢰 평가 (진술)</li><li>GPT·네이버 대비 인식</li></ul>
          </div>
          <div className="measure__no">
            <p>측정하지 않음</p>
            <ul><li>과업 소요 시간 · 성공률</li><li>클릭 로그 · 화면 녹화</li><li>실제 분리배출 행동 변화</li></ul>
          </div>
        </section>
      </div>
      <div className="signals">
        <div className="signals__yes"><b>지지 신호</b>세 물품의 배출 방법을 사이트에서 찾았다고 말하고, 출처를 신뢰의 이유로 언급한다</div>
        <div className="signals__no"><b>재검토 신호</b>원하는 정보를 찾지 못했다고 말하거나, 출처가 있어도 안내를 믿기 어렵다고 말한다</div>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 6. Real Voice
const Review = ({ when, quote, tags, insight, note }) => {
  const quotes = Array.isArray(quote) ? quote : [quote];
  return (
  <div className="review">
    <div className="review__top">
      <span className={`when when--${when === '사용 전' ? 'before' : 'after'}`}>{when}</span>
      {tags.map((t) => <span key={t} className="rtag">{t}</span>)}
    </div>
    {quotes.map((q) => <p key={q} className="review__q">“{q}”</p>)}
    {note && <p className="review__note">{note}</p>}
    {insight && <p className="review__insight"><b>INSIGHT</b>{insight}</p>}
  </div>
  );
};

function S6() {
  return (
    <Slide eyebrow="06 · Real Voice — User Validation" message="사용자들은 분리배출 판단의 어려움을 경험했고, 출처 기반 안내에 신뢰를 보였다."
      foot="인용은 카카오톡 응답 원문(맞춤법 포함)이며 '…'는 생략 표시. 별점·점수 등은 수집하지 않았다.">
      <div className="voices">
        <div className="voice">
          <div className="voice__who"><span className="avatar">A</span><div><b>박소은</b><small>05년생 · 여성 · 1차 검증</small></div></div>
          <Review when="사용 전" tags={['판단 불확실성']} quote="잘 모르겠음. 보통 셋다 플라스틱에 그냥 버림" />
          <Review when="사용 후" tags={['간편성']} quote={['쉽게 찾을수잇엇어요 최곤디?', '페이지들어가자마자 원하는 정보 > 어디에 버려야하는지 를 딱 강조해서 잘 보이게 되어있는점이 가장 좋은 것 같고 …']} insight="배출 유형을 먼저 강조한 결과 화면을 장점으로 꼽음" />
          <Review when="사용 후" tags={['신뢰성']} quote="근거자료 밑에 있는거 보니 … 근거자료 굳이확인안하고믿을듯 사이트에대한신뢰감?" insight="출처 표시가 사이트 전체에 대한 신뢰로 확장" />
        </div>
        <div className="voice">
          <div className="voice__who"><span className="avatar">B</span><div><b>장유정</b><small>05년생 · 여성 · 1차 검증</small></div></div>
          <Review when="사용 전" tags={['판단 불확실성']} quote="햇반용기: 재활용, 그티로폼 드물망: 재활용..?, 뽁뽁이: 재활용" />
          <Review when="사용 전" tags={['검색 회피']} quote="Gpt, 인터넷 검색까지 하기엔 … 귀찮. 차라리 걍 일쓰에 다 넣어서 태워버리겟 단 생각." insight="모를 때 확인하기보다 일반쓰레기로 처리할 수 있음" />
          <Review when="사용 후" tags={['신뢰성']} quote={['앜 과일망 틀렷다', '… gpt 보단 좀 더 이 사이트가 믿을만 할 듯 출처 보여서']}
            note="'틀렸다'는 사용자의 인식. 공식 기준(환경부 누리집·서울시)상 과일 그물망은 종량제봉투로, 사용 전 예상(재활용..?)과 다름."
            insight="GPT의 편의와 별개로 출처 기반 신뢰에 긍정적" />
        </div>
        <div className="voice voice--c">
          <div className="voice__who"><span className="avatar">C</span><div><b>김수영</b><small>05년생 · 여성 · 추가 검증</small></div></div>
          <div className="review review--summary">
            <div className="review__top"><span className="when when--after">추가 검증 요약</span><span className="rtag">일관성 확인</span></div>
            <p className="review__q review__q--plain">사용자 A와 유사한 반응이 확인됨</p>
            <ul className="bullets bullets--sm">
              <li>1차 검증(A·B)과 같은 과업·질문 흐름으로 진행</li>
              <li>구두 인터뷰로 진행해 발언 원문을 기록하지 못함 → 직접 인용은 싣지 않음</li>
            </ul>
            <p className="review__insight"><b>INSIGHT</b>1차 반응이 한 사용자에게만 나타난 것은 아님 — 단, 3명으로 일반화할 수 없음</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 7. Expected vs Observed
function S7() {
  const rows = [
    { exp: '익숙한 물품이라도 배출 유형을 확신하지 못할 것이다', obs: ['A: 세 물품 모두 "잘 모르겠음"', 'B: 과일 포장망 "재활용..?"으로 불확실', 'C: 유사한 반응 보고'], dec: '문제 가설을 지지하는 정성적 반응', badge: 'support' },
    { exp: '배출 유형을 명확히 보여주면 필요한 정보를 쉽게 찾을 것이다', obs: ['A: "쉽게 찾을수잇엇어요"', 'A: 배출 유형을 강조한 UI를 가장 좋은 점으로 언급', 'B: 사이트 확인 후 기존 판단과 다른 결과를 인식'], dec: '탐색·가독성에 긍정적 반응 (시간·성공률은 미측정)', badge: 'support' },
    { exp: '공식 근거를 제공하면 안내를 더 신뢰할 것이다', obs: ['A: 근거자료를 보고 "사이트에 대한 신뢰감"', 'B: GPT보다 믿을 만한 이유로 "출처 보여서"'], dec: '출처 기반 신뢰 가설을 지지하는 반응', badge: 'support' },
    { exp: '(예상 밖) 사용자는 GPT를 어떻게 볼까?', obs: ['A: "지피티가 편하긴하죠… 사진 찍어서 이거 어떻게해? 라고 … 물어볼 수 있어서!!!"', 'B: "Gpt.내가 원하는 답변만 간결하게 보이니까"'], dec: '입력·접근 편의는 GPT가 강력한 대안 → 다음 라운드 검증', badge: 'next' },
  ];
  return (
    <Slide eyebrow="07 · Expected vs. Observed" message="정보 탐색과 신뢰성에 대한 가설은 정성적으로 지지되었지만, GPT의 입력 편의성이라는 경쟁 요소도 발견했다."
      foot="판단은 사용자 3명의 진술에 근거한 정성적 판단이며, 통계적 검증이 아니다.">
      <div className="matrix">
        <div className="matrix__head"><span>Hypothesis · 예상</span><span>Observed · 실제 반응</span><span>Decision · 시사점</span></div>
        {rows.map((r, i) => (
          <div key={i} className={`matrix__row ${r.badge === 'next' ? 'is-next' : ''}`}>
            <div className="matrix__exp"><b>{r.badge === 'next' ? '추가 발견' : `예상 ${i + 1}`}</b>{r.exp}</div>
            <ul className="matrix__obs">{r.obs.map((o) => <li key={o}>{o}</li>)}</ul>
            <div className="matrix__dec">
              <span className={`badge badge--${r.badge}`}>{r.badge === 'support' ? '지지 (정성)' : '추가 검증 필요'}</span>
              <p>{r.dec}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 8. Decision & Next Step
function S8() {
  const steps = [
    ['1차 검증', '사용자 A · B'],
    ['예상과 부합', '탐색·신뢰 긍정 반응'],
    ['결정', '전면 피봇 대신 같은 가설로 추가 확인'],
    ['추가 검증', '사용자 C · 유사한 반응'],
    ['가설 유지', '핵심 문제·해결 방향 유지'],
  ];
  return (
    <Slide eyebrow="08 · Decision & Next Step" message="핵심 가설을 유지하고 추가 사용자에게 재확인했으며, 다음 라운드에서는 실제 서비스 선택 가능성을 검증한다."
      foot="한계: 사용자 3명 · 정성 진술 중심 · 카카오톡 기반(클릭 로그·소요 시간·화면 녹화 없음) · C는 구두 인터뷰로 원문 미기록.">
      <div className="dflow">
        {steps.map(([t, s], i) => (
          <div key={t} className="dflow__item">
            <div className={`dstep ${i === 2 ? 'is-key' : ''} ${i === 4 ? 'is-end' : ''}`}><b>{t}</b><span>{s}</span></div>
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
      <p className="dflow__why">근거 — 과제 원칙: "예상대로였다면 다른 사용자·조건에서도 같은지 살펴봅니다." 3명의 반응을 시장 수요로 일반화하지 않는다.</p>

      <div className="next">
        <section className="next__q">
          <p className="col-title">Round 2 핵심 질문</p>
          <p className="next__big">사용자는 실제로 분리배출이 헷갈리는 순간, <b>GPT나 검색엔진 대신 이 서비스를 선택할 것인가?</b></p>
          <p className="checks__k">검증 예정 항목 · 이번 라운드에서는 검증하지 않음</p>
          <ul className="checks">
            {['실제 사용 상황에서의 서비스 선택', 'GPT 대비 과업 완료 시간', '검색되지 않는 물품을 만났을 때의 행동', '공식 출처가 사용 의향에 미치는 영향', '사진 입력 기능의 실제 필요성'].map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div className="aside-note">
            <b>보조 대응 · 검증 후 추가</b>
            <span>메인에 '사진으로 물품 찾기'(미리 등록된 그림을 보고 고르는 목록) 추가 — AI 사진 인식이 아니며, 이번 검증의 성과로 보지 않는다. R2의 '사진 입력 필요성' 검증에서 비교 대상으로 활용.</span>
          </div>
          <p className="next__concl">분리배출 정보의 정확한 전달과 신뢰성에 대한 초기 가능성을 확인했다. 다음 과제는 사용자가 실제 생활에서 이 서비스를 <b>선택할 만큼 간편한 경험</b>을 제공하는 것이다.</p>
        </section>
        <a className="demo" href={PRODUCT_URL} target="_blank" rel="noreferrer">
          <img src={`${import.meta.env.BASE_URL}qr-product.svg`} alt="프로덕트 QR 코드" />
          <span className="demo__k">프로덕트 시연</span>
          <span className="demo__url">jurnjihyun-spec.github.io<br />/where-to-throw</span>
        </a>
      </div>
    </Slide>
  );
}

// ------------------------------------------------------------------ 장표 목록 (발표자 노트 포함)
export const SLIDES = [
  { id: 'summary', label: 'Summary', Comp: S1, time: '0:30',
    notes: ['문제를 재정의했고, 출처 기반 안내의 가능성을 사용자 3명에게 확인했다.', '문제 → 솔루션 → 검증 → 다음 결정 순으로 설명.'] },
  { id: 'problem', label: 'Problem', Comp: S2, time: '0:40',
    notes: ['AIP01에서 5개 후보 중 분리배출 선택: 반복·보편·확인 가능·빠른 구현.', '처음엔 오염 상태 판단이 문제라고 보고 상태 질문 중심으로 만듦.', 'AIP01 이후 다시 보니, 오염 이전에 물품 자체의 배출 유형을 확신 못 하는 게 더 직관적인 불편이었음.', '이 재정의는 사용자 검증 전에 한 판단.'] },
  { id: 'issue-tree', label: 'Issue Tree', Comp: S3, time: '0:40',
    notes: ['Root: 왜 판단이 어려운가 → 정보 접근 / 배출 유형 판단 / 조건별 기준 적용.', '원인 2를 이번 라운드 검증 대상으로 선택. 원인 3은 버리지 않고 보조 기능으로 유지.', '검증 전 가설임을 명시.'] },
  { id: 'solution', label: 'Solution', Comp: S4, time: '0:40',
    notes: ['피봇은 기능 추가가 아니라 경험의 우선순위 변경: 질문 먼저 → 결과 먼저.', 'CASE A: 37개 물품은 바로 배출 유형·이유·출처.', 'CASE B: 7개 물품만 조건 질문. 치약은 오염이 아니라 분리배출 표시로 분기.'] },
  { id: 'hypothesis', label: 'Hypothesis', Comp: S5, time: '0:35',
    notes: ['가설: 대상 → 해결 방식 → 기대 행동.', '판단 기준 4가지와 과업.', '측정하지 않은 것(시간·성공률·실제 행동)을 먼저 밝혀 둠.'] },
  { id: 'real-voice', label: 'Real Voice', Comp: S6, time: '0:50',
    notes: ['A: 사용 전 모름 → 사용 후 쉽게 찾음, 근거자료로 사이트 전체 신뢰.', 'B: 모르면 일반쓰레기로 처리, 사용 후 과일망 예상이 달랐음을 인식, 출처 때문에 GPT보다 믿을 만.', 'C: A와 유사한 반응. 구두라 인용은 생략.'] },
  { id: 'expected-observed', label: 'Expected vs Observed', Comp: S7, time: '0:35',
    notes: ['예상 1~3은 정성적으로 지지.', '예상 밖: GPT의 사진 입력·간결한 답변 편의 — 경쟁 요소.'] },
  { id: 'decision', label: 'Decision', Comp: S8, time: '0:30',
    notes: ['예상과 부합 → 바꾸지 않고 다른 사용자(C)에게 재확인 → 유사 반응 → 가설 유지.', 'R2: 헷갈리는 순간 GPT 대신 이 서비스를 고르는가.', '한계와 시연 링크 안내.'] },
];
