import React, { useCallback, useState } from 'react';
import { HeaderWrapper, FlexWrapper } from './style';
import Modal from '../Modal';
import ProblemRecommend from '../../pages/ProblemRecommend';

function Header() {
  const [showRecommend, setShowRecommend] = useState(false);

  const onCloseModal = useCallback(() => {
    setShowRecommend(false);
  }, []);

  const onClickRecommend = useCallback(() => {
    setShowRecommend(true);
  }, []);

  return (
    <div>
      <HeaderWrapper>
        <FlexWrapper>
          <div>좋은 사람 좋은 시간</div>
          <FlexWrapper>
            <div className="clickable" onClick={onClickRecommend}>
              문제추천
            </div>
            <div className="clickable">상점</div>
          </FlexWrapper>
        </FlexWrapper>
      </HeaderWrapper>
      <Modal show={showRecommend} onCloseModal={onCloseModal}>
        <ProblemRecommend />
      </Modal>
    </div>
  );
}

export default Header;
