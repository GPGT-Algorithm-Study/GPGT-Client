import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderWrapper, FlexWrapper, RightWrapper } from './style';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';
import { CommonProfileImage } from 'style/commonStyle';

function Header() {
  const [showRecommend, setShowRecommend] = useState(false);
  const [showStore, setShowStore] = useState(false);

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
            <div
              className="clickable"
              onClick={() => {
                setShowStore(true);
              }}
            >
              상점
            </div>
            <Link to="/my-page">
              <CommonProfileImage
                width="38"
                height="38"
                src="https://static.solved.ac/misc/360x360/default_profile.png"
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
