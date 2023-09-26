import React, { useCallback, useEffect, useState } from 'react';
import {
  WriteInfo,
  Writer,
  CreateDate,
  ReplyButton,
  FlexWrapper,
  ReplyWrapper,
  CommentWrapper,
  Input,
} from './style';
import { deleteComment, updateComment } from 'api/comment';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { CommonProfileImage } from 'style/commonStyle';
import { Link } from 'react-router-dom';

/**
 * 댓글 한개 컴포넌트
 */
function Comment({ comment, fetchComment, reply = false }) {
  const user = useSelector((state) => state.user); // 로그인한 사용자
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (isEmpty(comment)) return;
    setEditContent(comment.content);
  }, [comment]);

  const onChangeEditContent = useCallback((e) => {
    setEditContent(e.target.value);
  }, []);

  // 댓글 삭제
  const onClickDeleteComment = useCallback(() => {
    deleteComment({ commentId: comment.id })
      .then(() => {
        toast.success('댓글을 삭제하였습니다.');
        fetchComment();
      })
      .catch((e) => {
        toast.error('댓글을 삭제하지 못하였습니다.');
      });
  }, [comment]);

  // 댓글 수정 버튼 클릭
  const onClickUpdateComment = useCallback(
    (e) => {
      e.preventDefault();
      if (editMode) {
        const newComment = {
          ...comment,
          commentId: comment.id,
          content: editContent,
        };
        delete newComment.replyList;
        delete newComment.id;
        updateComment(newComment)
          .then(() => {
            toast.success('댓글을 수정하였습니다.');
            fetchComment();
            setEditMode(false);
          })
          .catch((e) => {
            toast.error('댓글을 수정하지 못하였습니다.');
          });
        setEditMode(false);
      } else {
        setEditMode(true);
      }
    },
    [editMode, editContent],
  );

  // 댓글 내용 컴포넌트
  const CommentContent = (
    <div>
      {editMode ? (
        <form onSubmit={onClickUpdateComment}>
          <Input value={editContent} onChange={onChangeEditContent} />
        </form>
      ) : (
        comment.content
      )}
    </div>
  );

  return (
    <div>
      <WriteInfo>
        <Link to={`/my-page/${comment.bojHandle}`}>
          <Writer>
            {reply && (
              <BsArrowReturnRight
                style={{ color: 'var(--color-textgrey)', marginRight: '5px' }}
              />
            )}
            <CommonProfileImage
              width={20}
              height={20}
              src={comment.profileImg}
            />
            <div>{comment.notionId}</div>
            <CreateDate key={comment.id}>
              {dayjs(comment.createdDate).format('YYYY.MM.DD HH:MM')}
            </CreateDate>
          </Writer>
        </Link>
        {user.bojHandle === comment.bojHandle && (
          <FlexWrapper>
            <ReplyButton onClick={onClickUpdateComment}>
              {editMode ? '완료' : '수정'}
            </ReplyButton>
            <ReplyButton
              onClick={() => {
                onClickDeleteComment();
              }}
            >
              삭제
            </ReplyButton>
          </FlexWrapper>
        )}
      </WriteInfo>
      {reply ? (
        <ReplyWrapper>{CommentContent}</ReplyWrapper>
      ) : (
        <CommentWrapper>{CommentContent}</CommentWrapper>
      )}
    </div>
  );
}

export default Comment;
