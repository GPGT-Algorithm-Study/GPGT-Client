import React, { useCallback, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Title,
  Toolbar,
  Writer,
  CreateDate,
  Button,
  WriteInfo,
  Content,
  CommentWrapper,
  BackButton,
} from './style';
import CommentComponent from './CommentComponent';
import { Link, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from 'hooks/useFetch';
import { deletePost, getPost } from 'api/board';
import { toast } from 'react-toastify';
import Write from '../Write';
import { writeType } from 'utils/board';
import { CommonProfileImage } from 'style/commonStyle';
import BoardProblemCard from '../BoardProblemCard';
import { getProblemInfo } from 'api/problem';
import { isEmpty } from 'lodash';

/**
 * 게시판 글 상세 컴포넌트
 */
function Detail() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [post, fetchPost] = useFetch(getPost, {}, { boardId: id }, () => {
    navigate('/board');
  });
  const navigate = useNavigate();
  const [writeMode, setWriteMode] = useState(false);
  const [problemInfo, setProblemInfo] = useState(false);
  const [hasProblem, setHasProblem] = useState(false);

  // 게시글에 문제 정보 있으면 가져오기
  useEffect(() => {
    if (post.problemId) {
      getProblemInfo({ problemId: post.problemId.toString() })
        .then((res) => {
          if (res.status == 200) {
            if (res.data) {
              const { data } = res;
              setProblemInfo(data);
            }
          } else {
            toast.error('존재하지 않는 문제 입니다.');
            setProblemInfo({});
          }
        })
        .catch((e) => {
          toast.error('존재하지 않는 문제 입니다.');
          setProblemInfo({});
        });
    }
  }, [post]);

  useEffect(() => {
    setHasProblem(!isEmpty(problemInfo));
  }, [problemInfo]);

  // 글 삭제
  const onClickDeletePost = useCallback(() => {
    deletePost({ boardId: id })
      .then(() => {
        toast.success('글을 삭제했습니다.');
        navigate('/board');
      })
      .catch((e) => {
        toast.error('글을 삭제하지 못하였습니다.');
      });
  }, [id]);

  const closeWriteMode = useCallback(() => {
    fetchPost();
    setWriteMode(false);
  }, []);

  if (writeMode) {
    return (
      <Write
        mode={writeType.EDIT}
        type={post.type}
        closeWriteMode={closeWriteMode}
        post={post}
      />
    );
  }

  return (
    <>
      <div>
        <BackButton
          size="25"
          onClick={() => {
            navigate(-1);
          }}
        />
        <Title>{post.title}</Title>
        <Toolbar>
          <WriteInfo>
            <Link to={`/my-page/${post.bojHandle}`}>
              <Writer>
                <CommonProfileImage
                  width={20}
                  height={20}
                  src={post.profileImg}
                />
                <div>
                  {post.notionId} {post.emoji}
                </div>
              </Writer>
            </Link>
            <CreateDate>
              {dayjs(post.createdDate).format('YYYY년 M월 DD일 hh:mm')}
            </CreateDate>
          </WriteInfo>
          <WriteInfo>
            {user.bojHandle == post.bojHandle && (
              <>
                <Button
                  onClick={() => {
                    setWriteMode(true);
                  }}
                >
                  수정
                </Button>
                <Button onClick={onClickDeletePost}>삭제</Button>
              </>
            )}
          </WriteInfo>
        </Toolbar>
        {hasProblem && <BoardProblemCard problem={problemInfo} />}
        <Content data-color-mode="light">
          <MDEditor.Markdown
            style={{
              padding: 10,
              backgroundColor: 'transparent',
            }}
            source={post.content}
            autoFocus={false}
          />
        </Content>
        <CommentWrapper>
          <CommentComponent boardId={id} />
        </CommentWrapper>
      </div>
    </>
  );
}

export default Detail;
