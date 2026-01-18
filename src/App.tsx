import {
  ChapterHeader,
  TextSection,
  GallerySection,
} from "./components/Sections";
import { IndexSection } from "./components/IndexSection";
import { ZoomToggleButton, GoToTopButton } from "./components/FloatingButtons";
import { chapters } from "./data/chapters";
import { useZoomNavigation } from "./hooks/useZoomNavigation";

function App() {
  const { navigateTo, toggleZoom } = useZoomNavigation();

  const renderSection = (section, idx) => {
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
      <ZoomToggleButton onClick={toggleZoom} />
      <GoToTopButton onClick={() => navigateTo("index")} />

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
