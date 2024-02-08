import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;
  color: var(--color-text-gray);
  align-items: center;
`;

export const PageButton = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  border: ${(props) =>
    props.selected ? 'none' : '1px solid var(--color-border);'};
  border-radius: 5px;
  color: ${(props) => (props.selected ? 'white' : '')};
  background-color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'none'};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  cursor: pointer;
`;
