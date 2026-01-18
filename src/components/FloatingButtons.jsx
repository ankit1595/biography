import { useState } from "react";
import { ZoomToggleIcon, ArrowUpIcon } from "./icons";

const floatingButtonClasses =
  "fixed z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center";

export function ZoomToggleButton({ onClick }) {
  const [zoomedOut, setZoomedOut] = useState(false);

  const handleToggle = () => {
    const newState = !zoomedOut;
    setZoomedOut(newState);
    onClick?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`${floatingButtonClasses} top-6 right-6`}
      aria-label={zoomedOut ? "Zoom in" : "Zoom out"}
    >
      <ZoomToggleIcon />
    </button>
  );
}

export function GoToTopButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${floatingButtonClasses} bottom-6 right-6`}
      aria-label="Go to top"
    >
      <ArrowUpIcon />
    </button>
  );
}
