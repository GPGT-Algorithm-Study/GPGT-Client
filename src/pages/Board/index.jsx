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
import { boardType, getTypeLabel, writeType } from 'utils/board';
import useFetch from 'hooks/useFetch';
import { getPostsByCondition } from 'api/board';
import Write from './Write';
import { useSelector } from 'react-redux';

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
  const user = useSelector((state) => state.user);
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [params, setParams] = useState({
    page: page - 1,
    size: SIZE,
    condition: {
      type: curCategory.key,
    },
  });

  const [postsInfo, , setPostParams] = useFetch(
    getPostsByCondition,
    [],
    params,
  );
  const [writeMode, setWriteMode] = useState(false);
  const [title, setTitle] = useState(curCategory.label);
  const [showTypeTitle, setShowTypeTitle] = useState(false);

  const closeWriteMode = useCallback(() => {
    setWriteMode(false);
  }, []);

  useEffect(() => {
    setTitle(curCategory.label);
  }, [curCategory]);

  // 페이징 및 현재 카테고리 바뀌면 다시 로드
  useEffect(() => {
    const newParams = {
      page: page - 1,
      size: SIZE,
    };
    // 마이페이지가 아니라면 조건에 타입(게시판) 추가
    if (curCategory.key !== boardType.MY.key) {
      newParams.condition = {
        type: curCategory.key,
      };
    }
    setParams(newParams);
  }, [page, curCategory]);

  useEffect(() => {
    setPostParams(params);
  }, [params]);

  // 응답 받은 게시물 데이터 가공
  useEffect(() => {
    if (isEmpty(postsInfo)) return;
    setPostList(postsInfo.content);
    setTotal(postsInfo.totalElements);
  }, [postsInfo]);

  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  // 검색
  const onSubmitSearchKeyword = useCallback(
    (e) => {
      e.preventDefault();
      setCurCategory({ label: '전체 검색 결과' });
      setShowTypeTitle(true);
      setPage(1);
      setParams({
        page: 0,
        size: SIZE,
        condition: {
          query: keyword,
        },
      });
    },
    [keyword],
  );

  // 내가 쓴 포스트 확인
  const onClickMyPosts = useCallback(() => {
    setCurCategory(boardType.MY);
    setShowTypeTitle(true);
    setPage(1);
    setParams({
      page: 0,
      size: SIZE,
      condition: {
        bojHandle: user.bojHandle,
      },
    });
  }, []);

  // 글 쓰기 버튼 누르면 글쓰기 컴포넌트 보여주기
  if (writeMode) {
    return (
      <Write
        mode={writeType.WRITE}
        type={curCategory.key}
        closeWriteMode={closeWriteMode}
      />
    );
  }

  return (
    <Container>
      <HeaderWrapper>
        {/* 카테고리 */}
        <CategoryWrapper>
          {categories.map((category) => (
            <Category
              key={category.key}
              selected={curCategory.key == category.key}
              onClick={() => {
                setShowTypeTitle(false);
                setPage(1);
                setCurCategory(category);
              }}
            >
              {category.label}
            </Category>
          ))}
          <Category
            onClick={onClickMyPosts}
            selected={curCategory.key == boardType.MY.key}
          >
            {boardType.MY.label}
          </Category>
        </CategoryWrapper>
      </HeaderWrapper>
      {/* 게시글 테이블 */}
      <div>
        <BoardHeader>
          <BoardTitleWrapper>
            <CommonTitle>{title}</CommonTitle>
            <p>{total} 개의 게시글</p>
          </BoardTitleWrapper>
          <SearchForm onSubmit={onSubmitSearchKeyword}>
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
                <td>
                  {showTypeTitle && <b>{`[${getTypeLabel(post.type)}] `}</b>}
                  {post.title}
                </td>
                <PostInfo>
                  {post.notionId} {post.emoji}
                </PostInfo>
                <PostInfo>{dayjs(post.date).format('YYYY-MM-DD')}</PostInfo>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* 페이지네이션  */}
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
      </div>
      {/* 글쓰기 버튼 */}
      <WriteButton
        primary
        onClick={() => {
          setWriteMode(true);
        }}
      >
        <BsFillPencilFill />
      </WriteButton>
    </Container>
  );
}

export default Board;
