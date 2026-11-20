import { useRoute, paths } from './lib/router.js';
import { getItem } from './lib/search.js';
import { CategoryPage, HomePage, ItemPage, NotFound, SearchPage } from './components/Pages.jsx';

function Header({ isHome }) {
  return (
    <header className="header">
      <div className="container header__inner">
        {!isHome && (
          <button type="button" className="header__back" aria-label="뒤로 가기" onClick={() => (window.history.length > 1 ? window.history.back() : (window.location.hash = paths.home()))}>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <a className="brand" href={paths.home()}>
          <span className="brand__mark" aria-hidden="true" />
          어디에 버리지?
        </a>
      </div>
    </header>
  );
}

export default function App() {
  const { parts, params } = useRoute();
  const [section, a, b] = parts;

  let page;
  if (!section) page = <HomePage />;
  else if (section === 'search') page = <SearchPage query={params.get('q') || ''} />;
  else if (section === 'category') page = <CategoryPage categoryId={a} />;
  else if (section === 'item') page = <ItemPage item={getItem(a)} optionIndex={b === undefined ? undefined : Number(b)} />;
  else page = <NotFound />;

  return (
    <div className="app">
      <Header isHome={!section} />
      <main className="container main">{page}</main>
      <footer className="footer">
        <div className="container">
          <p>분리배출 기준은 지자체마다 다를 수 있습니다. 거주 지역의 안내를 함께 확인해주세요.</p>
          <p>환경부 및 지자체 공식 자료를 참고해 작성했으며, 확인되지 않은 정보는 ‘확인 필요’로 표시했습니다.</p>
        </div>
      </footer>
    </div>
  );
}
