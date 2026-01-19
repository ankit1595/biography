import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { ScrollContext } from "./ScrollContext";
import { chapters } from "../data/chapters";
import { getProminentSection } from "../utils/sectionUtils";
import {
  ANIMATION_TIMING,
  ZOOM_CONFIG,
  SCROLLBAR_CONFIG,
  NAVIGATION_CONFIG,
  MOBILE_CONFIG,
} from "../constants/scroll";
import type {
  ChapterPosition,
  ScrollOptions,
  ScrollContextValue,
} from "../types/scroll";

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const isScrubbingRef = useRef(false);
  const isZoomedOutRef = useRef(false);
  const [zoomedBodyHeight, setZoomedBodyHeight] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState<ChapterPosition[]>([]);
  const [currentChapter, setCurrentChapter] = useState<ChapterPosition | null>(null);

  const storyContentRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const getStoryContent = useCallback(() => {
    return storyContentRef.current ?? document.querySelector(".biography-content") as HTMLElement;
  }, []);

  const scrollableHeight = useMemo(() => {
    const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    if (isZoomedOut && zoomedBodyHeight !== null) {
      return zoomedBodyHeight - viewportHeight;
    }
    if (typeof document !== "undefined") {
      return document.documentElement.scrollHeight - viewportHeight;
    }
    return 0;
  }, [isZoomedOut, zoomedBodyHeight]);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const scheduleTimeout = useCallback(
    (fn: () => void, delay: number): ReturnType<typeof setTimeout> => {
      const id = setTimeout(fn, delay);
      timeoutRefs.current.push(id);
      return id;
    },
    []
  );

  const applyZoomOut = useCallback((storyContent: HTMLElement) => {
    storyContentRef.current = storyContent;
    const contentHeight = storyContent.scrollHeight;
    const viewportHeight = window.innerHeight;
    const extraSpace = viewportHeight * (1 - ZOOM_CONFIG.SCALE);
    const height = contentHeight * ZOOM_CONFIG.SCALE + extraSpace;
    const currentScrollY = window.scrollY;

    isZoomedOutRef.current = true;
    setZoomedBodyHeight(height);
    setIsZoomedOut(true);

    document.documentElement.style.scrollSnapType = "none";
    document.documentElement.style.backgroundColor = ZOOM_CONFIG.BG_COLOR;
    document.documentElement.style.overflowY = "auto";
    storyContent.style.transform = `scale(${ZOOM_CONFIG.SCALE})`;
    storyContent.style.transformOrigin = "center top";
    document.body.style.height = `${height}px`;
    document.body.style.overflow = "hidden";

    const zoomedScrollY = currentScrollY * ZOOM_CONFIG.SCALE;
    window.scrollTo({ top: zoomedScrollY, behavior: "instant" });
  }, []);

  const removeZoomOut = useCallback((storyContent: HTMLElement) => {
    const currentZoomedScrollY = window.scrollY;
    const originalScrollY = currentZoomedScrollY / ZOOM_CONFIG.SCALE;

    isZoomedOutRef.current = false;
    setZoomedBodyHeight(null);
    setIsZoomedOut(false);

    storyContent.style.transition = "none";
    storyContent.style.transform = "none";
    storyContent.style.transformOrigin = "";
    document.body.style.height = "";
    document.body.style.overflow = "";
    document.documentElement.style.backgroundColor = "";
    document.documentElement.style.overflowY = "";
    document.documentElement.style.scrollSnapType = "";

    window.scrollTo({ top: originalScrollY, behavior: "instant" });

    requestAnimationFrame(() => {
      storyContent.style.transition = "";
    });
  }, []);

  const zoomInToSection = useCallback(
    (targetElement: Element) => {
      const storyContent = getStoryContent();
      if (!storyContent || !targetElement) return;

      setIsAnimating(true);
      removeZoomOut(storyContent);

      requestAnimationFrame(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        scheduleTimeout(() => setIsAnimating(false), ANIMATION_TIMING.ZOOM_IN_SETTLE);
      });
    },
    [getStoryContent, removeZoomOut, scheduleTimeout]
  );

  useEffect(() => {
    if (!isZoomedOut || isAnimating) return;

    const handleClick = () => {
      const prominentSection = getProminentSection();
      if (prominentSection) {
        zoomInToSection(prominentSection);
      }
    };

    const timeoutId = scheduleTimeout(() => {
      document.addEventListener("click", handleClick);
    }, ANIMATION_TIMING.DOM_SETTLE_DELAY);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, [isZoomedOut, isAnimating, zoomInToSection, scheduleTimeout]);

  const toggleZoom = useCallback(() => {
    const storyContent = getStoryContent();
    if (!storyContent || isAnimating) return;

    if (isZoomedOut) {
      removeZoomOut(storyContent);
    } else {
      applyZoomOut(storyContent);
    }
  }, [getStoryContent, isZoomedOut, isAnimating, applyZoomOut, removeZoomOut]);

  const navigateTo = useCallback(
    (sectionId: string) => {
      if (isAnimating) return;

      const element = document.getElementById(sectionId);
      const storyContent = getStoryContent();
      if (!element || !storyContent) return;

      const currentY = window.scrollY;
      const targetY = element.getBoundingClientRect().top + currentY;

      setIsAnimating(true);
      clearAllTimeouts();
      applyZoomOut(storyContent);

      scheduleTimeout(() => {
        const zoomedTargetY = targetY * ZOOM_CONFIG.SCALE;
        const currentZoomedY = window.scrollY;
        const scrollDistance = Math.abs(zoomedTargetY - currentZoomedY);
        const scrollDuration = Math.max(
          ANIMATION_TIMING.SCROLL_MIN_DURATION,
          Math.min(ANIMATION_TIMING.SCROLL_MAX_DURATION, scrollDistance)
        );

        window.scrollTo({ top: zoomedTargetY, behavior: "smooth" });

        scheduleTimeout(() => {
          removeZoomOut(storyContent);

          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            scheduleTimeout(() => setIsAnimating(false), ANIMATION_TIMING.ZOOM_IN_DELAY);
          });
        }, scrollDuration);
      }, ANIMATION_TIMING.ZOOM_OUT_DELAY);
    },
    [getStoryContent, isAnimating, applyZoomOut, removeZoomOut, clearAllTimeouts, scheduleTimeout]
  );

  const navigateToPercent = useCallback(
    (percent: number) => {
      if (isAnimating) return;

      const storyContent = getStoryContent();
      if (!storyContent) return;

      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const unzoomedScrollableHeight = docHeight - viewportHeight;
      const targetScrollY = (percent / 100) * unzoomedScrollableHeight;
      const currentY = window.scrollY;

      if (isZoomedOut) {
        const zoomedTargetY = targetScrollY * ZOOM_CONFIG.SCALE;
        window.scrollTo({ top: zoomedTargetY, behavior: "smooth" });
        return;
      }

      if (Math.abs(targetScrollY - currentY) < NAVIGATION_CONFIG.SKIP_THRESHOLD) return;

      setIsAnimating(true);
      clearAllTimeouts();
      applyZoomOut(storyContent);

      scheduleTimeout(() => {
        const zoomedTargetY = targetScrollY * ZOOM_CONFIG.SCALE;
        const scrollDistance = Math.abs(zoomedTargetY - window.scrollY);
        const scrollDuration = Math.max(
          ANIMATION_TIMING.SCROLL_MIN_DURATION,
          Math.min(ANIMATION_TIMING.SCROLL_MAX_DURATION, scrollDistance)
        );

        window.scrollTo({ top: zoomedTargetY, behavior: "smooth" });

        scheduleTimeout(() => {
          removeZoomOut(storyContent);
          scheduleTimeout(() => setIsAnimating(false), ANIMATION_TIMING.POST_ANIMATION_DELAY);
        }, scrollDuration);
      }, ANIMATION_TIMING.ZOOM_OUT_DELAY);
    },
    [getStoryContent, isAnimating, isZoomedOut, applyZoomOut, removeZoomOut, clearAllTimeouts, scheduleTimeout]
  );

  const scrollToPercent = useCallback(
    (percent: number, options: ScrollOptions = {}) => {
      const viewportHeight = window.innerHeight;
      const currentlyZoomedOut = isZoomedOutRef.current;

      if (currentlyZoomedOut) {
        const docHeight = storyContentRef.current?.scrollHeight ?? document.documentElement.scrollHeight;
        const originalScrollableHeight = docHeight - viewportHeight;
        const targetOriginalY = (percent / 100) * originalScrollableHeight;
        const zoomedTargetY = targetOriginalY * ZOOM_CONFIG.SCALE;
        window.scrollTo({ top: zoomedTargetY, behavior: options.instant ? "instant" : "smooth" });
      } else {
        const currentScrollableHeight = document.documentElement.scrollHeight - viewportHeight;
        const targetY = (percent / 100) * Math.max(0, currentScrollableHeight);
        window.scrollTo({ top: targetY, behavior: options.instant ? "instant" : "smooth" });
      }
    },
    []
  );

  const scrollToChapter = useCallback((chapterId: string) => {
    const element = document.getElementById(chapterId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const startScrubbing = useCallback(() => {
    if (isZoomedOut || isAnimating) return;

    const storyContent = getStoryContent();
    if (!storyContent) return;

    isScrubbingRef.current = true;
    setIsScrubbing(true);
    clearAllTimeouts();
    applyZoomOut(storyContent);
  }, [getStoryContent, isZoomedOut, isAnimating, applyZoomOut, clearAllTimeouts]);

  const endScrubbing = useCallback(() => {
    if (!isScrubbingRef.current) return;

    const storyContent = getStoryContent();
    if (!storyContent) return;

    isScrubbingRef.current = false;
    setIsScrubbing(false);
    removeZoomOut(storyContent);
  }, [getStoryContent, removeZoomOut]);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    let percent: number;

    if (isZoomedOut && zoomedBodyHeight !== null) {
      const originalScrollY = scrollTop / ZOOM_CONFIG.SCALE;
      const originalDocHeight = storyContentRef.current?.scrollHeight ?? (zoomedBodyHeight / ZOOM_CONFIG.SCALE);
      const originalScrollableHeight = originalDocHeight - viewportHeight;
      percent = originalScrollableHeight > 0 ? (originalScrollY / originalScrollableHeight) * 100 : 0;
    } else {
      const currentScrollableHeight = document.documentElement.scrollHeight - viewportHeight;
      percent = currentScrollableHeight > 0 ? (scrollTop / currentScrollableHeight) * 100 : 0;
    }

    percent = Math.max(0, Math.min(100, percent));
    setProgress((prev) =>
      Math.abs(prev - percent) > SCROLLBAR_CONFIG.PROGRESS_THRESHOLD ? percent : prev
    );
  }, [isZoomedOut, zoomedBodyHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const calculatePositions = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const calcScrollableHeight = docHeight - viewportHeight;

    const chapterPositions = chapters
      .filter((ch) => ch.id !== "index")
      .map((chapter) => {
        const element = document.getElementById(chapter.id);
        if (!element) return null;

        const rect = element.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const percentPosition = calcScrollableHeight > 0
          ? (absoluteTop / calcScrollableHeight) * 100
          : 0;

        return {
          id: chapter.id,
          name: chapter.name,
          shortName: chapter.shortName || chapter.name,
          top: absoluteTop,
          percentPosition: Math.min(percentPosition, 100),
        };
      })
      .filter((pos): pos is ChapterPosition => pos !== null);

    setPositions(chapterPositions);
  }, []);

  const detectCurrentChapter = useCallback(() => {
    let scrollTop = window.scrollY;

    if (isZoomedOut) {
      scrollTop = scrollTop / ZOOM_CONFIG.SCALE;
    }

    const isMobile = window.innerWidth <= MOBILE_CONFIG.BREAKPOINT;
    const navOffset = isMobile ? MOBILE_CONFIG.NAV_HEIGHT / 2 : 0;
    const viewportMiddle = scrollTop + window.innerHeight / 2 + navOffset;

    for (let i = positions.length - 1; i >= 0; i--) {
      if (positions[i].top <= viewportMiddle) {
        setCurrentChapter(positions[i]);
        return;
      }
    }

    if (positions.length > 0) {
      setCurrentChapter(positions[0]);
    }
  }, [positions, isZoomedOut]);

  useEffect(() => {
    calculatePositions();
    const timer = setTimeout(calculatePositions, ANIMATION_TIMING.DOM_SETTLE_DELAY);
    window.addEventListener("resize", calculatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculatePositions);
    };
  }, [calculatePositions]);

  useEffect(() => {
    detectCurrentChapter();
    window.addEventListener("scroll", detectCurrentChapter, { passive: true });
    return () => window.removeEventListener("scroll", detectCurrentChapter);
  }, [detectCurrentChapter]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [clearAllTimeouts]);

  const value: ScrollContextValue = useMemo(
    () => ({
      state: {
        isZoomedOut,
        isAnimating,
        isScrubbing,
        zoomedBodyHeight,
        progress,
        positions,
        currentChapter,
      },
      actions: {
        toggleZoom,
        navigateTo,
        navigateToPercent,
        scrollToPercent,
        scrollToChapter,
        startScrubbing,
        endScrubbing,
      },
      scrollableHeight,
    }),
    [
      isZoomedOut,
      isAnimating,
      isScrubbing,
      zoomedBodyHeight,
      progress,
      positions,
      currentChapter,
      scrollableHeight,
      toggleZoom,
      navigateTo,
      navigateToPercent,
      scrollToPercent,
      scrollToChapter,
      startScrubbing,
      endScrubbing,
    ]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
