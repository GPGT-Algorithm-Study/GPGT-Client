import React, { useCallback, useEffect, useState } from 'react';
import {
  CommentInfo,
  InputForm,
  CommentList,
  WriteInfo,
  Writer,
  CreateDate,
  ReplyButton,
  ReplyList,
  FlexWrapper,
  ReplyContent,
  CommentContent,
} from './style';
import useFetch from 'hooks/useFetch';
import { createComment, deleteComment, getComment } from 'api/comment';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { BsArrowReturnRight } from 'react-icons/bs';

/**
 * 댓글 컴포넌트
 */
function CommentComponent({ boardId }) {
  const user = useSelector((state) => state.user);
  const [allCommentList, fetchComment] = useFetch(getComment, [], { boardId });
  const [commentList, setCommentList] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [replyContentMap, setReplyContentMap] = useState({});
  const [showReplyMap, setShowReplyMap] = useState({});

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

  useEffect(() => {
    if (!isEmpty(allCommentList))
      setCommentList(getOrganizeComments(allCommentList));
  }, [allCommentList]);

  // 댓글 작성
  const onSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      if (isEmpty(commentContent.trim())) {
        toast.error('댓글 내용을 입력해주세요.');
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: user.bojHandle,
        content: commentContent.trim(),
      };
      createComment(commentInfo)
        .then(() => {
          fetchComment();
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
      if (isEmpty(replyContentMap[parentCommentId].trim())) {
        toast.error('댓글 내용을 입력해주세요.');
        return;
      }
      const commentInfo = {
        boardId,
        bojHandle: user.bojHandle,
        content: replyContentMap[parentCommentId].trim(),
        parentCommentId: parentCommentId,
      };
      createComment(commentInfo)
        .then(() => {
          fetchComment();
          setReplyContentMap({ ...replyContentMap, [parentCommentId]: '' });
        })
        .catch((e) => {
          toast.error('댓글을 작성하는데 실패하였습니다.');
        });
    },
    [replyContentMap],
  );

  // 댓글 삭제
  const onClickDeleteComment = useCallback((commentId) => {
    deleteComment({ commentId })
      .then(() => {
        toast.success('댓글을 삭제하였습니다.');
        fetchComment();
      })
      .catch((e) => {
        toast.error('댓글을 삭제하지 못하였습니다.');
      });
  }, []);

  return (
    <div>
      <CommentInfo>{allCommentList.length} 개의 댓글</CommentInfo>
      <InputForm onSubmit={onSubmitComment}>
        <input
          placeholder="댓글 내용을 입력하세요"
          value={commentContent}
          onChange={onChangeComment}
        />
        <button>확인</button>
      </InputForm>
      <CommentList>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <WriteInfo>
              <Writer>
                <div>
                  {comment.bojHandle} {comment.emoji}
                </div>
                <CreateDate key={comment.id}>
                  {dayjs(comment.createdDate).format('YYYY.MM.DD HH:MM')}
                </CreateDate>
              </Writer>
              {user.bojHandle === comment.bojHandle && (
                <FlexWrapper>
                  <ReplyButton>수정</ReplyButton>
                  <ReplyButton
                    onClick={() => {
                      onClickDeleteComment(comment.id);
                    }}
                  >
                    삭제
                  </ReplyButton>
                </FlexWrapper>
              )}
            </WriteInfo>
            <CommentContent>{comment.content}</CommentContent>
            <ReplyButton
              onClick={() => {
                toggleShowReply(comment.id);
              }}
            >
              {showReplyMap[comment.id] ? '답글 접기' : '답글 보기'} (
              {comment.replyList.length})
            </ReplyButton>
            {showReplyMap[comment.id] && (
              <>
                <ReplyList>
                  {comment.replyList.map((reply) => (
                    <div key={reply.id}>
                      <WriteInfo>
                        <Writer>
                          <BsArrowReturnRight
                            style={{ color: 'var(--color-textgrey)' }}
                          />
                          <div>
                            {reply.bojHandle} {reply.emoji}
                          </div>
                          <CreateDate key={reply.id}>
                            {dayjs(reply.createdDate).format(
                              'YYYY.MM.DD HH:MM',
                            )}
                          </CreateDate>
                        </Writer>
                        {user.bojHandle === reply.bojHandle && (
                          <FlexWrapper>
                            <ReplyButton>수정</ReplyButton>
                            <ReplyButton
                              onClick={() => {
                                onClickDeleteComment(reply.id);
                              }}
                            >
                              삭제
                            </ReplyButton>
                          </FlexWrapper>
                        )}
                      </WriteInfo>
                      <ReplyContent>{reply.content}</ReplyContent>
                    </div>
                  ))}
                </ReplyList>
                <InputForm
                  onSubmit={(e) => {
                    onSubmitReply(e, comment.id);
                  }}
                >
                  <input
                    placeholder="댓글 내용을 입력하세요"
                    value={replyContentMap[comment.id] || ''}
                    onChange={(e) => {
                      onChangeReply(e, comment.id);
                    }}
                  />
                  <button>확인</button>
                </InputForm>
              </>
            )}
          </div>
        ))}
      </CommentList>
    </div>
  );
}

export default CommentComponent;
