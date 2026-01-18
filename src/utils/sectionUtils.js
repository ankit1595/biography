// Find the section closest to viewport center
export function getProminentSection() {
  const sections = document.querySelectorAll(".biography-content > div[id]");
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;

  let closestSection = null;
  let minDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const sectionCenter = (rect.top + rect.bottom) / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestSection = section;
    }
  });

  return closestSection;
}
