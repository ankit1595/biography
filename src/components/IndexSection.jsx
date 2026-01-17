import { chapters, BACKGROUNDS } from "../data/chapters";
import { SectionWrapper } from "./Sections";

export function IndexSection({ bgColor = BACKGROUNDS.dustyRose }) {
  const handleNavigate = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contentChapters = chapters.filter(
    (ch) =>
      ch.id !== "mission" &&
      ch.id !== "index" &&
      ch.id !== "ending" &&
      ch.id !== "the-mission"
  );

  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex items-center px-8 md:px-20"
    >
      <div className="max-w-xl">
        <h2 className="text-2xl italic mb-8">Index</h2>

        <nav className="space-y-4">
          {contentChapters.map((chapter, idx) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              onClick={(e) => handleNavigate(e, chapter.id)}
              className="block text-lg hover:opacity-70 transition-opacity"
            >
              {idx + 1}. {chapter.name}
            </a>
          ))}
        </nav>
      </div>
    </SectionWrapper>
  );
}
