import React, { useEffect, useState } from 'react';
import { Card, Title, PageWrapper, NoPosts } from './style';
import { isEmpty } from 'lodash';
import useFetch from 'hooks/useFetch';
import { getPostsByUser } from 'api/board';
import BoardTable from 'components/BoardTable';
import Pagination from 'components/Pagination';

/**
 * 마이페이지 유저가 쓴 글 카드
 */
function UserBoard({ userInfo }) {
  const SIZE = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [postList, setPostList] = useState([]);
  const [postsInfo, , setParams] = useFetch(
    getPostsByUser,
    {},
    {
      size: SIZE,
      page: page - 1,
      bojHandle: userInfo.bojHandle,
    },
  );

  // 응답 받은 게시물 데이터 가공
  useEffect(() => {
    if (isEmpty(postsInfo)) return;
    setPostList(postsInfo.content);
    setTotal(postsInfo.totalElements);
  }, [postsInfo]);

  // 페이지 바뀔 때 마다 데이터 다시 요청
  useEffect(() => {
    setParams({
      size: SIZE,
      page: page - 1,
      bojHandle: userInfo.bojHandle,
    });
  }, [page]);

  return (
    <Card>
      <Title>
        {userInfo.notionId} {userInfo.emoji} 작성 글
      </Title>
      {isEmpty(postList) ? (
        <NoPosts>아직 작성 글이 없습니다.</NoPosts>
      ) : (
        <>
          <BoardTable postList={postList} showTypeTitle={true} />
          {/* 페이지네이션  */}
          {Math.ceil(total / SIZE) > 1 && (
            <PageWrapper>
              <Pagination
                totalPage={Math.ceil(total / SIZE)}
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
