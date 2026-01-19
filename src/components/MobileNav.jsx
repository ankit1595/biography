export function MobileNav({ currentChapter, isZoomedOut, onToggleZoom }) {
  const chapterName = currentChapter?.shortName || currentChapter?.name || "Biography";

  return (
    <nav className={`mobile-nav ${isZoomedOut ? "is-zoomed-out" : ""}`}>
      <h1 className="mobile-nav-title">{chapterName}</h1>

      <button
        className="mobile-nav-menu-btn"
        onClick={onToggleZoom}
        aria-label={isZoomedOut ? "Close navigation" : "Open navigation"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </nav>
  );
}
