import React from 'react';
import { TitleDiv, TitleWrapper } from './style';
import LeftTime from 'components/LeftTime';

function PageTitle({ showLeftTime = false, title }) {
  return (
    <TitleWrapper>
      <TitleDiv>{title}</TitleDiv>
      {showLeftTime && <LeftTime />}
    </TitleWrapper>
  );
}

export default PageTitle;
