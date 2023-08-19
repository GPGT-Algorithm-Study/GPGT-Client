import styled from '@emotion/styled';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const Label = styled.span`
  color: var(--color-textgrey);
  font-size: 0.8rem;
  font-weight: bold;
  & span {
    margin-right: 5px;
  }
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid rgb(168, 168, 168);
  height: 30px;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0 0 0;
  border-radius: 7px;
  padding: 3rem 3rem 5rem 3rem;
  margin-right: auto;
  margin-left: auto;
  background-color: white;
  height: 30rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 50px;
  & div {
    display: flex;
    align-items: center;
    & span {
      margin-right: 8px;
      color: var(--color-textgrey);
      font-size: 0.9rem;
    }
  }
`;

export const Slider = styled(RcSlider)`
  margin-top: 10px;
`;

export const Form = styled.form`
  margin: 10px;
  .form-item {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  & div {
    margin-bottom: 10px;
  }
`;

export const Button = styled.button`
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
`;

export const ErrorMsg = styled.div`
  height: 10px;
  margin-top: 8px;
  & div {
    color: var(--color-error);
    font-size: 0.8rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

export const ProblemWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  border-radius: 50px;
  padding: 7px 10px 5px 10px;
  font-size: 0.8rem;
  border: none;
  background-color: var(--color-background);
  margin: 0px 5px 10px 5px;
  text-overflow: 'ellipsis';
`;
