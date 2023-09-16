import React, { useCallback, useEffect, useState } from 'react';
import {
  Form,
  ButtonWrapper,
  Button,
  CategoryWrapper,
  Category,
  FormItem,
} from './style';
import { CommonTitle } from 'style/commonStyle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import { FileDrop } from 'react-file-drop';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

/**
 * 게시판 글 작성 컴포넌트
 */
function Write({ post }) {
  const categories = ['자유게시판', '문제풀이'];
  const user = useSelector((state) => state.user);
  if (user.isAdmin) {
    categories.push('공지사항');
  }
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardColor, setBoardColor] = useState(false);
  const navigate = useNavigate();

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onClose = useCallback(() => {
    navigate('/board');
    setTitle('');
    setContent('');
  }, []);

  return (
    <div>
      <CommonTitle>글 쓰기</CommonTitle>
      <Form>
        <FormItem>
          제목
          <div className="item">
            <input value={title} onChange={onChangeTitle}></input>
          </div>
        </FormItem>
        <FormItem>
          카테고리
          <CategoryWrapper className="item">
            {categories.map((category) => (
              <Category
                key={category}
                selected={selectedCategory == category}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </Category>
            ))}
          </CategoryWrapper>
        </FormItem>
        <FormItem>
          내용
          <div className="item">
            <FileDrop
              onDragOver={(e) => {
                setBoardColor(true);
              }}
              onDragLeave={(e) => {
                setBoardColor(false);
              }}
              onDrop={(files, e) => {
                const formdata = new FormData();
                formdata.append('file', files[0]);
                const headers = { 'Content-Type': files[0].type };
                if (files[0].size >= 5000000) {
                  alert('5MB 이상 파일은 업로드가 불가능합니다.');
                } else if (
                  files[0].type == 'image/png' ||
                  files[0].type == 'image/jpeg' ||
                  files[0].type == 'image/jpg'
                ) {
                  //   axios
                  //     .post('api url을 입력하세요.', formdata, headers)
                  //     .then(function (res) {
                  //       const imageName = res.data;
                  //       const newValue =
                  //         value +
                  //         '\n\n ![' +
                  //         files[0].name +
                  //         '](https://image.fleaman.shop/' +
                  //         imageName +
                  //         ')';
                  //       setValue(newValue);
                  //     });
                } else {
                  toast.error('png, jpg, jpeg 파일이 아닙니다.');
                }
                setBoardColor(false);
              }}
            >
              <MDEditor
                height={350}
                value={content}
                onChange={setContent}
                style={{
                  backgroundColor: boardColor ? '#d6e3ef' : null,
                  fontWeight: 'normal',
                }}
              />
            </FileDrop>
          </div>
        </FormItem>
        <ButtonWrapper>
          <Button primary>작성</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}

export default Write;
