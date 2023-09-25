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
import axios from 'axios';
import { boardType } from 'utils/board';
import { createPost } from 'api/board';

/**
 * 게시판 글 작성 컴포넌트
 */
function Write({ post }) {
  const categories = [boardType.FREE, boardType.PS, boardType.QUES];
  const user = useSelector((state) => state.user);
  if (user.isAdmin) {
    categories.push(boardType.NOTICE);
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

  // 업로드할 이미지의 uuid 리스트 (공백 없이 , 로 구분)
  const [uuidList, setUuidList] = useState('');
  // 유효성 검사
  const validate = useCallback(() => {
    if (isEmpty(title.trim())) {
      toast.error('제목을 입력해주세요');
      return false;
    }
    if (isEmpty(content.trim())) {
      toast.error('내용을 입력해주세요');
      return false;
    }
    setContent(content.trim());
    setTitle(title.trim());
    return true;
  }, [title, content]);
  // 게시글 업로드
  const writePost = useCallback(() => {
    if (!validate()) {
      return;
    }
    const post = {
      type: selectedCategory.key,
      bojHandle: user.bojHandle,
      title,
      content,
      imageUUIDs: uuidList,
    };
    createPost(post)
      .then((res) => {
        toast.success('글을 작성하였습니다.');
        navigate(`/board/${res.data.id}`);
      })
      .catch((e) => {
        toast.error('글을 작성하는데 실패하였습니다.');
      });
  }, [uuidList, title, content, selectedCategory]);

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
                key={category.key}
                selected={selectedCategory.key == category.key}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category.label}
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
                  axios
                    .post('/api/v1/image/s3/upload', formdata, headers)
                    .then(function (res) {
                      const imageName = res.data.url;
                      const newContent = `${content}\n\n![${files[0].name}](${imageName})`;
                      setContent(newContent);
                      const uuid = imageName.split('/').slice(-1)[0];
                      setUuidList((prev) => {
                        if (isEmpty(prev)) return uuid;
                        return `${prev},${uuid}`;
                      });
                    });
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
                data-color-mode="light"
              />
            </FileDrop>
          </div>
        </FormItem>
        <ButtonWrapper>
          <Button primary onClick={writePost}>
            작성
          </Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonWrapper>
      </Form>
    </div>
  );
}

export default Write;
