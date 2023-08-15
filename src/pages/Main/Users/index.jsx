import React, { useRef, useCallback, useEffect, useState } from 'react';
import { CardWrapper, UsersWrapper, ScrollButton } from './style';
import { getAllUsers } from '../../../api/user';
import UserInfo from './UserInfo';

/**
 * 사용자 탭 내용 컴포넌트
 */
function Users() {
  const [users, setUsers] = useState([]);
  const horizontalScrollRef = useRef();

  /**
   * 좌우 스크롤 버튼 클릭 리스너
   */
  const handleNextButtonClick = useCallback((nextType) => {
    if (!horizontalScrollRef.current) return;
    if (nextType === 'prev') {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft -
          horizontalScrollRef.current.offsetWidth +
          (horizontalScrollRef.current.offsetWidth <= 380 ? 0 : 380),
        behavior: 'smooth',
      });
    } else {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft +
          horizontalScrollRef.current.offsetWidth -
          (horizontalScrollRef.current.offsetWidth <= 380 ? 0 : 380),
        behavior: 'smooth',
      });
    }
  });

  // 모든 사용자 정보 조회
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.status == 200 && res.data) {
          const { data } = res;
          setUsers(data);
        }
        // 데이터 제대로 못 받았을 경우 에러처리
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, []);

  return (
    <UsersWrapper>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('prev');
        }}
      >
        {'<'}
      </ScrollButton>
      <CardWrapper ref={horizontalScrollRef}>
        {users &&
          users.map((user) => <UserInfo key={user.notionId} user={user} />)}
      </CardWrapper>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('next');
        }}
      >
        {'>'}
      </ScrollButton>
    </UsersWrapper>
  );
}

export default Users;
