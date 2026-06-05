export function GrainOverlay() {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{
          filter: 'url(#grain)',
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}
