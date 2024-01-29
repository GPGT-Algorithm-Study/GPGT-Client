import React, { useCallback, useEffect, useState } from 'react';
import {
  Form,
  ButtonWrapper,
  Button,
  CategoryWrapper,
  Category,
  FormItem,
  Container,
  Title,
} from './style';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { FileDrop } from 'react-file-drop';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { boardType, writeType } from 'utils/board';
import { createPost, updatePost } from 'api/board';
import { BackButton } from '../Detail/style';
import { getProblemInfo } from 'api/problem';
import BoardProblemCard from '../BoardProblemCard';
import useSWR from 'swr';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 게시판 글 작성 컴포넌트
 */
function Write({ mode, type, closeWriteMode, post }) {
  const [categories, setCategories] = useState([
    boardType.FREE,
    boardType.PS,
    boardType.QUES,
  ]);
  const [selectedCategory, setSelectedCategory] = useState(boardType.FREE.key);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [problemId, setProblemId] = useState('');
  const [boardColor, setBoardColor] = useState(false);
  const [problemInfo, setProblemInfo] = useState({});
  const [hasProblemType, setHasProblemType] = useState(false);
  const [hasProblemInfo, setHasProblemInfo] = useState(false);
  const navigate = useNavigate();

  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  useEffect(() => {
    if (!loginUser) return;
    if (loginUser.manager) {
      setCategories((prev) => [...prev, boardType.NOTICE]);
    }
  }, [loginUser]);

  useEffect(() => {
    if (type === boardType.NOTICE.key && !loginUser.manager) {
      return;
    }
    if (type === boardType.SEARCH.key || type === boardType.MY.key) {
      return;
    }
    setSelectedCategory(type);
  }, [type]);

  useEffect(() => {
    setHasProblemInfo(!isEmpty(problemInfo));
    if (!isEmpty(problemInfo) && selectedCategory === boardType.PS.key) {
      setTitle(`${problemInfo.problemId}번 : ${problemInfo.titleKo}`);
    }
  }, [problemInfo]);

  // 문제 풀이, 질문 게시판에만 문제 번호 필요
  useEffect(() => {
    setHasProblemType(
      selectedCategory === boardType.PS.key ||
        selectedCategory === boardType.QUES.key,
    );
  }, [selectedCategory]);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeProblemId = useCallback((e) => {
    setProblemId(e.target.value);
  }, []);

  const onClose = useCallback(() => {
    closeWriteMode();
    setTitle('');
    setContent('');
  }, []);

  // 편집일 경우 기존 정보 불러오기
  useEffect(() => {
    if (!isEmpty(post) && mode === writeType.EDIT) {
      setTitle(post.title);
      setContent(post.content);
      if (post.problemId) {
        setProblemId(post.problemId);
        onClickProblemButton(post.problemId);
      }
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
    setTitle(title.trim());
    return true;
  }, [title, content]);

  // 게시글 업로드
  const writePost = useCallback(() => {
    const newPost = {
      type: selectedCategory,
      bojHandle: loginUser.claim,
      title,
      content,
      imageUUIDs: uuidList,
    };
    if (hasProblemType && hasProblemInfo) {
      newPost.problemId = problemId;
    }
    createPost(newPost)
      .then((res) => {
        toast.success('글을 작성하였습니다.');
        navigate(`/board/${res.data.id}`);
      })
      .catch((e) => {
        toast.error('글을 작성하는데 실패하였습니다.');
      });
  }, [
    uuidList,
    title,
    content,
    selectedCategory,
    problemId,
    hasProblemType,
    hasProblemInfo,
  ]);

  // 컨텐츠에서 이미지 uuid만 파싱
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
      bojHandle: loginUser.claim,
      title,
      content,
      imageUUIDs: getImageUuids(content),
    };
    if (hasProblemType && hasProblemInfo) {
      newPost.problemId = problemId;
    }
    updatePost(newPost)
      .then(() => {
        toast.success('글을 수정하였습니다.');
        closeWriteMode();
      })
      .catch((e) => {
        toast.error('글을 수정하는데 실패하였습니다.');
      });
  }, [
    title,
    content,
    selectedCategory,
    problemId,
    hasProblemType,
    hasProblemInfo,
  ]);

  // 작성 버튼 클릭. 유효성 검사 후 작성이면 작성 수정이면 수정 함수 호출
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
  }, [
    uuidList,
    title,
    content,
    selectedCategory,
    problemId,
    hasProblemType,
    hasProblemInfo,
  ]);

  // 문제 입력 버튼 클릭 핸들러
  const onClickProblemButton = useCallback((id) => {
    getProblemInfo({ problemId: id.toString() })
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            const { data } = res;
            setProblemInfo(data);
          }
        } else {
          toast.error('존재하지 않는 문제 입니다.');
          setProblemInfo({});
          if (selectedCategory === boardType.PS.key) {
            setTitle('');
          }
        }
      })
      .catch((e) => {
        toast.error('존재하지 않는 문제 입니다.');
        setProblemInfo({});
        if (selectedCategory === boardType.PS.key) {
          setTitle('');
        }
      });
  }, []);

  return (
    <Container>
      <Title>
        <BackButton onClick={onClose} size="24" />
        {mode === writeType.WRITE ? '글 작성' : '글 수정'}
      </Title>
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
        {/* 문제 번호 입력 (질문게시판, 문제풀이 게시판일 경우에만 제공) */}
        {hasProblemType && (
          <>
            <FormItem width="50%">
              <div>
                <input
                  value={problemId}
                  onChange={onChangeProblemId}
                  placeholder="문제 번호를 입력해주세요"
                  type="number"
                />
                <button
                  onClick={() => {
                    onClickProblemButton(problemId);
                  }}
                >
                  입력
                </button>
              </div>
            </FormItem>
            {hasProblemInfo && <BoardProblemCard problem={problemInfo} />}
          </>
        )}
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
