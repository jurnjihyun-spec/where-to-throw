// 물품 대표 아이콘 — 직접 제작한 단순 선형 SVG (외부 이미지·저작권 자료 사용 안 함)
// 새 아이콘은 24×24 기준, 선 굵기 1.6으로 추가해주세요.

const P = {
  rice: (
    <>
      <path d="M4 10h16l-1.5 8a2 2 0 0 1-2 1.6H7.5a2 2 0 0 1-2-1.6z" />
      <path d="M3 10h18M7 7.5h10" />
      <path d="M9 14h.01M12 15h.01M15 14h.01" strokeWidth="2.2" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 2.5h4v2.5l1.5 2.5V20a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 20V7.5L10 5z" />
      <path d="M8.5 11h7M8.5 15h7" />
    </>
  ),
  tray: (
    <>
      <path d="M3.5 9h17l-1.6 9.2a1.5 1.5 0 0 1-1.5 1.3H6.6a1.5 1.5 0 0 1-1.5-1.3z" />
      <path d="M3 9c0-1.4 1-2.5 2.5-2.5h13C20 6.5 21 7.6 21 9" />
    </>
  ),
  squeeze: (
    <>
      <path d="M11 2.5h2l1 3h-4z" />
      <path d="M8 7.5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2V19a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 8 19z" />
      <path d="M8 11h8" />
    </>
  ),
  jar: (
    <>
      <rect x="6" y="4" width="12" height="4" rx="1" />
      <path d="M5.5 8h13v10.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2z" />
    </>
  ),
  pump: (
    <>
      <path d="M9 3h6M12 3v4M15 3h2.5" />
      <rect x="10" y="7" width="4" height="2.5" />
      <path d="M7 9.5h10V20a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20z" />
    </>
  ),
  tube: (
    <>
      <path d="M6 3.5h12l-2 13.5H8z" />
      <path d="M6 3.5h12M10 17h4v2.5h-4z" />
      <path d="M8 7h8" />
    </>
  ),
  foam: (
    <>
      <path d="M3 8l9-4 9 4v9l-9 4-9-4z" />
      <path d="M3 8l9 4 9-4M12 12v9" />
    </>
  ),
  net: (
    <>
      <ellipse cx="12" cy="12" rx="8" ry="7.5" />
      <path d="M5 8.5c4.5 2.5 9.5 2.5 14 0M4.2 13c5 2.6 10.6 2.6 15.6 0M8.5 5.5c-1.5 4.5-1.5 9 0 13M15.5 5.5c1.5 4.5 1.5 9 0 13M12 4.5v15" />
    </>
  ),
  noodle: (
    <>
      <path d="M5 8h14l-2 12.5H7z" />
      <path d="M4 8h16" />
      <path d="M9 5.5c0-1 1-1 1-2M12 5.5c0-1 1-1 1-2M15 5.5c0-1 1-1 1-2" />
    </>
  ),
  straw: (
    <>
      <path d="M14 3.5h3.5M14 3.5l-3 6" />
      <path d="M6.5 9.5h11l-1.5 11h-8z" />
    </>
  ),
  spoon: (
    <>
      <ellipse cx="8.5" cy="7" rx="3" ry="4" />
      <path d="M8.5 11v9.5" />
      <path d="M15 3v5a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3M17 10v10.5M17 3v4" />
    </>
  ),
  bubble: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.8" />
      <circle cx="15.5" cy="8.5" r="1.8" />
      <circle cx="8.5" cy="15.5" r="1.8" />
      <circle cx="15.5" cy="15.5" r="1.8" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12.5H6z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  wrap: (
    <>
      <rect x="3" y="6" width="15" height="6" rx="1.2" />
      <path d="M18 7.5h2.5v3H18" />
      <path d="M6 12v7.5l3-1.5 3 1.5 3-1.5V12" />
    </>
  ),
  cup: (
    <>
      <path d="M5.5 5h13l-1.6 15a1.5 1.5 0 0 1-1.5 1.3H8.6a1.5 1.5 0 0 1-1.5-1.3z" />
      <path d="M6.2 10h11.6" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z" />
      <path d="M9 8h6M9 11.5h6M9 15h3" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 8L12 4l8.5 4v9L12 21l-8.5-4z" />
      <path d="M3.5 8L12 12l8.5-4M12 12v9M7.7 6l8.5 4" />
    </>
  ),
  carton: (
    <>
      <path d="M8 2.5h8v3l2.5 4v11h-13v-11L8 5.5z" />
      <path d="M5.5 9.5h13M8 5.5l2.5 4" />
    </>
  ),
  pizza: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M8 9l8 0-4 7z" />
    </>
  ),
  sheet: (
    <>
      <path d="M6 3h8.5L19 7.5V21H6z" />
      <path d="M14.5 3v4.5H19" />
      <path d="M9 15l2-2 3 3M14 11.5h.01" strokeWidth="1.8" />
    </>
  ),
  package: (
    <>
      <rect x="5" y="6" width="14" height="15" rx="1" />
      <path d="M5 10h14M9 6V3.5h6V6" />
      <path d="M8 14h8" />
    </>
  ),
  cooler: (
    <>
      <rect x="3.5" y="6" width="17" height="14" rx="2" />
      <path d="M3.5 10h17M9 6V4h6v2" />
      <path d="M12 12.5v5M9.8 13.7l4.4 2.6M14.2 13.7l-4.4 2.6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5c2.5-1 5.5-1 8 .5 2.5-1.5 5.5-1.5 8-.5v14c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5z" />
      <path d="M12 5.5v14" />
    </>
  ),
  'glass-bottle': (
    <>
      <path d="M10.5 2.5h3v5c2 .8 3 2.3 3 4.5v8a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-8c0-2.2 1-3.7 3-4.5z" />
      <path d="M7.5 14h9" />
    </>
  ),
  shard: (
    <>
      <path d="M4 20l3-12 4 3 2-7 7 16z" />
      <path d="M11 11l1 9" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 10h18a9 9 0 0 1-18 0z" />
      <path d="M12 10l-1.5 3 2 2-1 3.5" />
    </>
  ),
  can: (
    <>
      <ellipse cx="12" cy="5" rx="5.5" ry="2" />
      <path d="M6.5 5v14c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V5" />
      <path d="M6.5 9c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" />
    </>
  ),
  spray: (
    <>
      <rect x="7" y="8" width="9" height="13" rx="1.5" />
      <path d="M9 8V5.5h5V8M14 4h2" />
      <path d="M18.5 3.5h.01M20 5h.01M18.5 6.5h.01" strokeWidth="2.2" />
    </>
  ),
  foil: (
    <>
      <rect x="3" y="8" width="18" height="6" rx="1.2" />
      <path d="M5 14l1 4 3-1.5 3 2 3-1.5 3 1 1-4" />
    </>
  ),
  brush: (
    <>
      <path d="M4 20L15 9" />
      <path d="M14 10l3-3" strokeWidth="4" />
      <path d="M15.5 4.5v2M18 4v2M20 5.5v2" />
    </>
  ),
  icepack: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M7 12c1.2-1.2 2.3-1.2 3.5 0s2.3 1.2 3.5 0 2.3-1.2 3.5 0" />
    </>
  ),
  wipes: (
    <>
      <rect x="3.5" y="9" width="17" height="10" rx="2" />
      <path d="M9 9c0-2.5 1.5-4.5 3-4.5S15 6.5 15 9" />
    </>
  ),
  glove: (
    <>
      <path d="M8 21v-4L5.5 13V7.5a1.2 1.2 0 0 1 2.4 0V11V5a1.2 1.2 0 0 1 2.4 0v6V4a1.2 1.2 0 0 1 2.4 0v7V5.5a1.2 1.2 0 0 1 2.4 0V14l1.4-2a1.3 1.3 0 0 1 2 1.6L16 18v3" />
    </>
  ),
  chopsticks: (
    <>
      <path d="M8 3l2 18M16 3l-2 18" />
    </>
  ),
  umbrella: (
    <>
      <path d="M3 12a9 9 0 0 1 18 0z" />
      <path d="M12 12v7a2 2 0 0 1-4 0M12 3v-.5" />
    </>
  ),
  blister: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <circle cx="15" cy="9" r="2" />
      <circle cx="9" cy="15" r="2" />
      <path d="M13.5 13.5l3 3" />
    </>
  ),
  pill: (
    <>
      <rect x="2.8" y="8.5" width="18.4" height="7" rx="3.5" transform="rotate(-40 12 12)" />
      <path d="M9.7 9.3l5 4.3" />
    </>
  ),
  capsule: (
    <>
      <path d="M4 8h16" />
      <path d="M5.5 8l2 10.5h9L18.5 8" />
      <path d="M8.5 5h7" />
    </>
  ),
  battery: (
    <>
      <rect x="7" y="5" width="10" height="16" rx="1.5" />
      <path d="M10 3h4v2" />
      <path d="M12 10v4M10 12h4" />
    </>
  ),
  lamp: (
    <>
      <rect x="2.5" y="10" width="19" height="4" rx="2" />
      <path d="M5 8v2M19 8v2M5 14v2M19 14v2" />
    </>
  ),
  bone: (
    <>
      <path d="M8 8.5l7.5 7.5" strokeWidth="2.6" />
      <circle cx="6.2" cy="8.5" r="2" />
      <circle cx="8.5" cy="6.2" r="2" />
      <circle cx="15.5" cy="17.8" r="2" />
      <circle cx="17.8" cy="15.5" r="2" />
    </>
  ),
};

export default function Icon({ name, size = 28, className = '' }) {
  const shape = P[name] || P.box;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shape}
    </svg>
  );
}
