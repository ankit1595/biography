export function ScrubScroller({ progress = 0 }) {
  return (
    <div className="scrub-scroller">
      <div className="scrub-track" />
      <div className="scrub-fill" style={{ height: `${progress}%` }} />
    </div>
  );
}
