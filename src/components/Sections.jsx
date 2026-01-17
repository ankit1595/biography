export function TextSection({ content, isLongForm = false }) {
  if (isLongForm) {
    return (
      <>
        <section className="py-20 px-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
        </section>
        <div className="h-px snap-end snap-always"></div>
      </>
    );
  }

  return (
    <section className="h-screen flex items-center py-20 px-8">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </section>
  );
}

export function ImageSection({ src, caption }) {
  return (
    <section className="h-screen relative">
      <img
        src={src}
        alt={caption || "Story image"}
        className="w-full h-full object-cover"
      />
      {caption && (
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-20">
          <p className="text-white text-xl md:text-2xl font-light px-8 text-center">
            {caption}
          </p>
        </div>
      )}
    </section>
  );
}
