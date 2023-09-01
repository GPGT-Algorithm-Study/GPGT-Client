import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';
import WarningGraph from './WarningGraph';

function Statistics() {
  return (
    <div>
      <TodaySolved />
      <SolvedGraph />
      <PointGraph />
      <WarningGraph />
    </div>
  );
}

export default Statistics;
