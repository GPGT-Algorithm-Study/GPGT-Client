import React, { useCallback, useEffect, useState } from 'react';
import {
  HeaderWrapper,
  Category,
  CategoryWrapper,
  BoardTitleWrapper,
  TitleWrapper,
  BoardHeader,
  PageWrapper,
  SearchForm,
  Container,
  BoardContent,
  WriteButton,
  PostItem,
  PostTitle,
  PostInfo,
  PostContent,
  NoPost,
} from './style';
import { cloneDeep } from 'lodash';
import Pagination from 'components/Pagination';
import { boardType, getTypeLabel, writeType } from 'utils/board';
import Write from './Write';
import useSWR from 'swr';
import postFetcher from 'utils/postFetcher';
import {
  BOARD_PAGE_SIZE,
  BRD_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';
import fetcher from 'utils/fetcher';
import PageTitle from 'components/PageTitle';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

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
  const navigate = useNavigate();
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
      <TitleWrapper>
        <PageTitle title="게시판" />
        <WriteButton
          onClick={() => {
            setWriteMode(true);
          }}
        >
          작성하기
        </WriteButton>
      </TitleWrapper>
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
      <div>
        <BoardHeader>
          <BoardTitleWrapper>
            <p>{total} 개의 게시글</p>
          </BoardTitleWrapper>
          <SearchForm onSubmit={onSubmitSearchKeyword}>
            <input
              placeholder="검색어 입력"
              value={keyword}
              onChange={onChangeKeyword}
            />
          </SearchForm>
        </BoardHeader>
        {/* 게시판 내용 */}
        <BoardContent>
          {postsInfo ? (
            postList.length === 0 ? (
              <NoPost>작성된 게시글이 없습니다.</NoPost>
            ) : (
              postList.map((post) => (
                <PostItem
                  key={post.id}
                  onClick={() => {
                    navigate(`/board/${post.id}`);
                  }}
                >
                  <PostTitle>
                    {showTypeTitle && `[${getTypeLabel(post.type)}] `}
                    {post.title}
                  </PostTitle>
                  <PostContent>{post.content}</PostContent>
                  <PostInfo>
                    <div>
                      {post.notionId} {post.emoji}
                    </div>
                    <div>{dayjs(post.createdDate).format('YYYY. MM. DD')}</div>
                    <div>{post.commentCount}개의 댓글</div>
                  </PostInfo>
                </PostItem>
              ))
            )
          ) : (
            new Array(10).fill(0).map((_, i) => (
              <PostItem key={i}>
                <Skeleton width={200} height={20} />
                <Skeleton width="100%" count={3} />
                <PostInfo>
                  <Skeleton width={70} />
                  <Skeleton width={70} />
                  <Skeleton width={70} />
                </PostInfo>
              </PostItem>
            ))
          )}
        </BoardContent>
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
    </Container>
  );
}

export default Board;
