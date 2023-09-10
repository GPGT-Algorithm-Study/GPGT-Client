import React, { useState } from 'react';
import { Form, ButtonWrapper, Button } from './style';
import { CommonTitle } from 'style/commonStyle';
import { useNavigate } from 'react-router-dom';

/**
 * 게시판 글 작성 컴포넌트
 */
function Write() {
  const categories = ['자유게시판', '문제풀이', '공지사항'];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();

  return (
    <div>
      <CommonTitle>글 쓰기</CommonTitle>
      <Form>
        <ButtonWrapper>
          <Button primary>작성</Button>
          <Button
            onClick={() => {
              navigate('/board');
            }}
          >
            취소
          </Button>
        </ButtonWrapper>
      </Form>
      {/* <CategoryWrapper>
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
      </CategoryWrapper> */}
    </div>
  );
}

export default Write;
