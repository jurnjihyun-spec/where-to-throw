import { useEffect, useState } from 'react';

// =====================================================================
// AIP02 Round 1 · 발표용 랜딩 페이지
// - 섹션 순서가 곧 발표 순서: 문제 → 원인 → 솔루션 → 가설 → 검증 → 비교 → 결정
// - 사용자 발언은 원문 그대로 (생략은 '…'), 측정하지 않은 수치는 쓰지 않음
// - 발표 시 ↓ / → / PageDown: 다음 섹션, ↑ / ← / PageUp: 이전 섹션, F: 전체화면
// =====================================================================

const PRODUCT_URL = 'https://jurnjihyun-spec.github.io/where-to-throw/';
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const NAV = [
  ['problem', '문제'],
  ['tree', '원인'],
  ['solution', '솔루션'],
  ['hypothesis', '가설'],
  ['voice', '검증'],
  ['compare', '예상 vs 실제'],
  ['decision', '결정'],
];

function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function SectionHead({ no, kicker, title, children }) {
  return (
    <header className="shead">
      <div className="shead__no">{no}</div>
      <div>
        <p className="shead__kicker">{kicker}</p>
        <h2 className="shead__title">{title}</h2>
        {children && <p className="shead__lead">{children}</p>}
      </div>
    </header>
  );
}

// ------------------------------------------------------------------ 키보드로 섹션 이동
function useSectionKeys() {
  useEffect(() => {
    const sections = () => [...document.querySelectorAll('[data-stop]')];
    const current = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return sections().length - 1;
      const y = window.scrollY + 80;
      let idx = 0;
      sections().forEach((s, i) => { if (s.offsetTop <= y) idx = i; });
      return idx;
    };
    const go = (d) => {
      const list = sections();
      const next = list[Math.max(0, Math.min(list.length - 1, current() + d))];
      window.scrollTo({ top: next.offsetTop - 56, behavior: 'smooth' });
    };
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) { e.preventDefault(); go(1); }
      else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = '';
      NAV.forEach(([id]) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; });
      setActive(cur);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--progress', max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

// ==================================================================== PAGE
export default function App() {
  useSectionKeys();
  const active = useActiveSection();

  return (
    <>
      <nav className="nav">
        <a className="nav__brand" href="#top">어디에 버리지?<span>AIP02 · R1</span></a>
        <div className="nav__links">
          {NAV.map(([id, label], i) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-on' : ''}><em>{String(i + 1).padStart(2, '0')}</em>{label}</a>
          ))}
        </div>
        <a className="nav__cta" href={PRODUCT_URL} target="_blank" rel="noreferrer">프로덕트 열기 ↗</a>
        <span className="nav__progress" aria-hidden="true" />
      </nav>

      {/* ============================================================ HERO */}
      <section className="hero" id="top" data-stop>
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="hero__meta">AIP02 Round 1 · 전지현</p>
            <h1 className="hero__title">알아도,<br />버릴 땐<br /><mark>헷갈린다.</mark></h1>
            <p className="hero__lead">
              일상적인 물품의 배출 유형을 확신하기 어렵다는 문제를 재정의하고,
              출처 기반 안내의 가능성을 사용자 검증으로 확인했다.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--dark" href={PRODUCT_URL} target="_blank" rel="noreferrer">프로덕트 시연 ↗</a>
              <a className="btn btn--line" href="#problem">사고 과정 보기 ↓</a>
            </div>
          </div>
          <div className="hero__visual">
            <img className="hero__phone hero__phone--back" src={asset('shots/home.png')} alt="어디에 버리지? 메인 화면" />
            <img className="hero__phone hero__phone--front" src={asset('shots/result.png')} alt="즉석밥 용기 결과 화면" />
          </div>
        </div>

        <div className="wrap">
          <ol className="tldr">
            {[
              ['문제', '익숙한 생활용품도 일반쓰레기인지 재활용인지 확신하지 못한다'],
              ['솔루션', '배출 유형 · 판단 이유 · 공식 출처를 먼저, 필요할 때만 조건 질문'],
              ['검증', '20대 3명, 탐색 편의와 출처 신뢰에 긍정적, GPT의 입력 편의는 경쟁 요소'],
              ['결정', '가설 유지 → R2: 헷갈리는 순간 이 서비스를 실제로 고를까?'],
            ].map(([k, v], i) => (
              <li key={k}><span>{String(i + 1).padStart(2, '0')} {k}</span><p>{v}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ 01 PROBLEM */}
      <section className="sec" id="problem" data-stop>
        <div className="wrap">
          <SectionHead no="01" kicker="Problem Discovery" title="분리배출 문제는 오염 상태를 판단하기 어려운 것에 그치지 않았다.">
            AIP01에서 다섯 가지 일상 문제 중 분리배출을 골랐다. 반복적으로 일어나고, 누구나 겪으며, 해결 여부를 명확히 확인할 수 있고, 짧은 기간에 실제로 작동하는 프로덕트를 만들 수 있었기 때문이다.
          </SectionHead>

          <div className="shift">
            <div className="shift__col shift__col--from">
              <p className="tag">AIP01 · 처음 생각</p>
              <p className="shift__big">같은 물품도 <u>오염 상태·재질</u>에 따라 배출 방법이 달라 판단하기 어렵다.</p>
              <p className="shift__small">→ 물품 선택 + 상태 질문 중심의 프로덕트 (검색 · 카테고리 · 오염 상태 질문 · 상황별 안내)</p>
            </div>
            <div className="shift__turn">
              <Arrow />
              <span>AIP01 이후<br />문제 재검토<br /><b>사용자 검증 전</b></span>
            </div>
            <div className="shift__col shift__col--to">
              <p className="tag tag--green">재정의 · 핵심 원인 가설</p>
              <p className="shift__big">익숙한 생활용품조차 <mark>일반쓰레기인지 재활용 대상인지</mark> 확신하기 어렵다.</p>
              <p className="shift__small">이름을 몰라서가 아니라, 알아도 외형과 직관만으로는 배출 유형을 확신할 수 없다.</p>
            </div>
          </div>

          <div className="cases">
            {[
              ['instant-rice', '햇반 용기', '플라스틱처럼 생겼는데', '플라스틱류로 내도 될까?'],
              ['fruit-net', '과일 포장망', '스티로폼처럼 보이는데', '재활용? 일반쓰레기?'],
              ['bubble-wrap', '뽁뽁이', '비닐 같긴 한데', '비닐류? 일반쓰레기?'],
            ].map(([img, name, look, q]) => (
              <figure key={name} className="case">
                <img src={asset(`items/${img}.svg`)} alt="" />
                <figcaption><b>{name}</b><span>{look}</span><strong>{q}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ 02 ISSUE TREE */}
      <section className="sec sec--gray" id="tree" data-stop>
        <div className="wrap">
          <SectionHead no="02" kicker="Issue Tree" title="원인을 세 갈래로 나누고, 배출 유형 판단의 불확실성을 이번 라운드의 핵심 원인으로 골랐다.">
            오염 상태에 따른 기준 적용보다, 물품 자체의 배출 유형을 확신하지 못하는 문제가 더 선행할 수 있다고 판단했다. 사용자 검증 전에 세운 가설이다.
          </SectionHead>

          <div className="tree">
            <div className="tree__root">
              <span>Root Question</span>
              왜 사용자는 일상적인 물품의 올바른 분리배출 방법을 판단하기 어려울까?
            </div>
            <div className="tree__stem" aria-hidden="true" />
            <div className="tree__branches">
              {[
                { k: '원인 1', t: '정보 접근의 어려움', d: ['기준 확인에 별도 검색이 필요', '여러 결과를 비교해야 하는 번거로움', '즉시 판단이 어려우면 검색 자체를 포기'], s: '이번 라운드 범위 밖', tone: '' },
                { k: '원인 2', t: '배출 유형 판단의 어려움', d: ['외형과 실제 배출 가능 여부가 불일치', '익숙한 물품도 일반·재활용 여부를 확신 못 함', '판단할 근거가 부족'], s: '이번 라운드 검증 대상', tone: 'key' },
                { k: '원인 3', t: '조건별 기준 적용의 어려움', d: ['재질·오염·분리 가능 여부에 따라 조건이 달라짐', '일반 기준을 개별 물품에 적용하기 어려움', '추가 상태 확인이 필요한 경우 존재'], s: '버리지 않음 → 보조 기능으로 유지', tone: 'sub' },
              ].map((b) => (
                <div key={b.k} className={`branch ${b.tone ? `branch--${b.tone}` : ''}`}>
                  <p className="branch__k">{b.k}</p>
                  <p className="branch__t">{b.t}</p>
                  <ul>{b.d.map((x) => <li key={x}>{x}</li>)}</ul>
                  <p className="branch__s">{b.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 03 SOLUTION */}
      <section className="sec" id="solution" data-stop>
        <div className="wrap">
          <SectionHead no="03" kicker="Solution Evolution" title="결과를 먼저 보여주는 쪽으로 피봇하되, 재질·오염 조건 질문은 남겼다.">
            바뀐 것은 기능 목록이 아니라 경험의 우선순위다. 이름만으로 배출 방법을 확정할 수 없는 물품이 실제로 있기 때문에, 초기 솔루션의 유효한 부분은 유지했다.
          </SectionHead>

          <div className="prio">
            <div className="prio__row">
              <span className="prio__k">AIP01</span>
              <span>물품 선택</span><Arrow /><span className="prio__em">상태 질문</span><Arrow /><span>배출 방법</span>
              <em>질문이 기본 경로</em>
            </div>
            <div className="prio__row prio__row--new">
              <span className="prio__k">R1</span>
              <span>물품 검색</span><Arrow /><span className="prio__em">배출 유형 · 판단 이유 · 공식 출처</span>
              <em>결과가 기본, 질문은 필요할 때만</em>
            </div>
          </div>

          <div className="sol">
            <div className="flow">
              <div className="flow__start">물품 검색<small>검색창 · 카테고리</small></div>
              <div className="flow__q">추가 조건이 필요한 물품인가?</div>
              <div className="flow__case">
                <p className="flow__k">CASE A · 아니오 <span>등록 물품 44개 중 37개</span></p>
                <p className="flow__path">바로 결과 → 배출 유형 → 판단 이유 → 공식 출처</p>
                <p className="flow__ex">즉석밥 용기 · 과일 포장망 · 뽁뽁이 · 영수증 · 칫솔 …</p>
              </div>
              <div className="flow__case flow__case--b">
                <p className="flow__k">CASE B · 예 <span>44개 중 7개</span></p>
                <p className="flow__path">조건 질문 1개 → 조건에 맞는 배출 방법</p>
                <dl>
                  <dt>오염·세척 가능 여부</dt><dd>배달 용기, 피자 박스, 스티로폼, 랩, 소스 통</dd>
                  <dt>재질 + 오염</dt><dd>컵라면 용기 (종이 / 스티로폼)</dd>
                  <dt>분리배출 표시</dt><dd>치약 튜브 ('플라스틱' / '도포·첩합')</dd>
                </dl>
              </div>
              <div className="values">
                <p><b>간편성</b>결과를 먼저, 행동은 2~3단계</p>
                <p><b>신뢰성</b>판단 이유 + 출처 링크, 미확인 기준은 단정하지 않음</p>
                <p><b>상황 적합성</b>필요한 물품만 조건 질문</p>
              </div>
            </div>
            <div className="shots">
              <figure><img src={asset('shots/result.png')} alt="CASE A 결과 화면" /><figcaption>CASE A · 배출 유형과 판단 이유</figcaption></figure>
              <figure><img src={asset('shots/sources.png')} alt="근거 자료 화면" /><figcaption>근거 자료 · 공식 출처 링크</figcaption></figure>
              <figure><img src={asset('shots/question.png')} alt="CASE B 조건 질문 화면" /><figcaption>CASE B · 조건 질문</figcaption></figure>
            </div>
          </div>
          <p className="note">물품 수와 분기 조건은 현재 프로덕트 데이터 기준. 배출 기준 출처: 환경부 생활폐기물 분리배출 누리집, 서울시 표준 분리배출 기준(2025) 등 물품별로 표기.</p>
        </div>
      </section>

      {/* ============================================================ 04 HYPOTHESIS */}
      <section className="sec sec--gray" id="hypothesis" data-stop>
        <div className="wrap">
          <SectionHead no="04" kicker="Hypothesis & Test Design" title="배출 유형과 공식 근거를 주면, 쉽게 찾고 믿을 수 있을 것이라 가정했다." />

          <blockquote className="hypo">
            분리배출 유형을 확신하지 못하는 사용자에게 물품별 배출 방법과 공식 판단 근거를 간결하게 제공하면,
            별도의 복잡한 검색 없이 배출 방법을 확인하고 <mark>신뢰할 수 있을 것이다.</mark>
          </blockquote>
          <div className="hypo__parts">
            <p><span>대상</span>분리배출 방법을 확신하지 못하는 사용자</p>
            <p><span>해결 방식</span>배출 유형 + 간결한 설명 + 공식 출처</p>
            <p><span>기대 행동</span>정보를 쉽게 찾고, 안내를 신뢰하며 판단</p>
          </div>

          <div className="design">
            <div>
              <h3>판단 기준</h3>
              <ol className="crit">
                <li>실제로 헷갈리는가? <small>사용 전 세 물품 배출 예상</small></li>
                <li>원하는 정보를 쉽게 찾는가? <small>사용 후 탐색 경험</small></li>
                <li>안내를 신뢰할 수 있는가? <small>사용 후 신뢰 질문</small></li>
                <li>기존 방식과 무엇이 다른가? <small>GPT · 네이버와 비교</small></li>
              </ol>
              <p className="signal signal--yes"><b>지지 신호</b>사이트에서 배출 방법을 찾았다고 말하고, 출처를 신뢰의 이유로 언급</p>
              <p className="signal signal--no"><b>재검토 신호</b>정보를 못 찾았다고 하거나, 출처가 있어도 믿기 어렵다고 말함</p>
            </div>
            <div>
              <h3>검증 설계</h3>
              <dl className="spec">
                <dt>과업</dt><dd>햇반 용기 · 과일 포장망 · 뽁뽁이를 각각 어떻게 버려야 하는지 사이트에서 확인</dd>
                <dt>대상</dt><dd>20대 여성 3명 (05년생)<br />1차 A·B, 추가 C</dd>
                <dt>흐름</dt><dd>사용 전 예상·평소 습관 → 사이트 사용 → 탐색·신뢰·비교·개선점</dd>
              </dl>
            </div>
            <div>
              <h3>확인한 것</h3>
              <ul className="measure">
                <li className="y">사용 전 예상과 평소 행동 (진술)</li>
                <li className="y">사용 후 탐색 · 신뢰 평가 (진술)</li>
                <li className="y">GPT · 네이버 대비 인식</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ 05 REAL VOICE */}
      <section className="sec sec--dark" id="voice" data-stop>
        <div className="wrap">
          <SectionHead no="05" kicker="Real Voice · User Validation" title="세 사람 모두 판단이 어렵다고 했고, 출처가 있는 안내를 믿을 만하다고 했다." />

          <div className="voices">
            {[
              {
                who: '박0은', meta: '05년생 · 여성 · 1차 검증', init: 'A',
                before: ['잘 모르겠음. 보통 셋다 플라스틱에 그냥 버림', '그냥 감으로 버림. 경비원분들이 분리 도와주심.'],
                after: ['쉽게 찾을수잇엇어요 최곤디?', '근거자료 밑에 있는거 보니 … 근거자료 굳이확인안하고믿을듯 사이트에대한신뢰감?', '페이지들어가자마자 원하는 정보 > 어디에 버려야하는지 를 딱 강조해서 잘 보이게 되어있는점이 가장 좋은 것 같고 …'],
                insight: '출처 표시가 사이트 전체에 대한 신뢰로 확장',
              },
              {
                who: '장0정', meta: '05년생 · 여성 · 1차 검증', init: 'B',
                before: ['햇반용기: 재활용, 그티로폼 드물망: 재활용..?, 뽁뽁이: 재활용', 'Gpt, 인터넷 검색까지 하기엔 … 귀찮. 차라리 걍 일쓰에 다 넣어서 태워버리겟 단 생각.'],
                after: ['앜 과일망 틀렷다', '… gpt 보단 좀 더 이 사이트가 믿을만 할 듯 출처 보여서'],
                note: '과일 그물망은 공식 기준상 종량제봉투로, 사용 전 예상(재활용..?)과 다름. \'틀렸다\'는 사용자 본인의 인식.',
                insight: 'GPT의 편의와 별개로 출처 기반 신뢰에 긍정적',
              },
              {
                who: '김0영', meta: '05년생 · 여성 · 추가 검증', init: 'C',
                before: ['햇반은 플라스틱에 버리고, 그물망이랑 뽁뽁이는 일쓰에 버림.', '시간 많을 땐 검색하고 바쁠 땐 그냥 버려'],
                after: ['출처까지 줘서 믿을만 한 듯?', '다른 내용보다 어디에 버려야 하는지 바로 알려주는게 좋아.'],
                note: '공식 기준 대비: 과일 그물망(종량제봉투)은 일치, 뽁뽁이(비닐류)는 다름.',
                insight: '사용자 A와 같은 방향: 출처 신뢰 + 결과를 바로 보여주는 구성 선호',
              },
            ].map((v) => (
              <article key={v.who} className="voice">
                <header className="voice__who">
                  <span className="voice__init">{v.init}</span>
                  <div><b>{v.who}</b><small>{v.meta}</small></div>
                </header>
                <p className="voice__when">사용 전</p>
                {v.before.map((q) => <p key={q} className="voice__q voice__q--before">“{q}”</p>)}
                <p className="voice__when voice__when--after">사용 후</p>
                {v.after.map((q) => <p key={q} className="voice__q">“{q}”</p>)}
                {v.note && <p className="voice__note">{v.note}</p>}
                <p className="voice__insight">{v.insight}</p>
              </article>
            ))}
          </div>

          <div className="pattern">
            <p className="pattern__k">세 사람에게서 공통으로 보인 행동</p>
            <p className="pattern__t">세 사람 모두 확인 없이 <mark>"그냥 버리는"</mark> 경우가 있었다. B·C는 그 이유로 번거로움과 시간을 들었다.</p>
            <ul>
              <li><b>A</b> "그냥 감으로 버림"</li>
              <li><b>B</b> "검색까지 하기엔 … 귀찮. 차라리 걍 일쓰에"</li>
              <li><b>C</b> "시간 많을 땐 검색하고 바쁠 땐 그냥 버려"</li>
            </ul>
          </div>
          <p className="note note--dark">인용은 원문 그대로(맞춤법 포함)이며 '…'는 생략 표시.</p>
        </div>
      </section>

      {/* ============================================================ 06 COMPARE */}
      <section className="sec" id="compare" data-stop>
        <div className="wrap">
          <SectionHead no="06" kicker="Expected vs. Observed" title="탐색과 신뢰 가설은 정성적으로 지지됐다. 다만 GPT의 입력 편의라는 경쟁 요소를 발견했다." />

          <div className="cmp">
            <div className="cmp__head"><span>예상</span><span>실제 반응</span><span>판단</span></div>
            {[
              { k: '예상 1', e: '익숙한 물품이라도 배출 유형을 확신하지 못할 것이다', o: ['A: 세 물품 모두 "잘 모르겠음"', 'B: 과일 포장망 "재활용..?"', 'C: 뽁뽁이를 "일쓰에" (공식 기준: 비닐류)'], j: '지지', d: '문제 가설을 지지하는 정성적 반응' },
              { k: '예상 2', e: '배출 유형을 명확히 보여주면 필요한 정보를 쉽게 찾을 것이다', o: ['A: "쉽게 찾을수잇엇어요", 배출 유형 강조를 가장 좋은 점으로', 'B: 사이트 확인 후 기존 판단과 다른 결과를 인식', 'C: "어디에 버려야 하는지 바로 알려주는게 좋아"'], j: '지지', d: '탐색·가독성에 긍정적 (시간·성공률은 미측정)' },
              { k: '예상 3', e: '공식 근거를 제공하면 안내를 더 신뢰할 것이다', o: ['A: 근거자료를 보고 "사이트에 대한 신뢰감"', 'B: GPT보다 믿을 만한 이유로 "출처 보여서"', 'C: "출처까지 줘서 믿을만 한 듯?"'], j: '지지', d: '출처 기반 신뢰 가설을 지지하는 반응' },
              { k: '예상 밖', e: 'GPT는 여전히 강력한 대안이다', o: ['A: "지피티가 편하긴하죠… 사진 찍어서 이거 어떻게해? 라고 … 물어볼 수 있어서!!!"', 'B: "Gpt.내가 원하는 답변만 간결하게 보이니까"'], j: '추가 검증', d: '입력·접근 편의는 GPT가 강함 → 다음 라운드에서 검증', next: true },
            ].map((r) => (
              <div key={r.k} className={`cmp__row ${r.next ? 'is-next' : ''}`}>
                <div className="cmp__e"><b>{r.k}</b>{r.e}</div>
                <ul className="cmp__o">{r.o.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="cmp__j"><span className={`judge ${r.next ? 'judge--next' : ''}`}>{r.j}</span><p>{r.d}</p></div>
              </div>
            ))}
          </div>
          <p className="note">판단은 사용자 3명의 진술에 근거한 정성적 판단이며 통계적 검증이 아니다.</p>
        </div>
      </section>

      {/* ============================================================ 07 DECISION */}
      <section className="sec sec--gray" id="decision" data-stop>
        <div className="wrap">
          <SectionHead no="07" kicker="Decision & Next Step" title="가설을 바꾸지 않고 다른 사용자에게 다시 확인했다. 다음은 '실제로 이 서비스를 고르는가'를 검증한다.">
            과제 원칙: "예상대로였다면 다른 사용자·조건에서도 같은지 살펴봅니다." 1차 반응이 예상과 부합했기 때문에 전면 피봇 대신 추가 사용자로 일관성을 확인했다.
          </SectionHead>

          <ol className="steps">
            {[
              ['1차 검증', '사용자 A · B'],
              ['예상과 부합', '탐색 · 신뢰에 긍정 반응'],
              ['결정', '같은 가설로 추가 확인'],
              ['추가 검증', '사용자 C · 같은 방향의 반응'],
              ['가설 유지', '핵심 문제와 해결 방향 유지'],
            ].map(([t, s], i) => (
              <li key={t} className={i === 2 ? 'is-key' : i === 4 ? 'is-end' : ''}><b>{t}</b><span>{s}</span></li>
            ))}
          </ol>

          <div className="next">
            <div className="next__main">
              <p className="next__k">Round 2 핵심 질문</p>
              <p className="next__q">사용자는 실제로 분리배출이 헷갈리는 순간, <mark>GPT나 검색엔진 대신 이 서비스를 선택할 것인가?</mark></p>
              <p className="next__why">세 사람 모두 확인 없이 감이나 일반쓰레기로 처리하는 경우가 있었고, B·C는 그 이유로 번거로움과 시간을 들었다. 믿을 수 있는 것만으로는 부족하고, 고를 만큼 간편해야 한다.</p>
              <p className="next__label">검증 예정 항목 (이번 라운드에서는 검증하지 않음)</p>
              <ul className="next__list">
                <li>실제 사용 상황에서의 서비스 선택</li>
                <li>GPT 대비 과업 완료 시간</li>
                <li>검색되지 않는 물품을 만났을 때의 행동</li>
                <li>공식 출처가 사용 의향에 미치는 영향</li>
                <li>사진 입력 기능의 실제 필요성</li>
              </ul>
            </div>
            <aside className="next__side">
              <p className="next__label">보조 대응 · 검증 후 추가</p>
              <img src={asset('shots/photo-list.png')} alt="사진으로 물품 찾기 화면" />
              <p>메인에 '사진으로 물품 찾기' 추가. 미리 등록된 그림을 보고 고르는 목록으로, <b>AI 사진 인식이 아니며</b> 이번 검증의 성과로 보지 않는다. R2의 '사진 입력 필요성' 검증에서 비교 대상으로 쓴다.</p>
            </aside>
          </div>

          <p className="limits"><b>한계</b> 사용자 3명 · 정성 진술 중심. 결과를 시장 수요로 일반화하지 않는다.</p>
        </div>
      </section>

      {/* ============================================================ CLOSING */}
      <section className="close" data-stop>
        <div className="wrap close__grid">
          <div>
            <p className="close__k">Conclusion</p>
            <p className="close__t">신뢰의 가능성은 확인했다.<br />다음 과제는 <mark>고를 만큼 간편한 경험</mark>이다.</p>
            <p className="close__s">분리배출 정보의 정확한 전달과 신뢰성에 대한 초기 가능성을 확인했다. 다음 라운드에서는 사용자가 실제 생활에서 이 서비스를 선택하는지 확인한다.</p>
            <a className="btn btn--light" href={PRODUCT_URL} target="_blank" rel="noreferrer">어디에 버리지? 열기 ↗</a>
          </div>
          <a className="close__qr" href={PRODUCT_URL} target="_blank" rel="noreferrer">
            <img src={asset('qr-product.svg')} alt="프로덕트 QR 코드" />
            <span>jurnjihyun-spec.github.io/where-to-throw</span>
          </a>
        </div>
        <p className="close__foot wrap">AIP02 Round 1 · 전지현 · ↓/→ 다음 섹션 · ↑/← 이전 섹션 · F 전체화면</p>
      </section>
    </>
  );
}
