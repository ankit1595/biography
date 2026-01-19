import { BACKGROUNDS } from "../data/chapters";

const SECTION_DEFAULTS = {
  header: BACKGROUNDS.dustyRose,
  text: BACKGROUNDS.lightGray,
  gallery: BACKGROUNDS.black,
  index: BACKGROUNDS.dustyRose,
};

const isDarkBackground = (color) => {
  if (color === BACKGROUNDS.lightGray) return false;
  return true;
};

export function SectionWrapper({
  bgColor = BACKGROUNDS.lightGray,
  className = "",
  children,
}) {
  const textColor = isDarkBackground(bgColor) ? "#f5f5f4" : "#1c1917";
  return (
    <section
      className={className}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </section>
  );
}

export function ChapterHeader({
  title,
  subtitle,
  bgColor = SECTION_DEFAULTS.header,
}) {
  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex items-center justify-center px-8"
    >
      <div className="content-container text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl italic opacity-80">{subtitle}</p>
        )}
      </div>
    </SectionWrapper>
  );
}

export function TextSection({
  content,
  isLongForm = false,
  bgColor = SECTION_DEFAULTS.text,
}) {
  if (isLongForm) {
    return (
      <>
        <SectionWrapper bgColor={bgColor} className="py-20 px-8">
          <div className="content-container">
            <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
        </SectionWrapper>
        <div className="h-px snap-end snap-always"></div>
      </>
    );
  }

  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex items-center py-20 px-8"
    >
      <div className="content-container">
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </SectionWrapper>
  );
}

export function GallerySection({
  images = [],
  bgColor = SECTION_DEFAULTS.gallery,
}) {
  const count = images.length;

  const gridClass =
    {
      1: "grid-cols-1 max-w-2xl",
      2: "grid-cols-2 max-w-4xl gap-4",
      3: "grid-cols-3 max-w-5xl gap-4",
      4: "grid-cols-2 max-w-4xl gap-4",
    }[count] || "grid-cols-1 max-w-2xl";

  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex flex-col items-center justify-center px-8 py-12"
    >
      <div className={`grid ${gridClass} mx-auto`}>
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={img.src}
              alt={img.caption || `Image ${idx + 1}`}
              loading="lazy"
              className="w-full h-auto object-contain rounded"
            />
          </div>
        ))}
      </div>
      {images[0]?.caption && (
        <p className="mt-6 text-lg italic opacity-80 text-center max-w-2xl">
          {images[0].caption}
        </p>
      )}
    </SectionWrapper>
  );
}

export function SubSection({
  title,
  content,
  bgColor = SECTION_DEFAULTS.text,
}) {
  return (
    <SectionWrapper bgColor={bgColor} className="py-16 px-8">
      <div className="content-container">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 leading-tight">
          {title}
        </h3>
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </SectionWrapper>
  );
}


export function QuoteSection({
  quote,
  translation,
  attribution,
  bgColor = SECTION_DEFAULTS.header,
}) {
  return (
    <SectionWrapper
      bgColor={bgColor}
      className="h-screen flex items-center justify-center px-8"
    >
      <div className="content-container text-center max-w-3xl mx-auto">
        <blockquote className="text-xl md:text-2xl italic leading-relaxed whitespace-pre-line mb-6">
          "{quote}"
        </blockquote>
        {translation && (
          <p className="text-base md:text-lg opacity-70 italic mb-4 whitespace-pre-line">
            {translation}
          </p>
        )}
        {attribution && (
          <cite className="text-base md:text-lg opacity-60 block">
            — {attribution}
          </cite>
        )}
      </div>
    </SectionWrapper>
  );
}
