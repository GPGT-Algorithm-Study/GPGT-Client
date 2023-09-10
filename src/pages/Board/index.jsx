import React, { useState } from 'react';
import Layout from 'layouts/Layout';
import { CommonButton, CommonTitle } from 'style/commonStyle';
import {
  Category,
  CategoryWrapper,
  Table,
  BoardTitleWrapper,
  BoardHeader,
} from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 게시판 탭 내용 컴포넌트
 */
function Board() {
  const categories = ['자유게시판', '문제풀이', '공지사항'];
  const [curCategory, setCurCategory] = useState(categories[0]);
  const SIZE = 10;
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  return (
    <>
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
      <BoardHeader>
        <BoardTitleWrapper>
          <CommonTitle>{curCategory}</CommonTitle>
          <p>1 개의 게시글</p>
        </BoardTitleWrapper>
        <CommonButton
          primary
          onClick={() => {
            navigate('/board/write');
          }}
        >
          글쓰기
        </CommonButton>
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
          <tr>
            <td>다익스트라 알고리즘</td>
            <td>klloo</td>
            <td>2023-09-06</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Board;
