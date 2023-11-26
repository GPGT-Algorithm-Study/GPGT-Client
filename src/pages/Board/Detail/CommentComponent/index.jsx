import React, { useCallback, useEffect, useState } from 'react';
import {
  CommentInfo,
  CommentList,
  ReplyButton,
  CommentWrapper,
  ReplyList,
} from './style';
import { createComment } from 'api/comment';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Comment from './Comment';
import MentionInput from 'components/MentionInput';
import useSWR from 'swr';
import { CMT_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 댓글 컴포넌트
 */
function CommentComponent({ boardId }) {
  const [commentList, setCommentList] = useState([]); // 구조화된 댓글 정보
  const [commentContent, setCommentContent] = useState(''); // 입력 중인 댓글 내용
  const [replyContentMap, setReplyContentMap] = useState({}); // 입력중인 답글 내용
  const [showReplyMap, setShowReplyMap] = useState({}); // 답글 보여주기 여부 값

  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: allCommentList, mutate } = useSWR(
    `${CMT_PREFIX_URL}/all?boardId=${boardId}`,
    fetcher,
  );

  const toggleShowReply = (key) => {
    setShowReplyMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const onChangeComment = useCallback((e) => {
    setCommentContent(e.target.value);
  }, []);
  const onChangeReply = useCallback((e, parentId) => {
    setReplyContentMap({ ...replyContentMap, [parentId]: e.target.value });
  }, []);

  // 답글을 댓글 하위 필드 배열로 넣어주는 함수
  const getOrganizeComments = useCallback((comments) => {
    const commentsMap = {};
    const tmpReplyContentMap = {};

    comments.forEach((comment) => {
      if (!comment.parentCommentId) {
        // parentCommentId가 없는 경우 바로 commentsMap에 추가
        comment.replyList = [];
        // 답글 내용 초기화
        tmpReplyContentMap[comment.id] = '';
        commentsMap[comment.id] = comment;
      } else {
        // parentCommentId가 있는 경우 replyList에 추가
        const parentComment = commentsMap[comment.parentCommentId];
        if (!parentComment.replyList) {
          parentComment.replyList = [];
        }
        parentComment.replyList.push(comment);
      }
    });
    // parentCommentId가 있는 객체는 원본 배열에서 삭제
    comments = comments.filter((comment) => !comment.parentCommentId);
    setReplyContentMap(tmpReplyContentMap);
    return comments;
  }, []);

  // 모든 댓글 내용으로 댓글 구조화
  useEffect(() => {
    if (!isEmpty(allCommentList))
      setCommentList(getOrganizeComments(allCommentList));
  }, [allCommentList]);

  // 댓글 작성
  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (!loginUser) return;
      if (isEmpty(commentContent.trim())) {
        toast.error('댓글 내용을 입력해주세요.');
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: loginUser.claim,
        content: commentContent.trim(),
      };
      createComment(commentInfo)
        .then(() => {
          mutate();
          setCommentContent('');
        })
        .catch((e) => {
          toast.error('댓글을 작성하는데 실패하였습니다.');
        });
    },
    [commentContent],
  );

  // 답글 작성
  const onSubmitReply = useCallback(
    (e, parentCommentId) => {
      e.preventDefault();
      if (!loginUser) return;
      if (isEmpty(replyContentMap[parentCommentId].trim())) {
        toast.error('댓글 내용을 입력해주세요.');
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: loginUser.claim,
        content: replyContentMap[parentCommentId].trim(),
        parentCommentId: parentCommentId,
      };
      createComment(commentInfo)
        .then(() => {
          mutate();
          setReplyContentMap({ ...replyContentMap, [parentCommentId]: '' });
        })
        .catch((e) => {
          toast.error('댓글을 작성하는데 실패하였습니다.');
        });
    },
    [replyContentMap],
  );

  if (!allCommentList) return null;

  return (
    <div>
      {/* 댓글 정보, input 폼 */}
      <CommentInfo>{allCommentList.length} 개의 댓글</CommentInfo>
      <MentionInput
        onChangeComment={onChangeComment}
        onSubmitComment={onSubmitComment}
        commentContent={commentContent}
      />
      {/* 댓글 목록 */}
      <CommentList>
        {commentList.map((comment) => (
          <CommentWrapper key={comment.id}>
            <Comment comment={comment} />
            <ReplyButton
              onClick={() => {
                toggleShowReply(comment.id);
              }}
            >
              {showReplyMap[comment.id] ? '답글 접기' : '답글 보기'} (
              {comment.replyList.length})
            </ReplyButton>
            {/* 답글 목록 */}
            {showReplyMap[comment.id] && (
              <>
                {!isEmpty(comment.replyList) && (
                  <ReplyList>
                    {comment.replyList.map((reply) => (
                      <Comment key={reply.id} comment={reply} reply />
                    ))}
                  </ReplyList>
                )}
                <MentionInput
                  onChangeComment={(e) => {
                    onChangeReply(e, comment.id);
                  }}
                  commentContent={replyContentMap[comment.id] || ''}
                  onSubmitComment={(e) => {
                    onSubmitReply(e, comment.id);
                  }}
                />
              </>
            )}
          </CommentWrapper>
        ))}
      </CommentList>
    </div>
  );
}

export default CommentComponent;
