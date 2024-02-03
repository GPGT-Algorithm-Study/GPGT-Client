import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Container = styled.div`
  padding: 3rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3rem;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const MessageContent = styled.div`
  line-height: 1.5;
  word-break: break-all;
  font-weight: 500;
`;
export const Writer = styled.div`
  font-size: 0.85rem;
  color: var(--color-text-gray);
`;

export const NoticeCard = styled(CommonCard)`
  padding: 12px;
  margin: 0 20px 50px 20px;
  cursor: pointer;
  /* color: white;
  background-color: var(--color-primary); */
`;

export const ContentTitle = styled.div`
  margin: 0 0 20px 30px;
  align-items: center;
  font-weight: bold;
  font-size: 21px;
  display: flex;
  flex-wrap: wrap;
`;

export const RandomPsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 100%;
`;

export const RadomRecommendInput = styled.div`
  position: relative;
  width: 35rem;
  max-width: 100%;
  > input {
    width: 100%;
    height: 3.5rem;
    border-radius: 50px;
    padding: 0 120px 0 3cap;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  }
  > div {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 400;
    background-color: var(--color-button-gray);
    border-radius: 5px;
    padding: 10px 20px;
  }
`;

export const MainTitle = styled.div`
  font-weight: 700;
  font-size: 2rem;
`;

export const NoticeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.93rem;
  align-self: flex-start;
  margin-left: 1rem;
  margin-top: -1rem;
  cursor: pointer;
  > span {
    color: var(--color-error);
  }
`;
