import React, { useCallback, useState, useEffect } from 'react';
import {
  Button,
  NoItem,
  CommentTitle,
  CommentButton,
  Input,
  ButtonWrapper,
  ErrorMsg,
  InputWrapper,
} from './style';
import { isEmpty } from 'lodash';
import { useItem } from 'api/item';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import Modal from 'layouts/Modal';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import { ITEM_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import {
  ItemWrapper,
  Item,
  IconWrapper,
  ItemName,
  Description,
} from '../style';

/**
 * 마이페이지 보유 아이템 카드
 */
function MyItem() {
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: userInfo, mutate: mutateUserInfo } = useSWR(
    loginUser ? `${USER_PREFIX_URL}/info?bojHandle=${loginUser.claim}` : '',
    fetcher,
  );
  const { data: items, mutate: mutateUserItem } = useSWR(
    loginUser ? `${ITEM_PREFIX_URL}/user?bojHandle=${loginUser.claim}` : '',
    fetcher,
  );

  const [showMyComment, setShowMyComment] = useState(false);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [commentErrorMsg, setCommentErrorMsg] = useState('');

  const onCloseModal = useCallback(() => {
    setShowMyComment(false);
    setComment('');
    setCommentError(false);
    setCommentErrorMsg('');
  }, []);

  const onChangeComment = useCallback((e) => {
    if (e.target.value.length > 255) {
      setCommentError(true);
      setCommentErrorMsg('255자 이내로 작성해주세요.');
    } else {
      setCommentError(false);
    }
    setComment(e.target.value);
  }, []);

  const useMyCommentItem = useCallback(() => {
    if (commentError) return;
    if (isEmpty(comment.trim())) {
      setCommentError(true);
      setCommentErrorMsg('내용을 입력해주세요.');
      return;
    }
    const params = {
      itemId: 4,
      bojHandle: userInfo.bojHandle,
      message: comment,
    };
    useItemProc(params);
  }, [comment]);

  const useItemProc = useCallback((params) => {
    useItem(params)
      .then((res) => {
        const { data } = res;
        if (data.code == 200) {
          toast.success('아이템을 사용했습니다.');
          mutateUserInfo();
          mutateUserItem();
        } else {
          toast.error('아이템 사용에 실패했습니다.');
        }
      })
      .catch((e) => {
        const res = e.response;
        toast.error(res.data.message);
      })
      .finally(() => {
        onCloseModal();
      });
  }, []);

  const clickUseButton = useCallback((itemId) => {
    const params = { itemId, bojHandle: userInfo.bojHandle };
    if (itemId == 4) {
      setShowMyComment(true);
      return;
    }
    useItemProc(params);
  }, []);

  if (!items) return null;

  return (
    <div>
      {isEmpty(items) && <NoItem>보유 아이템이 없습니다.</NoItem>}
      <ItemWrapper>
        {items.map((item) => (
          <Item key={item.item.id}>
            <IconWrapper>
              <ItemIcon itemId={item.item.id} size="38" color="#3362c5" />
            </IconWrapper>
            <ItemName>{item.item.name}</ItemName>
            <Description>{item.count}개 보유</Description>
            <Button
              disabled={item.item.id == 3}
              onClick={() => {
                clickUseButton(item.item.id);
              }}
            >
              {item.item.id == 3 ? '장착 중' : '사용하기'}
            </Button>
          </Item>
        ))}
      </ItemWrapper>
      <Modal show={showMyComment} onCloseModal={onCloseModal}>
        <CommentTitle>
          <div>나의 한마디 입력</div>
        </CommentTitle>
        <InputWrapper>
          <Input
            value={comment}
            onChange={onChangeComment}
            placeholder="나의 한마디 입력"
          />
          {commentError && <ErrorMsg>{commentErrorMsg}</ErrorMsg>}
        </InputWrapper>
        <ButtonWrapper>
          <CommentButton onClick={useMyCommentItem} isConfirm={true}>
            확인
          </CommentButton>
        </ButtonWrapper>
      </Modal>
    </div>
  );
}

export default MyItem;
