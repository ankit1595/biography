import { BACKGROUNDS } from "../data/chapters";

// Determine if bg is dark for text contrast
const isDarkBackground = (color) => {
  if (color === BACKGROUNDS.lightGray) return false;
  return true;
};

export function Chapter({
  id,
  name,
  bgColor = BACKGROUNDS.lightGray,
  children,
}) {
  const textColor = isDarkBackground(bgColor) ? "#f5f5f4" : "#1c1917";

  return (
    <div
      id={id}
      data-chapter={name}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </div>
  );
}
