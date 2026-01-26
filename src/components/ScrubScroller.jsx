import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { SCROLLBAR_CONFIG } from "../constants/scroll";

export function ScrubScroller({
  progress = 0,
  positions = [],
  currentChapter = null,
  onScrollToPercent,
  onZoomOut,
  onStartScrubbing,
  onEndScrubbing,
  isZoomedOut = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef(null);
  const cleanupRef = useRef(null);

  const trackSegments = useMemo(() => {
    if (positions.length === 0) {
      return [{ start: 0, end: 100 }];
    }

    const segments = [];
    let lastEnd = 0;
    const halfGap = SCROLLBAR_CONFIG.GAP_HEIGHT / 2;

    positions.forEach((pos) => {
      const gapStart = Math.max(0, pos.percentPosition - halfGap);
      const gapEnd = Math.min(100, pos.percentPosition + halfGap);

      if (gapStart > lastEnd) {
        segments.push({ start: lastEnd, end: gapStart });
      }
      lastEnd = gapEnd;
    });

    if (lastEnd < 100) {
      segments.push({ start: lastEnd, end: 100 });
    }

    return segments;
  }, [positions]);

  const getPercentFromPointer = useCallback((clientY) => {
    if (!trackRef.current) return 0;

    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const percent = (relativeY / rect.height) * 100;
    return Math.max(0, Math.min(100, percent));
  }, []);

  const handleTrackClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isDragging) return;

      if (isZoomedOut) {
        const percent = getPercentFromPointer(e.clientY);
        onScrollToPercent?.(percent);
      }
    },
    [getPercentFromPointer, onScrollToPercent, isZoomedOut, isDragging],
  );

  const handleSidebarClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);

      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const initialPercent = getPercentFromPointer(clientY);

      let hasMoved = false;
      const wasZoomedIn = !isZoomedOut;
      const startTime = Date.now();

      if (!isZoomedOut) {
        onStartScrubbing?.();
        setTimeout(() => {
          onScrollToPercent?.(initialPercent, { instant: false });
        }, 450);
      } else {
        onScrollToPercent?.(initialPercent, { instant: false });
      }

      const handleMove = (moveEvent) => {
        hasMoved = true;
        const clientY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
        const percent = getPercentFromPointer(clientY);
        onScrollToPercent?.(percent, { instant: true });
      };

      const handleEnd = () => {
        setIsDragging(false);

        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
        cleanupRef.current = null;

        if (wasZoomedIn) {
          if (hasMoved) {
            onEndScrubbing?.();
          } else {
            const elapsed = Date.now() - startTime;
            const remainingDelay = Math.max(0, 1100 - elapsed);
            setTimeout(() => onEndScrubbing?.(), remainingDelay);
          }
        }
      };

      cleanupRef.current = handleEnd;

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: true });
      document.addEventListener("touchend", handleEnd);
    },
    [getPercentFromPointer, onScrollToPercent, isZoomedOut, onStartScrubbing, onEndScrubbing],
  );

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleChapterNameClick = useCallback(
    (e) => {
      e.stopPropagation();
      onZoomOut?.();
    },
    [onZoomOut],
  );

  const handleLabelClick = useCallback(
    (e, percentPosition) => {
      e.stopPropagation();
      if (isZoomedOut) {
        onScrollToPercent?.(percentPosition);
      }
    },
    [isZoomedOut, onScrollToPercent],
  );

  return (
    <div
      className={`scrub-sidebar ${isZoomedOut ? "is-zoomed-out" : ""}`}
      onClick={handleSidebarClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {currentChapter && (
        <button className="scrub-chapter-name" onClick={handleChapterNameClick}>
          {currentChapter.shortName || currentChapter.name}
        </button>
      )}

      <div
        ref={trackRef}
        className={`scrub-scroller ${isDragging ? "is-dragging" : ""} ${isHovering ? "is-hovering" : ""} ${isZoomedOut ? "is-zoomed-out" : ""}`}
        
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onClick={handleTrackClick}
      >
        {trackSegments.map((seg, idx) => (
          <div
            key={`track-${idx}`}
            className="scrub-track-segment"
            style={{
              top: `${seg.start}%`,
              height: `${seg.end - seg.start}%`,
            }}
          />
        ))}

        {trackSegments.map((seg, idx) => {
          const fillEnd = Math.min(seg.end, progress);
          if (progress <= seg.start) return null;

          return (
            <div
              key={`fill-${idx}`}
              className="scrub-fill-segment"
              style={{
                top: `${seg.start}%`,
                height: `${Math.max(0, fillEnd - seg.start)}%`,
              }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            />
          );
        })}

        {(isHovering || isDragging || isZoomedOut) &&
          positions.map((pos) => (
            <div
              key={`label-${pos.id}`}
              className={`chapter-marker-label ${pos.percentPosition <= progress ? "is-active" : ""}`}
              style={{ top: `${pos.percentPosition}%` }}
              onClick={(e) => handleLabelClick(e, pos.percentPosition)}
            >
              {pos.shortName || pos.name}
            </div>
          ))}
      </div>
    </div>
  );
}
