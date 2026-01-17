import { Chapter } from "./components/Chapter";
import { TextSection, ImageSection } from "./components/Sections";
import { IndexSection } from "./components/IndexSection";
import { chapters } from "./data/chapters";

function App() {
  const renderSection = (section, idx) => {
    switch (section.type) {
      case "index":
        return <IndexSection key={idx} />;
      case "text":
        return (
          <TextSection
            key={idx}
            content={section.content}
            isLongForm={section.isLongForm}
          />
        );
      case "image":
        return (
          <ImageSection key={idx} src={section.src} caption={section.caption} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <main className="story-content">
        {chapters.map((chapter) => (
          <Chapter
            key={chapter.id}
            id={chapter.id}
            name={chapter.name}
            bgColor={chapter.bgColor}
          >
            {chapter.sections.map(renderSection)}
          </Chapter>
        ))}
      </main>
    </div>
  );
}

export default App;
