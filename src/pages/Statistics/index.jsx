import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';
import WarningGraph from './WarningGraph';
import Layout from 'layouts/Layout';
import LeftTime from 'components/LeftTime';
import { CommonFlexWrapper, CommonTitle } from 'style/commonStyle';

function Statistics() {
  return (
    <Layout>
      <CommonFlexWrapper>
        <CommonTitle>통계</CommonTitle>
        <LeftTime />
      </CommonFlexWrapper>
      <TodaySolved />
      <SolvedGraph />
      <PointGraph />
      <WarningGraph />
    </Layout>
  );
}

export default Statistics;
