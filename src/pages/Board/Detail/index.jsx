import React, { useCallback, useEffect, useState } from 'react';
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
  Container,
  BackButton,
} from './style';
import { CommonProfileImage } from 'style/commonStyle';
import Comment from './Comment';
import { Link, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from 'hooks/useFetch';
import { deletePost, getPost } from 'api/board';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

/**
 * 게시판 글 상세 컴포넌트
 */
function Detail() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [post] = useFetch(getPost, {}, { boardId: id }, () => {
    navigate('/board');
  });
  const navigate = useNavigate();

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

  return (
    <Container>
      <Link to="/board">
        <BackButton size="25" />
      </Link>
      <Title>{post.title}</Title>
      <Toolbar>
        <WriteInfo>
          <Writer>
            {/* <CommonProfileImage
              width={20}
              height={20}
              src={
                'https://static.solved.ac/uploads/profile/fin-picture-1665752455693.png'
              }
            /> */}
            <div>
              {post.bojHandle} {post.emoji}
            </div>
          </Writer>
          <CreateDate>{dayjs(post.date).format('YYYY년 M월 DD일')}</CreateDate>
        </WriteInfo>
        <WriteInfo>
          {user.bojHandle == post.bojHandle && (
            <>
              <Link to="/board/write" post={post}>
                <Button>수정</Button>
              </Link>
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
        <Comment boardId={id} />
      </CommentWrapper>
    </Container>
  );
}

export default Detail;
