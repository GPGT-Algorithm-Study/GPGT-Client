import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';
import WarningGraph from './WarningGraph';

function Statistics() {
  return (
    <Container>
      <PageTitle showLeftTime title="통계" />
      <div>
        <TodaySolved />
        <SolvedGraph />
        <PointGraph />
        <WarningGraph />
      </div>
    </Container>
  );
}

export default Statistics;
