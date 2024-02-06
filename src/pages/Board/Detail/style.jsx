import styled from '@emotion/styled';
import { IoArrowBackSharp } from 'react-icons/io5';

export const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Toolbar = styled.div`
  margin-top: 1.5rem;
  padding: 0 0.5rem 2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
`;
export const WriteInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
`;
export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
export const CreateDate = styled.div`
  color: var(--color-text-gray);
`;
export const Button = styled.div`
  color: var(--color-text-gray);
  cursor: pointer;
`;
export const Content = styled.div`
  padding: 2.3rem 0;
  box-sizing: border-box;
`;

export const CommentWrapper = styled.div`
  margin-bottom: 5rem;
  padding: 0 0.6rem;
  margin-top: 4rem;
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  margin-bottom: 20px;
  cursor: pointer;
`;
