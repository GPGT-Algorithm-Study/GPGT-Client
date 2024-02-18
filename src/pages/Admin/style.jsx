import styled from '@emotion/styled';

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 1000px) {
    flex-direction: row;
    gap: 20px;
  }
  align-items: center;
`;

export const GridCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const VerticalCardWrapper = styled.div`
  display: flex;
`;
