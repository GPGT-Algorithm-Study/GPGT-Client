import React, { useEffect, useState } from 'react';
import {
  Card,
  Title,
  PageWrapper,
  NoPosts,
  BoardContent,
  PostItem,
  PostInfo,
  PostTitle,
} from './style';
import { isEmpty } from 'lodash';
import Pagination from 'components/Pagination';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MY_BOARD_PAGE_SIZE,
  BRD_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';
import { getTypeLabel } from 'utils/board';
import dayjs from 'dayjs';

/**
 * 마이페이지 유저가 쓴 글 카드
 */
function UserBoard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState([]);

  const navigate = useNavigate();

  // 사용자 정보
  const { bojHandle } = useParams();
  const { data: userInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${bojHandle}`,
    fetcher,
  );

  const { data: postsInfo, mutate: mutatePosts } = useSWR(
    `${BRD_PREFIX_URL}/all/user?page=${
      page - 1
    }&size=${MY_BOARD_PAGE_SIZE}&bojHandle=${userInfo.bojHandle}`,
    fetcher,
  );

  // 응답 받은 게시물 데이터 가공
  useEffect(() => {
    if (isEmpty(postsInfo)) return;
    setPostList(postsInfo.content);
    setTotal(postsInfo.totalElements);
  }, [postsInfo]);

  // 페이지 바뀔 때 마다 데이터 다시 요청
  useEffect(() => {
    mutatePosts();
  }, [page]);

  return (
    <Card>
      <Title>
        📝 작성한 글 <span>{total} 개의 게시글</span>
      </Title>
      {isEmpty(postList) ? (
        <NoPosts>작성된 게시글이 없습니다.</NoPosts>
      ) : (
        <>
          <BoardContent>
            {postList.map((post) => (
              <PostItem
                key={post.id}
                onClick={() => {
                  navigate(`/board/${post.id}`);
                }}
              >
                <PostTitle>
                  <div>
                    <span>[{getTypeLabel(post.type)}]</span>
                    {post.title}
                  </div>
                </PostTitle>
                <PostInfo>
                  <div>{dayjs(post.createdDate).format('YYYY. MM. DD')}</div>
                  <div>·</div>
                  <div>댓글 {post.commentCount}</div>
                </PostInfo>
              </PostItem>
            ))}
          </BoardContent>
          {/* 페이지네이션  */}
          {Math.ceil(total / MY_BOARD_PAGE_SIZE) > 1 && (
            <PageWrapper>
              <Pagination
                totalPage={Math.ceil(total / MY_BOARD_PAGE_SIZE)}
                limit={5}
                page={page}
                setPage={setPage}
              />
            </PageWrapper>
          )}
        </>
      )}
    </Card>
  );
}

export default UserBoard;
