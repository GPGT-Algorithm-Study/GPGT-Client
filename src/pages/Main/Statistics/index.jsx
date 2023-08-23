import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';

function Statistics() {
  return (
    <div>
      <TodaySolved />
      <SolvedGraph />
      <PointGraph />
    </div>
  );
}

export default Statistics;
