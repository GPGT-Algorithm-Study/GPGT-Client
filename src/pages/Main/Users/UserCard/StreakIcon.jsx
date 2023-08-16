import React, { forwardRef } from 'react';

const StreakIcon = forwardRef(
  ({ isHovering, streak, onMouseEnter, onMouseOut }, ref) => {
    return (
      <rect
        ref={ref}
        width="18"
        height="18"
        x={streak.x}
        y={streak.y}
        rx="5"
        fill={streak.solved ? 'var(--color-checked)' : 'var(--color-unchecked)'}
        strokeWidth="2.5"
        stroke={isHovering ? '#000000' : 'transparent'}
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
      />
    );
  },
);

export default StreakIcon;
