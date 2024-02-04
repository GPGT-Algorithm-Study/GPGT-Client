import styled from '@emotion/styled';
import { CommonCard } from 'style/commonStyle';

export const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 1.5rem;
`;

export const Category = styled.div`
  color: ${(props) =>
    props.selected ? 'var(--color-primary)' : 'var(--color-deep-gray)'};
  font-weight: ${(props) => (props.selected ? '500' : '400')};
  ${(props) =>
    props.selected ? 'border-bottom: 3px solid var(--color-primary);' : ''}
  ${(props) => (props.selected ? 'margin-bottom: -2px;' : '')}
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-size: 0.9rem;
  @media all and (max-width: 500px) {
    padding: 1rem;
  }
`;

export const BoardTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    color: var(--color-text-gray);
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  padding: 3rem 1rem;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: end;
  color: var(--color-textgrey);
  & input {
    height: 2.5rem;
    border-radius: 50px;
    padding: 0.5rem 1.5rem;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const WriteButton = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  background-color: var(--color-button-gray);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 1rem;
`;

export const Container = styled.div`
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

export const Card = styled(CommonCard)`
  padding: 20px 20px 30px 20px;
  margin-top: 10px;
  min-height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BoardContent = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PostItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  width: calc(50% - 4rem);
  @media all and (max-width: 640px) {
    width: 100%;
  }
`;

export const PostTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;

export const PostInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: var(--color-text-gray);
  flex-grow: 1;
  align-items: end;
`;

export const PostContent = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  color: var(--color-deep-gray);
  font-size: 0.9rem;
  font-weight: 400;
`;

export const NoPost = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
  font-size: 0.9rem;
  color: var(--color-text-gray);
`;
