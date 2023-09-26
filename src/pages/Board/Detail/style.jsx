import styled from '@emotion/styled';
import { IoArrowBackSharp } from 'react-icons/io5';
import { CommonCard, CommonTitle } from 'style/commonStyle';

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
export const Content = styled(CommonCard)`
  margin: 0 0 50px 0;
  padding: 30px 10px;
  border-radius: 10px;
  background-color: white;
  /* border-bottom: 1px solid var(--color-bordergrey); */
`;

export const CommentWrapper = styled.div`
  margin: 0 0 70px 0;
  padding: 0 10px 0 10px;
`;

export const Container = styled.div`
  width: 90%;
  height: 80vh;
  overflow: scroll;
  padding: 15px 30px 0 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.5);
  box-shadow:
    0 0 0 1px var(--saf-0),
    0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  user-select: none;
  padding: 30px 40px 30px;
  z-index: 1012;
  position: relative;
`;

export const BackButton = styled(IoArrowBackSharp)`
  color: var(--color-textgrey);
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CreateModal = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;
  background-color: rgba(0, 0, 0, 0.8);
`;
