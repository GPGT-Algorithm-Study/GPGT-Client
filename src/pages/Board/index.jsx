import React, { useCallback, useEffect, useState } from 'react';
import { CommonTitle } from 'style/commonStyle';
import {
  HeaderWrapper,
  Category,
  CategoryWrapper,
  Table,
  BoardTitleWrapper,
  BoardHeader,
  PageWrapper,
  SearchForm,
  PostInfo,
  Container,
  WriteButton,
} from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from 'components/Pagination';
import { boardType } from 'utils/board';
import useFetch from 'hooks/useFetch';
import { getPostsByType } from 'api/board';

/**
 * 게시판 탭 내용 컴포넌트
 */
function Board() {
  const SIZE = 10;
  const categories = [
    boardType.FREE,
    boardType.PS,
    boardType.QUES,
    boardType.NOTICE,
  ];
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [params, setParams] = useState({
    page: page - 1,
    size: SIZE,
    type: curCategory.key,
  });

  const [postsInfo, , setPostParams] = useFetch(getPostsByType, [], params);

  // 페이징 및 현재 카테고리 바뀌면 다시 로드
  useEffect(() => {
    setParams({
      page: page - 1,
      size: SIZE,
      type: curCategory.key,
    });
  }, [page, curCategory]);
  useEffect(() => {
    setPostParams(params);
  }, [params]);

  useEffect(() => {
    if (isEmpty(postsInfo)) return;
    setPostList(postsInfo.content);
    setTotal(postsInfo.totalElements);
  }, [postsInfo]);

  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  return (
    <Container>
      <HeaderWrapper>
        <CategoryWrapper>
          {categories.map((category) => (
            <Category
              key={category.key}
              selected={curCategory.key == category.key}
              onClick={() => {
                setCurCategory(category);
              }}
            >
              {category.label}
            </Category>
          ))}
        </CategoryWrapper>
        <Category>내가 쓴 글</Category>
      </HeaderWrapper>
      <BoardHeader>
        <BoardTitleWrapper>
          <CommonTitle>{curCategory.label}</CommonTitle>
          <p>{total} 개의 게시글</p>
        </BoardTitleWrapper>
        <SearchForm>
          <div>
            <AiOutlineSearch />
          </div>
          <input
            placeholder="검색어 입력"
            value={keyword}
            onChange={onChangeKeyword}
          />
        </SearchForm>
      </BoardHeader>
      <Table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post) => (
            <tr
              key={post.id}
              onClick={() => {
                navigate(`/board/${post.id}`);
              }}
            >
              <td>{post.title}</td>
              <PostInfo>{post.bojHandle}</PostInfo>
              <PostInfo>{dayjs(post.date).format('YYYY-MM-DD')}</PostInfo>
            </tr>
          ))}
        </tbody>
      </Table>
      {Math.ceil(total / SIZE) > 1 && (
        <PageWrapper>
          <Pagination
            totalPage={Math.ceil(total / SIZE)}
            limit={5}
            page={page}
            setPage={setPage}
          />
        </PageWrapper>
      )}
      <WriteButton
        primary
        onClick={() => {
          navigate('/board/write');
        }}
      >
        <BsFillPencilFill />
      </WriteButton>
    </Container>
  );
}

export default Board;
