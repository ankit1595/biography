export interface ChapterPosition {
  id: string;
  name: string;
  shortName: string;
  top: number;
  percentPosition: number;
}

export interface ScrollOptions {
  instant?: boolean;
}

export interface ScrollState {
  isZoomedOut: boolean;
  isAnimating: boolean;
  isScrubbing: boolean;
  zoomedBodyHeight: number | null;
  progress: number;
  positions: ChapterPosition[];
  currentChapter: ChapterPosition | null;
}

export interface ScrollActions {
  toggleZoom: () => void;
  navigateTo: (sectionId: string) => void;
  navigateToPercent: (percent: number) => void;
  scrollToPercent: (percent: number, options?: ScrollOptions) => void;
  scrollToChapter: (chapterId: string) => void;
  startScrubbing: () => void;
  endScrubbing: () => void;
}

export interface ScrollContextValue {
  state: ScrollState;
  actions: ScrollActions;
  scrollableHeight: number;
}
