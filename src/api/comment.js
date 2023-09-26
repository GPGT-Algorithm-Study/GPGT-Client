import axios from 'axios';

const PREFIX_URL = '/api/v1/comment';

/**
 * 댓글을 작성한다.
 * comment: boardId, bojHandle, parentCommentId(대댓글인 경우), content
 */
export function createComment(comment) {
  return axios.post(`${PREFIX_URL}/publish`, comment);
}

/**
 * 댓글을 수정한다.
 * comment: commentId, boardId, bojHandle, parentCommentId(대댓글인 경우), content
 */
export function updateComment(comment) {
  return axios.put(`${PREFIX_URL}/update`, comment);
}

/**
 * 댓글을 삭제한다.
 * params: commentId
 */
export function deleteComment(params) {
  return axios.delete(`${PREFIX_URL}/del?commentId=${params.commentId}`);
}

/**
 * 특정 글의 댓글을 조회한다.
 * params : boardId
 */
export function getComment(params) {
  return axios.get(`${PREFIX_URL}/all?boardId=${params.boardId}`);
}
