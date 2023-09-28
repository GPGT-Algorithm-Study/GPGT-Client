import React from 'react';
import { Table, PostInfo } from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getTypeLabel } from 'utils/board';

/**
 * 게시판 테이블 컴포넌트
 */
function BoardTable({ postList, showTypeTitle }) {
  const navigate = useNavigate();
  return (
    <Table>
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {postList.map((post) => (
          <tr
            key={post.id}
            onClick={() => {
              navigate(`/board/${post.id}`);
            }}
          >
            <td>
              {showTypeTitle && <b>{`[${getTypeLabel(post.type)}] `}</b>}
              {post.title} {post.commentCount > 0 && `(${post.commentCount})`}
            </td>
            <PostInfo>
              {post.notionId} {post.emoji}
            </PostInfo>
            <PostInfo>{dayjs(post.createdDate).format('YYYY-MM-DD')}</PostInfo>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BoardTable;
