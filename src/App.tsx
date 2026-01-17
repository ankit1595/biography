import {
  ChapterHeader,
  TextSection,
  GallerySection,
} from "./components/Sections";
import { IndexSection } from "./components/IndexSection";
import { chapters } from "./data/chapters";

function App() {
  const renderSection = (section, idx) => {
    switch (section.type) {
      case "index":
        return <IndexSection key={idx} bgColor={section.bgColor} />;
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
      <main className="story-content">
        {chapters.map((chapter) =>
          chapter.sections.map((section, idx) => (
            <div
              key={`${chapter.id}-${idx}`}
              id={idx === 0 ? chapter.id : undefined}
            >
              {renderSection(section, idx)}
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
