import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  @media all and (min-width: 900px) {
    width: calc(50% - 5px);
  }

  @media all and (max-width: 900px) {
    width: calc(100% - 5px);
  }
`;

export const TeamWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
