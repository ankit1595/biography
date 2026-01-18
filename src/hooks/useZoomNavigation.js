import { useState, useCallback, useEffect, useRef } from "react";
import { getProminentSection } from "../utils/sectionUtils";

const ZOOM_BG_COLOR = "#eceff1";
const ZOOM_SCALE = 0.3;

export function useZoomNavigation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const storyContentRef = useRef(null);

  // Update transform-origin when scrolling while zoomed out
  useEffect(() => {
    if (!isZoomedOut) return;

    const handleScroll = () => {
      if (storyContentRef.current) {
        const originY = window.scrollY + window.innerHeight / 2;
        storyContentRef.current.style.transformOrigin = `center ${originY}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isZoomedOut]);

  const applyZoomOut = useCallback((storyContent) => {
    storyContentRef.current = storyContent;
    const originY = window.scrollY + window.innerHeight / 2;

    document.documentElement.style.scrollSnapType = "none";
    document.documentElement.style.backgroundColor = ZOOM_BG_COLOR;
    document.documentElement.style.overflowY = "auto";

    storyContent.style.transform = `scale(${ZOOM_SCALE})`;
    storyContent.style.transformOrigin = `center ${originY}px`;
    document.body.style.height = `${storyContent.scrollHeight * ZOOM_SCALE}px`;
  }, []);

  const removeZoomOut = useCallback((storyContent) => {
    storyContent.style.transform = "none";
    storyContent.style.transformOrigin = "";
    document.body.style.height = "";
    document.documentElement.style.backgroundColor = "";
    document.documentElement.style.overflowY = "";
    document.documentElement.style.scrollSnapType = "";
  }, []);

  const zoomInToSection = useCallback(
    (targetElement) => {
      const storyContent = document.querySelector(".biography-content");
      if (!storyContent || !targetElement) return;

      setIsAnimating(true);
      removeZoomOut(storyContent);
      setIsZoomedOut(false);

      requestAnimationFrame(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => setIsAnimating(false), 500);
      });
    },
    [removeZoomOut],
  );

  // Handle click when zoomed out
  useEffect(() => {
    if (!isZoomedOut || isAnimating) return;

    const handleClick = () => {
      const prominentSection = getProminentSection();
      if (prominentSection) {
        zoomInToSection(prominentSection);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [isZoomedOut, isAnimating, zoomInToSection]);

  const toggleZoom = useCallback(() => {
    const storyContent = document.querySelector(".biography-content");
    if (!storyContent || isAnimating) return;

    if (isZoomedOut) {
      const prominentSection = getProminentSection();
      if (prominentSection) {
        zoomInToSection(prominentSection);
      } else {
        removeZoomOut(storyContent);
        setIsZoomedOut(false);
      }
    } else {
      applyZoomOut(storyContent);
      setIsZoomedOut(true);
    }
  }, [isZoomedOut, isAnimating, zoomInToSection, applyZoomOut, removeZoomOut]);

  const navigateTo = useCallback(
    (sectionId) => {
      if (isAnimating) return;

      const element = document.getElementById(sectionId);
      const storyContent = document.querySelector(".biography-content");
      if (!element || !storyContent) return;

      setIsAnimating(true);
      applyZoomOut(storyContent);
      setIsZoomedOut(true);

      setTimeout(() => {
        const scrollDistance =
          Math.abs(element.getBoundingClientRect().top) / ZOOM_SCALE;
        const scrollDuration = Math.max(
          800,
          Math.min(2500, scrollDistance / 2),
        );

        element.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          removeZoomOut(storyContent);
          setIsZoomedOut(false);

          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => setIsAnimating(false), 300);
          });
        }, scrollDuration);
      }, 500);
    },
    [isAnimating, applyZoomOut, removeZoomOut],
  );

  return { navigateTo, toggleZoom };
}
