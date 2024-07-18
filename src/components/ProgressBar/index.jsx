import React from 'react';
import { ProgressBarDiv } from './style';

function ProgressBar({ percentage }) {
  return (
    <ProgressBarDiv percentage={percentage}>
      <input type={'range'} min={0} max={100} value={percentage} disabled />
      <div>{percentage}%</div>
    </ProgressBarDiv>
  );
}

export default ProgressBar;
