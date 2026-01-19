import { useContext } from "react";
import { ScrollContext } from "../context/ScrollContext";

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
}

export function useScrollProgressFromContext() {
  const { state } = useScroll();
  return state.progress;
}

export function useZoomState() {
  const { state, actions } = useScroll();
  return {
    isZoomedOut: state.isZoomedOut,
    isAnimating: state.isAnimating,
    toggleZoom: actions.toggleZoom,
  };
}

export function useChapterNavigation() {
  const { state, actions } = useScroll();
  return {
    positions: state.positions,
    currentChapter: state.currentChapter,
    navigateTo: actions.navigateTo,
    scrollToChapter: actions.scrollToChapter,
  };
}

export function useScrollActions() {
  const { actions, scrollableHeight } = useScroll();
  return {
    scrollToPercent: actions.scrollToPercent,
    navigateToPercent: actions.navigateToPercent,
    scrollableHeight,
  };
}
