import styled from '@emotion/styled';

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    #a3e5e1 0%,
    #9fd2e6 50%,
    #9face6 100%
  );
  height: 20rem;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 0;
  & div {
    text-align: center;
    padding: 10px 15px 10px 15px;
    width: 50px;
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
  .selected {
    font-weight: bold;
    border-bottom: 3px solid black;
  }
`;

export const Board = styled.div`
  display: flex;
  justify-content: center;
  background-color: transparent;
`;

export const ContentWrapper = styled.div`
  margin: 30px 20px 20px 20px;
`;
