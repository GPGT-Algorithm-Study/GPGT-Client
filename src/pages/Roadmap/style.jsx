import styled from '@emotion/styled';

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  > div {
    color: #000;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.5;
  }
  > button {
    flex-shrink: 0;
    padding: 11px 20px;
    color: #fff;
    font-weight: 600;
    border-radius: 50px;
    background: var(--color-primary);
    border: none;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;
