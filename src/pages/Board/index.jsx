import React, { useCallback, useEffect, useState } from 'react';
import { CommonTitle, CommonProfileImage } from 'style/commonStyle';
import {
  HeaderWrapper,
  Category,
  CategoryWrapper,
  Table,
  PostInfo,
  BoardTitleWrapper,
  BoardHeader,
  PageWrapper,
  SearchForm,
  WriteButton,
} from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import Pagination from 'components/Pagination';

/**
 * 게시판 탭 내용 컴포넌트
 */
function Board() {
  const SIZE = 10;
  const categories = ['자유게시판', '문제풀이', '공지사항', '내가 쓴 글'];
  const [curCategory, setCurCategory] = useState(categories[0]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  // 임시데이터
  const [postList] = useState([
    {
      id: '1',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '2',
      title: '컨벡스헐',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '3',
      title: '아니 제목 글자 제한을 둬야할 것 같기도 하고',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '4',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '5',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '6',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '7',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '8',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '9',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
    {
      id: '10',
      title: '다익스트라 알고리즘',
      writer: 'klloo',
      emoji: '🏖️',
      date: new Date(),
    },
  ]);
  // 임시
  useEffect(() => {
    setTotal(35);
  }, []);

  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  return (
    <>
      <HeaderWrapper>
        <CategoryWrapper>
          {categories.map((category) => (
            <Category
              key={category}
              selected={curCategory == category}
              onClick={() => {
                setCurCategory(category);
              }}
            >
              {category}
            </Category>
          ))}
        </CategoryWrapper>
      </HeaderWrapper>
      <BoardHeader>
        <BoardTitleWrapper>
          <CommonTitle>{curCategory}</CommonTitle>
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
              <td>{post.title} (2)</td>
              <PostInfo>{post.writer}</PostInfo>
              <PostInfo>{dayjs(post.date).format('YYYY-MM-DD')}</PostInfo>
            </tr>
          ))}
        </tbody>
      </Table>
      <PageWrapper>
        <Pagination
          totalPage={Math.ceil(total / SIZE)}
          limit={5}
          page={page}
          setPage={setPage}
        />
      </PageWrapper>
      <WriteButton
        primary
        onClick={() => {
          navigate('/board/write');
        }}
      >
        <BsFillPencilFill />
      </WriteButton>
    </>
  );
}

export default Board;
