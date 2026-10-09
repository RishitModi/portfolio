import { forwardRef } from 'react';

export interface PanelToggleProps {
  side: 'left' | 'right';
  open: boolean;
  onClick: () => void;
  controls: string;
  className?: string;
}

export const PanelToggle = forwardRef<HTMLButtonElement, PanelToggleProps>(
  function PanelToggle({ side, open, onClick, controls, className = '' }, ref) {
    const label =
      side === 'left'
        ? open
          ? 'Hide sidebar'
          : 'Show sidebar'
        : open
        ? 'Hide side panel'
        : 'Show side panel';

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls={controls}
        className={[
          'w-8 h-8 rounded-lg bg-card border border-line shadow-sm',
          'flex items-center justify-center text-body',
          'hover:bg-surface hover:text-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          'transition-all duration-150 cursor-pointer',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer container rect */}
          <rect
            x="1.5"
            y="2"
            width="13"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Side panel strip: filled when open, outlined when closed */}
          {side === 'left' ? (
            <rect
              x="2.5"
              y="3"
              width="3.5"
              height="10"
              rx="1"
              fill={open ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
            />
          ) : (
            <rect
              x="10"
              y="3"
              width="3.5"
              height="10"
              rx="1"
              fill={open ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
            />
          )}
        </svg>
      </button>
    );
  }
);
