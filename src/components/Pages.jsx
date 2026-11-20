import { CATEGORIES, DISPOSAL_TYPES } from '../data/categories.js';
import { SOURCES } from '../data/sources.js';
import { getItemsByCategory, getPopularItems, searchItems } from '../lib/search.js';
import { paths } from '../lib/router.js';
import SearchBar from './SearchBar.jsx';

function Chevron() {
  return (
    <svg className="chev" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function itemTypeLabel(item) {
  if (item.question) return '상태에 따라 달라요';
  return DISPOSAL_TYPES[item.result.type]?.label;
}

function ItemList({ items }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <a className="item-row" href={paths.item(item.id)}>
            <span className="item-row__text">
              <span className="item-row__name">{item.name}</span>
              <span className="item-row__type">{itemTypeLabel(item)}</span>
            </span>
            <Chevron />
          </a>
        </li>
      ))}
    </ul>
  );
}

function CategoryGrid() {
  return (
    <div className="cat-grid">
      {CATEGORIES.map((c) => (
        <a key={c.id} className="cat-card" href={paths.category(c.id)}>
          <span className="cat-card__name">{c.name}</span>
          <span className="cat-card__desc">{c.desc}</span>
        </a>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------ 메인
export function HomePage() {
  const popular = getPopularItems();
  return (
    <>
      <section className="hero">
        <h1 className="hero__title">이거 어디에 버리지?</h1>
        <p className="hero__sub">헷갈리는 쓰레기, 쉽고 빠르게 확인하세요.</p>
        <SearchBar />
      </section>

      <section className="section">
        <h2 className="section__title">자주 찾는 물품</h2>
        <div className="chips">
          {popular.map((item) => (
            <a key={item.id} className="chip" href={paths.item(item.id)}>{item.name}</a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">카테고리로 찾기</h2>
        <CategoryGrid />
      </section>
    </>
  );
}

// ------------------------------------------------------------------ 검색 결과
export function SearchPage({ query }) {
  const results = searchItems(query);
  return (
    <>
      <div className="page-top">
        <SearchBar key={query} initialValue={query} compact />
      </div>
      <section className="section">
        <h2 className="section__title">
          ‘{query}’ 검색 결과 <span className="count">{results.length}</span>
        </h2>
        {results.length > 0 ? (
          <ItemList items={results} />
        ) : (
          <div className="empty">
            <p className="empty__title">아직 등록되지 않은 물품이에요.</p>
            <p className="empty__desc">
              다른 이름으로 검색하거나 카테고리에서 찾아보세요. 등록되지 않은 물품은 거주 지역 구청·주민센터
              또는 환경부 「내 손안의 분리배출」 앱에서 확인할 수 있어요.
            </p>
          </div>
        )}
      </section>
      <section className="section">
        <h2 className="section__title">카테고리로 찾기</h2>
        <CategoryGrid />
      </section>
    </>
  );
}

// ------------------------------------------------------------------ 카테고리
export function CategoryPage({ categoryId }) {
  const current = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const items = getItemsByCategory(current.id);
  return (
    <>
      <div className="page-top">
        <SearchBar compact />
      </div>
      <nav className="tabs" aria-label="카테고리">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={paths.category(c.id)}
            className={`tab ${c.id === current.id ? 'is-active' : ''}`}
            aria-current={c.id === current.id ? 'page' : undefined}
          >
            {c.name}
          </a>
        ))}
      </nav>
      <section className="section">
        <h2 className="section__title">
          {current.name} <span className="count">{items.length}</span>
        </h2>
        <ItemList items={items} />
      </section>
    </>
  );
}

// ------------------------------------------------------------------ 물품 (질문 / 결과)
function NeedsCheck({ children }) {
  return (
    <div className="needs-check" role="note">
      <span className="needs-check__badge">확인 필요</span>
      <p>{children}</p>
    </div>
  );
}

function Sources({ ids }) {
  return (
    <ul className="sources">
      {ids.map((id) => {
        const s = SOURCES[id];
        if (!s) return null;
        return (
          <li key={id}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
            ) : (
              <span>{s.title}</span>
            )}
            <span className="sources__pub">{s.publisher}</span>
          </li>
        );
      })}
    </ul>
  );
}

function QuestionView({ item }) {
  return (
    <section className="card question">
      <p className="question__eyebrow">{item.name}</p>
      <h1 className="question__title">{item.question.text}</h1>
      <div className="options">
        {item.question.options.map((opt, i) => (
          <a key={opt.label} className="option" href={paths.item(item.id, i)}>
            <span className="option__text">
              <span className="option__label">{opt.label}</span>
              {opt.hint && <span className="option__hint">{opt.hint}</span>}
            </span>
            <Chevron />
          </a>
        ))}
      </div>
    </section>
  );
}

function ResultView({ item, result, option }) {
  const type = DISPOSAL_TYPES[result.type] || { label: '확인 필요', tone: 'amber' };
  const cautions = [...(result.cautions || []), ...(item.cautions || [])];

  return (
    <>
      <section className={`card result tone-${type.tone}`}>
        <p className="result__name">{item.name}</p>
        {option && <p className="result__state">선택한 상태 · {option.label}</p>}
        <p className="result__label">배출 방법</p>
        <p className="result__type">{type.label}</p>
      </section>

      {(item.verification === 'needs-check' || result.needsCheck) && (
        <NeedsCheck>
          {result.needsCheck ||
            '이 물품의 안내는 공식 자료 원문과 직접 대조하지 못했습니다. 배출 전 거주 지역 기준을 꼭 확인해주세요.'}
        </NeedsCheck>
      )}

      <section className="card">
        <h2 className="card__title">이렇게 버려주세요</h2>
        <ol className="steps">
          {result.steps.map((step, i) => (
            <li key={i}>
              <span className="steps__num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {cautions.length > 0 && (
        <section className="card">
          <h2 className="card__title">주의사항</h2>
          <ul className="cautions">
            {cautions.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
      )}

      <section className="card card--muted">
        <h2 className="card__title">참고한 공식 자료</h2>
        <Sources ids={item.sources} />
        <p className="local-note">
          분리배출 기준은 지자체마다 다를 수 있어요. 정확한 배출 요일·장소는 거주 지역 구청이나 주민센터 안내를 확인해주세요.
        </p>
      </section>

      <div className="actions">
        {option && (
          <a className="btn btn--ghost" href={paths.item(item.id)}>상태 다시 선택하기</a>
        )}
        <a className="btn btn--primary" href={paths.home()}>다른 물품 검색하기</a>
      </div>
    </>
  );
}

export function ItemPage({ item, optionIndex }) {
  if (!item) return <NotFound />;

  if (item.question) {
    const option = item.question.options[optionIndex];
    if (!option) return <QuestionView item={item} />;
    return <ResultView item={item} result={option.result} option={option} />;
  }
  return <ResultView item={item} result={item.result} />;
}

export function NotFound() {
  return (
    <div className="empty">
      <p className="empty__title">페이지를 찾을 수 없어요.</p>
      <a className="btn btn--primary" href={paths.home()}>처음으로</a>
    </div>
  );
}
