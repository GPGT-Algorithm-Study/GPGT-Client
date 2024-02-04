import styled from '@emotion/styled';

export const TabWrapper = styled.div`
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 0.1rem;
  box-sizing: border-box;
  .tab-item {
    padding: 0.5rem 1rem;
    color: var(--color-text-gray);
    cursor: pointer;
  }
  .selected {
    background-color: var(--color-primary);
    border-radius: 5px;
    color: #fff;
  }
`;
