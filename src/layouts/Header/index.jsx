import React, { useCallback, useState } from 'react';
import { HeaderWrapper, FlexWrapper } from './style';
import Modal from 'layouts/Modal';
import ProblemRecommend from 'pages/ProblemRecommend';
import Store from 'pages/Store';

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
          <div>좋은 사람 좋은 시간</div>
          <FlexWrapper>
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
          </FlexWrapper>
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
