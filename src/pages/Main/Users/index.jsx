import React, { useRef, useCallback, useEffect, useState } from 'react';
import { CardWrapper, UsersWrapper, ScrollButton } from './style';
import { getAllUsers } from '../../../api/user';
import UserInfo from './UserInfo';

/**
 * 사용자 탭 내용 컴포넌트
 */
function Users() {
  const [users, setUsers] = useState([]);
  const [leftArrowHovering, setLeftArrowHovering] = useState(false);
  const [rightArrowHovering, setRightArrowHovering] = useState(false);
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
    <div>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('prev');
        }}
        onMouseOver={() => setLeftArrowHovering(true)}
        onMouseOut={() => setLeftArrowHovering(false)}
        type="prev"
      >
        {leftArrowHovering && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="100"
              viewBox="0 0 64 181"
              fill="none"
            >
              <path
                d="M2.67833 86.0525L48.2933 5.80423C51.2463 0.609263 58.7332 0.609263 61.6861 5.80422C63.0277 8.16448 63.0277 11.0567 61.6861 13.417L20.9602 85.0641C19.0442 88.4348 19.0442 92.5652 20.9602 95.9358L61.6861 167.583C63.0277 169.943 63.0277 172.836 61.6861 175.196C58.7332 180.391 51.2463 180.391 48.2933 175.196L2.67833 94.9475C1.11073 92.1897 1.11073 88.8103 2.67833 86.0525Z"
                fill="white"
                stroke="#BEBEBE"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
      </ScrollButton>
      <ScrollButton
        onClick={() => {
          handleNextButtonClick('next');
        }}
        onMouseOver={() => setRightArrowHovering(true)}
        onMouseOut={() => setRightArrowHovering(false)}
        type="next"
      >
        {rightArrowHovering && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="100"
              viewBox="0 0 64 181"
              fill="none"
            >
              <path
                d="M61.3217 94.9475L15.7067 175.196C12.7537 180.391 5.26684 180.391 2.3139 175.196C0.972275 172.836 0.972267 169.943 2.3139 167.583L43.0398 95.9359C44.9558 92.5652 44.9558 88.4348 43.0398 85.0642L2.3139 13.417C0.972275 11.0567 0.972275 8.16449 2.3139 5.80423C5.26684 0.609268 12.7537 0.609253 15.7067 5.80421L61.3217 86.0525C62.8893 88.8103 62.8893 92.1897 61.3217 94.9475Z"
                fill="white"
                stroke="#BEBEBE"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
      </ScrollButton>
      <CardWrapper ref={horizontalScrollRef}>
        {users &&
          users.map((user) => <UserInfo key={user.notionId} user={user} />)}
      </CardWrapper>
    </div>
  );
}

export default Users;
