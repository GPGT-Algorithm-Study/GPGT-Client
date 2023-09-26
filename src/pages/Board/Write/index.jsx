import React, { useCallback, useEffect, useState } from 'react';
import {
  Form,
  ButtonWrapper,
  Button,
  CategoryWrapper,
  Category,
  FormItem,
  Container,
} from './style';
import { CommonTitle } from 'style/commonStyle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import { FileDrop } from 'react-file-drop';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { boardType, writeType } from 'utils/board';
import { createPost, updatePost } from 'api/board';
import { BackButton } from '../Detail/style';

/**
 * 게시판 글 작성 컴포넌트
 */
function Write({ mode, type, closeWriteMode, post }) {
  const categories = [boardType.FREE, boardType.PS, boardType.QUES];
  const user = useSelector((state) => state.user);
  if (user.isAdmin) {
    categories.push(boardType.NOTICE);
  }
  const [selectedCategory, setSelectedCategory] = useState(type);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardColor, setBoardColor] = useState(false);
  const navigate = useNavigate();

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onClose = useCallback(() => {
    closeWriteMode();
    setTitle('');
    setContent('');
  }, []);

  useEffect(() => {
    if (!isEmpty(post) && mode === writeType.EDIT) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [mode, post]);

  // 업로드할 이미지의 uuid 리스트 (공백 없이 , 로 구분)
  const [uuidList, setUuidList] = useState('');
  // 유효성 검사
  const validate = useCallback(() => {
    if (isEmpty(title.trim())) {
      toast.error('제목을 입력해주세요');
      return false;
    }
    if (isEmpty(content)) {
      toast.error('내용을 입력해주세요');
      return false;
    }
    setitle(title.trim());
    return true;
  }, [title, content]);

  // 게시글 업로드
  const writePost = useCallback(() => {
    const newPost = {
      type: selectedCategory,
      bojHandle: user.bojHandle,
      title,
      content,
      imageUUIDs: uuidList,
    };
    createPost(newPost)
      .then((res) => {
        toast.success('글을 작성하였습니다.');
        navigate(`/board/${res.data.id}`);
      })
      .catch((e) => {
        toast.error('글을 작성하는데 실패하였습니다.');
      });
  }, [uuidList, title, content, selectedCategory]);

  const getImageUuids = useCallback((markdownContent) => {
    const regex = /!\[\]\((.*?)\)/g;
    const uuids = [];
    let match;
    while ((match = regex.exec(markdownContent)) !== null) {
      const uuid = match[1].split('/').splice(-1)[0];
      uuids.push(uuid);
    }
    return uuids.join(',');
  }, []);

  // 게시글 수정
  const editPost = useCallback(() => {
    const newPost = {
      boardId: post.id,
      type: selectedCategory,
      bojHandle: user.bojHandle,
      title,
      content,
      imageUUIDs: getImageUuids(content),
    };
    updatePost(newPost)
      .then((res) => {
        toast.success('글을 수정하였습니다.');
        closeWriteMode();
      })
      .catch((e) => {
        toast.error('글을 수정하는데 실패하였습니다.');
      });
  }, [uuidList, title, content, selectedCategory]);

  const onClickWriteButton = useCallback(() => {
    if (!validate()) {
      return;
    }
    if (mode === writeType.WRITE) {
      writePost();
      return;
    }
    editPost();
    return;
  }, [uuidList, title, content, selectedCategory]);

  return (
    <Container>
      <BackButton onClick={onClose} size="24" />
      <CommonTitle>
        {mode === writeType.WRITE ? '글 작성' : '글 수정'}
      </CommonTitle>
      <Form>
        <FormItem>
          <div>
            <input
              value={title}
              onChange={onChangeTitle}
              placeholder="제목"
            ></input>
          </div>
        </FormItem>
        <FormItem>
          <CategoryWrapper>
            {categories.map((category) => (
              <Category
                key={category.key}
                selected={selectedCategory == category.key}
                onClick={() => {
                  setSelectedCategory(category.key);
                }}
              >
                {category.label}
              </Category>
            ))}
          </CategoryWrapper>
        </FormItem>
        <FormItem>
          <div>
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
                height={600}
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
          <Button primary onClick={onClickWriteButton} width="100px">
            작성
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default Write;
