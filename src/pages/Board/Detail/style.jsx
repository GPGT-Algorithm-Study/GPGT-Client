import styled from '@emotion/styled';
import { IoArrowBackSharp } from 'react-icons/io5';

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 10px 0 10px;
`;
export const Toolbar = styled.div`
  margin-top: 20px;
  padding: 0 10px 25px 10px;
  display: flex;
  justify-content: space-between;
  /* border-bottom: 1px solid var(--color-bordergrey); */
`;
export const WriteInfo = styled.div`
  display: flex;
  gap: 10px;
`;
export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;
export const CreateDate = styled.div`
  color: var(--color-textgrey);
`;
export const Button = styled.div`
  color: var(--color-textgrey);
  cursor: pointer;
`;
export const Content = styled.div`
  margin: 15px 0 50px 0;
  padding-bottom: 50px;
  /* border-bottom: 1px solid var(--color-bordergrey); */
`;

export const CommentWrapper = styled.div`
  margin: 0 0 70px 0;
  padding: 0 10px 0 10px;
`;

export const Container = styled.div`
  padding: 0 25px;
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  margin-bottom: 20px;
`;
