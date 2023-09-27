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
import { isEmpty, cloneDeep } from 'lodash';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from 'components/Pagination';
import { boardType, writeType, SIZE, getTypeLabel } from 'utils/board';
import useFetch from 'hooks/useFetch';
import { getPostsByCondition } from 'api/board';
import Write from './Write';
import { useDispatch, useSelector } from 'react-redux';
import BoardTable from 'components/BoardTable';
import { setBoardParam, setBoardTitle } from 'redux/boardParam';

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
  const user = useSelector((state) => state.user);
  const { params, title } = useSelector((state) => state.boardParam);
  const [curType, setCurType] = useState(params.condition.type);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(params.page + 1);
  const [keyword, setKeyword] = useState('');
  const [postList, setPostList] = useState([]);
  const [postsInfo, , setPostParams] = useFetch(
    getPostsByCondition,
    [],
    params,
  );
  const [writeMode, setWriteMode] = useState(false);
  const [showTypeTitle, setShowTypeTitle] = useState(false);
  const closeWriteMode = useCallback(() => {
    setWriteMode(false);
  }, []);

  const dispatch = useDispatch();

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
    dispatch(setBoardParam(newParams));
    setPostParams(newParams);
  }, []);

  // 현재 타입 바뀌면 다시 로드
  useEffect(() => {
    if (!curType) return;
    dispatch(setBoardTitle(getTypeLabel(curType)));
    if (curType === boardType.SEARCH.key) {
      return;
    }
    if (curType === boardType.MY.key) {
      changeParams(user.bojHandle, '', '');
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
    dispatch(setBoardParam(newParams));
    setPostParams(newParams);
  }, [page]);

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
        {/* 페이지네이션  */}
        {Math.ceil(total / SIZE) > 1 && (
          <PageWrapper>
            <Pagination
              totalPage={Math.ceil(total / SIZE)}
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
