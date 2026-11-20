import { useId, useMemo, useRef, useState } from 'react';
import { searchItems } from '../lib/search.js';
import { navigate, paths } from '../lib/router.js';
import { DISPOSAL_TYPES } from '../data/categories.js';

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 물품의 대표 배출 유형 (질문형이면 '상태에 따라 달라요')
function previewType(item) {
  if (item.question) return '상태에 따라 달라요';
  return DISPOSAL_TYPES[item.result.type]?.label;
}

export default function SearchBar({ initialValue = '', autoFocus = false, compact = false }) {
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const inputRef = useRef(null);

  const suggestions = useMemo(() => searchItems(value, 6), [value]);
  const showList = open && value.trim() && suggestions.length > 0;

  const submit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    if (active >= 0 && suggestions[active]) {
      navigate(paths.item(suggestions[active].id));
    } else {
      navigate(paths.search(q));
    }
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <form className={`search ${compact ? 'search--compact' : ''}`} onSubmit={submit} role="search">
      <div className="search__field">
        <span className="search__icon"><SearchIcon /></span>
        <input
          ref={inputRef}
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="예: 종이컵, 영수증, 배달 용기"
          aria-label="물품 검색"
          role="combobox"
          aria-expanded={Boolean(showList)}
          aria-controls={listId}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
        />
        {value && (
          <button
            type="button"
            className="search__clear"
            aria-label="검색어 지우기"
            onClick={() => {
              setValue('');
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
        <button type="submit" className="search__submit">검색</button>
      </div>

      {showList && (
        <ul className="suggest" id={listId} role="listbox">
          {suggestions.map((item, i) => (
            <li key={item.id} role="option" aria-selected={i === active}>
              <a
                href={paths.item(item.id)}
                className={`suggest__item ${i === active ? 'is-active' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setOpen(false)}
              >
                <span className="suggest__name">{item.name}</span>
                <span className="suggest__type">{previewType(item)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
