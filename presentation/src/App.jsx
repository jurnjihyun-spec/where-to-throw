import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PRODUCT_URL, SLIDES } from './slides.jsx';

const W = 1280;
const H = 720;

function readIndex() {
  const n = parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isFinite(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0;
}

// 장표(1280×720)를 화면 크기에 맞게 비율 유지하며 축소·확대
function useFitScale(ref) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / W, r.height / H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

export default function App() {
  const [index, setIndex] = useState(readIndex);
  const [notes, setNotes] = useState(false);
  const [full, setFull] = useState(false);
  const stageRef = useRef(null);
  const scale = useFitScale(stageRef);

  const go = useCallback((i) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, i));
    setIndex(next);
    window.history.replaceState(null, '', `#${next + 1}`);
  }, []);

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(index + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(index - 1); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(SLIDES.length - 1);
      else if (e.key === 'f' || e.key === 'F') toggleFull();
      else if (e.key === 'n' || e.key === 'N') setNotes((v) => !v);
    };
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    const onHash = () => setIndex(readIndex());
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
      window.removeEventListener('hashchange', onHash);
    };
  }, [index, go, toggleFull]);

  const { Comp, notes: slideNotes, time } = SLIDES[index];

  return (
    <div className={`app ${full ? 'is-full' : ''} ${notes ? 'has-notes' : ''}`}>
      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__dot" />
          AIP02 Round 1 <span className="topbar__sub">· 어디에 버리지? · 전지현</span>
        </div>
        <nav className="topbar__nav" aria-label="장표 목록">
          {SLIDES.map((s, i) => (
            <button key={s.id} type="button" className={`tab ${i === index ? 'is-on' : ''} ${i < index ? 'is-done' : ''}`} onClick={() => go(i)}>
              <span>{String(i + 1).padStart(2, '0')}</span>{s.label}
            </button>
          ))}
        </nav>
        <a className="topbar__demo" href={PRODUCT_URL} target="_blank" rel="noreferrer">프로덕트 시연 ↗</a>
      </header>

      <main className="stage" ref={stageRef}>
        <div className="canvas" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})` }}>
          <Comp key={index} />
          <span className="canvas__page">{index + 1} / {SLIDES.length}</span>
        </div>
      </main>

      {notes && (
        <aside className="notes" aria-label="발표자 노트">
          <p className="notes__k">발표자 노트 · {SLIDES[index].label} <span>약 {time}</span></p>
          <ul>{slideNotes.map((n) => <li key={n}>{n}</li>)}</ul>
        </aside>
      )}

      <footer className="controls">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="이전 장표">←</button>
        <div className="progress" aria-hidden="true"><span style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }} /></div>
        <span className="controls__page">{index + 1} / {SLIDES.length}</span>
        <button type="button" onClick={() => go(index + 1)} disabled={index === SLIDES.length - 1} aria-label="다음 장표">→</button>
        <button type="button" className="controls__txt" onClick={() => setNotes((v) => !v)} aria-pressed={notes}>노트 (N)</button>
        <button type="button" className="controls__txt" onClick={toggleFull}>{full ? '전체화면 종료' : '전체화면 (F)'}</button>
      </footer>
    </div>
  );
}
