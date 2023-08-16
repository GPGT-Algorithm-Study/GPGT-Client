import styled from '@emotion/styled';

export const Card = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  width: var(--width-usercard);
  margin-bottom: 7px;
  padding: 20px 20px 20px 20px;
  background-image: linear-gradient(
    90deg,
    #ffefef 0%,
    #edeaff 45.31%,
    #e8f4ff 100%
  );
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const CardContent = styled.div`
  filter: ${(props) => (props.isBlur ? 'blur(3px) opacity(25%)' : '')};
`;

export const NoRandomProblem = styled.div`
  z-index: 999;
  position: relative;
  & div {
    position: absolute;
    top: 40px;
    left: 40px;
    font-weight: bold;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
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
  & span {
    margin-right: 5px;
  }
`;

export const ProblemTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 15px;
  & p {
    display: inline;
    margin-left: 5px;
  }
`;

export const ProblemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const TagWrapper = styled.div`
  margin-top: 15px;
  max-width: 280px;
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  border-radius: 50px;
  font-weight: normal;
  padding: 3px 8px 3px 8px;
  font-size: 0.8rem;
  border: none;
  background-color: white;
  margin: 0px 5px 5px 0px;
  text-overflow: 'ellipsis';
`;
