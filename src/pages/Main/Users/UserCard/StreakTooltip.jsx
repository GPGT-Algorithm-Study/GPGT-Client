import React from 'react';

function StreakTooltip({ streak }) {
  return (
    <g>
      <rect
        x={streak.x - 85 > 0 ? streak.x - 88 : streak.x + 22}
        y={streak.y}
        width={85}
        height={20}
        rx={5}
        fill="#2a2a2a"
      />
      <text
        x={streak.x - 85 > 0 ? streak.x - 10 : streak.x + 98}
        y={14 + streak.y}
        fontSize={12}
        fill="white"
      >
        {streak.date}
      </text>
    </g>
  );
}

export default StreakTooltip;
