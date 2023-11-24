import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  WriteInfo,
  Writer,
  CreateDate,
  ReplyButton,
  FlexWrapper,
  ReplyWrapper,
  CommentWrapper,
  MentionName,
} from './style';
import { deleteComment, updateComment } from 'api/comment';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { BsArrowReturnRight } from 'react-icons/bs';
import { isEmpty } from 'lodash';
import { CommonProfileImage } from 'style/commonStyle';
import { Link } from 'react-router-dom';
import regexifyString from 'regexify-string';
import MentionInput from 'components/MentionInput';
import useSWR from 'swr';
import { USER_PREFIX_URL, CMT_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 댓글 한개 컴포넌트
 */
function Comment({ comment, reply = false }) {
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  const { mutate: mutateAllComment } = useSWR(
    `${CMT_PREFIX_URL}/all?boardId=${comment.boardId}`,
    fetcher,
  );

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
        mutateAllComment();
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
            mutateAllComment();
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

  const result = useMemo(() => {
    return regexifyString({
      input: comment.content,
      pattern: /@\[[^\]]+\]\([^)]+\)/g,
      decorator(match, index) {
        const arr = match.match(/@\[[^\]]+\]\([^)]+\)/);
        if (arr) {
          const regex = /@\[[^\]]+\]\(([^)]+)\)/g;
          const match = regex.exec(arr[0]);
          const name = match[1];
          return <MentionName key={index}>@{name}</MentionName>;
        }
      },
    });
  }, [comment]);

  // 댓글 내용 컴포넌트
  const CommentContent = (
    <div>
      {editMode ? (
        <MentionInput
          onSubmitComment={onClickUpdateComment}
          onChangeComment={onChangeEditContent}
          commentContent={editContent}
        />
      ) : (
        <div>{result}</div>
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
              src={
                comment.profileImg != 'null'
                  ? comment.profileImg
                  : 'https://static.solved.ac/misc/360x360/default_profile.png'
              }
            />
            <div>{comment.notionId}</div>
            <CreateDate key={comment.id}>
              {dayjs(comment.createdDate).format('YYYY.MM.DD HH:mm')}
            </CreateDate>
          </Writer>
        </Link>
        {loginUser && loginUser.claim === comment.bojHandle && (
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
