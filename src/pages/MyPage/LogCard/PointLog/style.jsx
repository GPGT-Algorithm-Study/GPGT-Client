import styled from '@emotion/styled';

export const Point = styled.div`
  width: 80px;
  font-weight: 600;
  color: ${(props) =>
    props.plus ? 'var(--color-point)' : 'var(--color-textgrey)'};
  text-align: right;
  & p {
    display: inline;
    margin-left: 7px;
  }
`;

export const TotalPoint = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  & p {
    display: inline;
    color: var(--color-point);
  }
`;

export const LogWrapper = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 0.95rem;
  max-height: 430px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const Log = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1rem;
  text-decoration: ${(props) => (props.state ? '' : 'line-through')};
  text-decoration-color: var(--color-textgrey);
`;

export const TextWrapper = styled.div`
  display: flex;
`;

export const LogMsg = styled.div`
  margin-right: 20px;
  font-weight: 500;
  color: var(--color-deep-gray);
  @media all and (max-width: 600px) {
    display: none;
  }
`;

export const Date = styled.div`
  width: 100px;
  color: var(--color-text-gray);
`;

export const Button = styled.button`
  width: 80px;
  padding: 12px 0 12px 0;
  border-radius: 7px;
  background-color: var(--color-background);
  border: none;
  cursor: pointer;
  align-self: center;
  margin: 15px 0 15px 0;
`;

export const NoLog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: var(--color-text-gray);
  font-size: 0.9rem;
`;
