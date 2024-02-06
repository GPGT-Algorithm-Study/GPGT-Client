import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  @media all and (min-width: 1440px) {
    width: calc(33% - 1px);
  }

  @media all and (min-width: 1180px) and (max-width: 1440px) {
    width: calc(33% - 1px);
  }

  @media all and (min-width: 784px) and (max-width: 1180px) {
    width: calc(50% - 3px);
  }

  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const UserProblemInfo = styled.div`
  margin: 0 10px 0 10px;
`;
