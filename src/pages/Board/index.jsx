import React, { useCallback, useEffect, useState } from 'react';
import { CommonTitle } from 'style/commonStyle';
import {
  HeaderWrapper,
  Category,
  CategoryWrapper,
  BoardTitleWrapper,
  BoardHeader,
  PageWrapper,
  SearchForm,
  Container,
  WriteButton,
  Card,
} from './style';
import { cloneDeep } from 'lodash';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from 'components/Pagination';
import { boardType, writeType, getTypeLabel } from 'utils/board';
import Write from './Write';
import BoardTable from 'components/BoardTable';
import useSWR from 'swr';
import postFetcher from 'utils/postFetcher';
import {
  BOARD_PAGE_SIZE,
  BRD_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 게시판 탭 내용 컴포넌트
 */
function Board() {
  const categories = [
    boardType.FREE,
    boardType.PS,
    boardType.QUES,
    boardType.NOTICE,
    boardType.MY,
  ];
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const [params, setParams] = useState({
    page: 0,
    size: BOARD_PAGE_SIZE,
    condition: {
      type: boardType.FREE.key,
      bojHandle: '',
      query: '',
    },
  });
  const [curType, setCurType] = useState(params.condition.type);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params.page + 1);
  const [keyword, setKeyword] = useState('');
  const [postList, setPostList] = useState([]);
  const [title, setTitle] = useState(getTypeLabel(boardType.FREE.key));
  const { data: postsInfo, mutate: mutatePosts } = useSWR(
    `${BRD_PREFIX_URL}/all/condition?page=${params.page}&size=${params.size}`,
    postFetcher(params.condition),
  );
  const [writeMode, setWriteMode] = useState(false);
  const [showTypeTitle, setShowTypeTitle] = useState(false);
  const closeWriteMode = useCallback(() => {
    setWriteMode(false);
  }, []);

  useEffect(() => {
    mutatePosts();
  }, [params]);

  const changeParams = useCallback((bojHandle, type, query) => {
    const newParams = cloneDeep(params);
    if (bojHandle != params.condition.bojHandle) {
      newParams.condition.bojHandle = bojHandle;
      newParams.page = 0;
    }
    if (type != params.condition.type) {
      newParams.condition.type = type;
      newParams.page = 0;
    }
    if (query != params.condition.query) {
      newParams.condition.query = query;
      newParams.page = 0;
    }
    setParams(newParams);
  }, []);

  // 현재 타입 바뀌면 다시 로드
  useEffect(() => {
    if (!curType) return;
    setTitle(getTypeLabel(curType));
    if (curType === boardType.SEARCH.key) {
      return;
    }
    if (curType === boardType.MY.key) {
      if (!loginUser) return;
      changeParams(loginUser.claim, '', '');
      setShowTypeTitle(true);
    } else {
      changeParams('', curType, '');
      setShowTypeTitle(false);
    }
  }, [curType]);

  // 페이지 바뀌면 다시 로드
  useEffect(() => {
    const newParams = cloneDeep(params);
    newParams.page = page - 1;
    setParams(newParams);
  }, [page]);

  // 응답 받은 게시물 데이터 가공
  useEffect(() => {
    if (!postsInfo) return;
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
      setCurType(boardType.SEARCH.key);
      changeParams('', '', keyword);
      setShowTypeTitle(true);
    },
    [keyword],
  );

  // 글 쓰기 버튼 누르면 글쓰기 컴포넌트 보여주기
  if (writeMode) {
    return (
      <Write
        mode={writeType.WRITE}
        type={curType}
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
              selected={curType == category.key}
              onClick={() => {
                setCurType(category.key);
              }}
            >
              {category.label}
            </Category>
          ))}
        </CategoryWrapper>
      </HeaderWrapper>
      {/* 게시글 테이블 */}
      <Card>
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
          {/* 테이블 */}
          <BoardTable postList={postList} showTypeTitle={showTypeTitle} />
        </div>
        {/* 페이지네이션  */}
        {Math.ceil(total / BOARD_PAGE_SIZE) > 1 && (
          <PageWrapper>
            <Pagination
              totalPage={Math.ceil(total / BOARD_PAGE_SIZE)}
              limit={5}
              page={params.page + 1}
              setPage={setPage}
            />
          </PageWrapper>
        )}
      </Card>
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
