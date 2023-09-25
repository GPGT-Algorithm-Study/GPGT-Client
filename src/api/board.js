import axios from 'axios';

const PREFIX_URL = '/api/v1/board';

/**
 * 모든 게시글 목록을 조회한다.
 * params : page, size
 */
export function getAllPosts(params) {
  return axios.get(`${PREFIX_URL}/all?page=${params.page}&size=${params.size}`);
}

/**
 * 타입 별로 게시글을 조회한다.
 * params: type, page, size
 */
export function getPostsByType(params) {
  return axios.get(
    `${PREFIX_URL}/all/type?type=${params.type}&page=${params.page}&size=${params.size}`,
  );
}

/**
 * 게시글을 작성한다.
 * post: type, bojHandle, title, content, imageUUIDs(공백없이 ,로 분리)
 */
export function createPost(post) {
  return axios.post(`${PREFIX_URL}/publish`, post);
}

/**
 * 게시글을 수정한다.
 * post: type, bojHandle, title, content, imageUUIDs(공백없이 ,로 분리)
 */
export function updatePost(post) {
  return axios.put(`${PREFIX_URL}/publish`, post);
}

/**
 * 게시글을 삭제한다.
 * params: boardId
 */
export function deletePost(params) {
  return axios.delete(`${PREFIX_URL}/delete?boardId=${params.boardId}`);
}

/**
 * 특정 글의 정보를 조회한다.
 * params : boardId
 */
export function getPost(params) {
  return axios.get(`${PREFIX_URL}/detail?boardId=${params.boardId}`);
}
