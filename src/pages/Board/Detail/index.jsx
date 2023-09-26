import React, { useCallback, useState } from 'react';
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
  Container,
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
    <Container>
      <Link to="/board">
        <BackButton size="25" />
      </Link>
      <Title>{post.title}</Title>
      <Toolbar>
        <WriteInfo>
          <Writer>
            <div>
              {post.bojHandle} {post.emoji}
            </div>
          </Writer>
          <CreateDate>
            {dayjs(post.createDate).format('YYYY년 M월 DD일 hh:mm')}
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
    </Container>
  );
}

export default Detail;
