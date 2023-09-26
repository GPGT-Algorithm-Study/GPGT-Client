import styled from '@emotion/styled';
import { IoArrowBackSharp } from 'react-icons/io5';
import { CommonTitle } from 'style/commonStyle';

export const Title = styled(CommonTitle)`
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
  margin: 0 0 50px 0;
  padding: 30px;
  border-radius: 10px;
  background-color: white;
  /* border-bottom: 1px solid var(--color-bordergrey); */
`;

export const CommentWrapper = styled.div`
  margin: 0 0 70px 0;
  padding: 0 10px 0 10px;
`;

export const Container = styled.div`
  /* padding: 0 25px; */
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  margin-bottom: 20px;
  cursor: pointer;
`;
