import React from 'react';

const StreakIcon = ({ isHovering, streak, onMouseEnter, onMouseOut }) => {
  return (
    <rect
      width="18"
      height="18"
      x={streak.x}
      y={streak.y}
      rx="5"
      fill={
        streak.solved
          ? streak.isFreeze
            ? 'var(--color-freeze)'
            : 'var(--color-checked)'
          : 'var(--color-unchecked)'
      }
      strokeWidth="2.5"
      stroke={isHovering ? '#000000' : 'transparent'}
      onMouseEnter={onMouseEnter}
      onMouseOut={onMouseOut}
    />
  );
};

export default StreakIcon;
