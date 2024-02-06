import styled from '@emotion/styled';

export const ProgressBarDiv = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  > div {
    font-size: 0.9rem;
    font-weight: 500;
    text-align: end;
    color: var(--color-primary);
    width: 60px;
  }
  input[type='range'] {
    -webkit-appearance: none;
    background-color: transparent;
    flex-grow: 1;
    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &::-webkit-slider-runnable-track {
      height: 10px;
      border-radius: 1rem;
      background: ${(props) =>
        props.percentage
          ? `linear-gradient(to right, var(--color-primary) ${props.percentage}%, var(--color-unchecked) ${props.percentage}% 100%)`
          : 'var(--color-unchecked)'};
    }
  }
`;
