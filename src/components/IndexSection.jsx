import { chapters, BACKGROUNDS } from "../data/chapters";
import { SectionWrapper } from "./Sections";

export function IndexSection({ bgColor = BACKGROUNDS.dustyRose, onNavigate }) {
  const handleNavigate = (e, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      // Fallback to simple scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const contentChapters = chapters.filter(
    (ch) =>
      ch.id !== "mission" &&
      ch.id !== "index" &&
      ch.id !== "ending" &&
      ch.id !== "the-mission",
  );

  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex items-center justify-center px-8 md:px-8 xl:px-16"
    >
      <div className="w-full md:w-[83%] lg:w-[63%] flex flex-col items-start text-left">
        <h2 className="text-xl md:text-[28px] md:leading-9 mb-8 md:mb-12 font-bold italic">
          Index
        </h2>

        <nav className="flex flex-col">
          {contentChapters.map((chapter, idx) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              onClick={(e) => handleNavigate(e, chapter.id)}
              className="text-[17px] leading-[26.5px] md:text-2xl md:leading-9 mb-4 md:mb-8 last:mb-0 border-b-2 border-transparent hover:border-current transition-colors duration-300 ease-in-out"
            >
              {idx + 1}. {chapter.name}
            </a>
          ))}
        </nav>
      </div>
    </SectionWrapper>
  );
}
