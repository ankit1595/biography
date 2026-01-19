import {
  ChapterHeader,
  TextSection,
  GallerySection,
} from "./components/Sections";
import { IndexSection } from "./components/IndexSection";
import { ScrubScroller } from "./components/ScrubScroller";
import { MobileNav } from "./components/MobileNav";
import { chapters } from "./data/chapters";
import { useScroll } from "./hooks/useScroll";

function App() {
  const { state, actions } = useScroll();
  const { progress, positions, currentChapter, isZoomedOut } = state;
  const {
    navigateTo,
    scrollToPercent,
    toggleZoom,
    startScrubbing,
    endScrubbing,
  } = actions;

  const renderSection = (section: any, idx: number) => {
    switch (section.type) {
      case "index":
        return (
          <IndexSection
            key={idx}
            bgColor={section.bgColor}
            onNavigate={navigateTo}
          />
        );
      case "header":
        return (
          <ChapterHeader
            key={idx}
            title={section.title}
            subtitle={section.subtitle}
            bgColor={section.bgColor}
          />
        );
      case "text":
        return (
          <TextSection
            key={idx}
            content={section.content}
            isLongForm={section.isLongForm}
            bgColor={section.bgColor}
          />
        );
      case "gallery":
        return (
          <GallerySection
            key={idx}
            images={section.images}
            bgColor={section.bgColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {/* Mobile navigation bar - only visible on mobile */}
      <MobileNav
        currentChapter={currentChapter}
        isZoomedOut={isZoomedOut}
        onToggleZoom={toggleZoom}
      />

      {/* ScrubScroller receives all state and actions from context */}
      <ScrubScroller
        progress={progress}
        positions={positions}
        currentChapter={currentChapter}
        onScrollToPercent={scrollToPercent}
        onZoomOut={toggleZoom}
        onStartScrubbing={startScrubbing}
        onEndScrubbing={endScrubbing}
        isZoomedOut={isZoomedOut}
      />

      <main className="biography-content">
        {chapters.map((chapter) =>
          chapter.sections.map((section, idx) => (
            <div
              key={`${chapter.id}-${idx}`}
              id={idx === 0 ? chapter.id : section.id}
            >
              {renderSection(section, idx)}
            </div>
          )),
        )}
      </main>
    </div>
  );
}

export default App;
