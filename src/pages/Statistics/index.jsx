import React from 'react';
import TodaySolved from './TodaySolved';
import SolvedGraph from './SolvedGraph';
import PointGraph from './PointGraph';
import WarningGraph from './WarningGraph';
import { Container, FlexWrapper } from './style';
import PageTitle from 'components/PageTitle';

function Statistics() {
  return (
    <Container>
      <PageTitle showLeftTime title="통계" />
      <div>
        <FlexWrapper>
          <TodaySolved /> <WarningGraph />
        </FlexWrapper>
        <SolvedGraph />
        <PointGraph />
      </div>
    </Container>
  );
}

export default Statistics;
