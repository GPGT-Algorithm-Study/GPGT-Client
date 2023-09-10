import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';
import WarningGraph from './WarningGraph';
import LeftTime from 'components/LeftTime';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';

function Statistics() {
  return (
    <div>
      <CommonFlexWrapper>
        <CommonTitle>통계</CommonTitle>
        <LeftTime />
      </CommonFlexWrapper>
      <TodaySolved />
      <SolvedGraph />
      <PointGraph />
      <WarningGraph />
    </div>
  );
}

export default Statistics;
