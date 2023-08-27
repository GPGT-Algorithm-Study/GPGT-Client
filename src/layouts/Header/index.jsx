import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderWrapper, FlexWrapper, RightWrapper } from './style';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';
import { CommonProfileImage } from 'style/commonStyle';
import useFetch from 'hooks/useFetch';
import { getUserInfo } from 'api/user';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Header() {
  const [showRecommend, setShowRecommend] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const user = useSelector((state) => state.user);

  const [userInfo] = useFetch(getUserInfo, {}, { bojHandle: user.bojHandle });

  const onClickStore = useCallback(() => {
    if (userInfo.warning == 4) {
      toast.error('상점을 이용하실 수 없습니다.');
      return;
    }
    setShowStore(true);
  }, [userInfo]);

  const onCloseModal = useCallback(() => {
    setShowRecommend(false);
    setShowStore(false);
  }, []);

  return (
    <div>
      <HeaderWrapper>
        <FlexWrapper>
          <div>
            <Link to="/">좋은 사람 좋은 시간</Link>
          </div>
          <RightWrapper>
            <div
              className="clickable"
              onClick={() => {
                setShowRecommend(true);
              }}
            >
              문제추천
            </div>
            <div className="clickable" onClick={onClickStore}>
              상점
            </div>
            <Link to="/my-page">
              <CommonProfileImage
                width="38"
                height="38"
                src={
                  userInfo.profileImg == 'null'
                    ? 'https://static.solved.ac/misc/360x360/default_profile.png'
                    : userInfo.profileImg
                }
              />
            </Link>
          </RightWrapper>
        </FlexWrapper>
      </HeaderWrapper>
      <Modal show={showRecommend} onCloseModal={onCloseModal}>
        <ProblemRecommend />
      </Modal>
      <Modal show={showStore} onCloseModal={onCloseModal}>
        <Store />
      </Modal>
    </div>
  );
}

export default Header;
