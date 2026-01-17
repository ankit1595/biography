import { chapters } from "../data/chapters";

export function IndexSection() {
  const handleNavigate = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const contentChapters = chapters.filter(
    (ch) => ch.id !== "mission" && ch.id !== "index" && ch.id !== "ending"
  );

  return (
    <section className="h-screen flex items-center justify-center px-8">
      <div className="max-w-[400px] w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Chapters</h2>

        <nav className="space-y-4">
          {contentChapters.map((chapter, idx) => (
            <div key={chapter.id} className="flex items-baseline gap-4">
              <span className="text-xs opacity-40 font-mono">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${chapter.id}`}
                onClick={(e) => handleNavigate(e, chapter.id)}
                className="text-xl text-inherit no-underline transition-opacity duration-200 hover:opacity-70"
              >
                {chapter.name}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
