import styled from '@emotion/styled';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const BasicInfo = styled.div`
  width: 30%;
  @media all and (max-width: 1110px) {
    width: 100%;
  }
`;

export const ProfileInfo = styled.div`
  width: calc(70% - 1rem);
  @media all and (max-width: 1110px) {
    width: 100%;
  }
`;
