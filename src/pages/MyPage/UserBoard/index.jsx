import React, { useEffect, useState } from 'react';
import { Card, Title, PageWrapper, NoPosts } from './style';
import { isEmpty } from 'lodash';
import BoardTable from 'components/BoardTable';
import Pagination from 'components/Pagination';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { useParams } from 'react-router-dom';
import {
  BOARD_PAGE_SIZE,
  BRD_PREFIX_URL,
  USER_PREFIX_URL,
} from 'utils/constants';

/**
 * 마이페이지 유저가 쓴 글 카드
 */
function UserBoard() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState([]);

  // 사용자 정보
  const { bojHandle } = useParams();
  const { data: userInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${bojHandle}`,
    fetcher,
  );

  const { data: postsInfo, mutate: mutatePosts } = useSWR(
    `${BRD_PREFIX_URL}/all/user?page=${
      page - 1
    }&size=${BOARD_PAGE_SIZE}&bojHandle=${userInfo.bojHandle}`,
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
        {userInfo.notionId} {userInfo.emoji} 작성 글 <span>{total} 개</span>
      </Title>
      {isEmpty(postList) ? (
        <NoPosts>아직 작성 글이 없습니다.</NoPosts>
      ) : (
        <>
          <BoardTable postList={postList} showTypeTitle={true} />
          {/* 페이지네이션  */}
          {Math.ceil(total / BOARD_PAGE_SIZE) > 1 && (
            <PageWrapper>
              <Pagination
                totalPage={Math.ceil(total / BOARD_PAGE_SIZE)}
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
