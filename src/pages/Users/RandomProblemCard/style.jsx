import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Card = styled(CommonCard)`
  flex: 0 0 auto;
  padding: 20px 20px 20px 20px;
  border: none;
  background-image: linear-gradient(
    90deg,
    #ffefef 0%,
    #edeaff 45.31%,
    #e8f4ff 100%
  );
`;

export const CardContent = styled.div`
  filter: ${(props) => (props.isBlur ? 'blur(3px) opacity(25%)' : '')};
`;

export const NoRandomProblem = styled.div`
  z-index: 999;
  position: relative;
  & div {
    position: absolute;
    top: 24px;
    left: 7px;
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.95rem;
  align-items: center;
  & p {
    display: inline;
    color: var(--color-point);
  }
`;

export const TagSwitchWrapper = styled.div`
  font-weight: normal;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-deep-gray);
  gap: 0.5rem;
  > span {
    margin-top: 1px;
  }
`;

export const ProblemTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

export const ProblemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const TagWrapper = styled.div`
  max-width: 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

export const Tag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 5px 10px;
  font-size: 0.8rem;
  border: none;
  background-color: #fff;
  text-overflow: 'ellipsis';
`;

export const ProblemNumber = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  color: var(--color-deep-gray);
  > div {
    margin-bottom: 4px;
  }
`;

export const ProblemSubInfo = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  color: var(--color-deep-gray);
  font-size: 0.8rem;
  & span {
    color: #000;
    font-weight: 600;
  }
`;

export const SolvedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`;
