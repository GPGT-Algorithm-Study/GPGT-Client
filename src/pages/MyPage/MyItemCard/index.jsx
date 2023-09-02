import React, { useCallback, useState, useEffect } from 'react';
import {
  Card,
  Button,
  ItemWrapper,
  Item,
  ItemName,
  Left,
  Title,
  NoItem,
  CommentTitle,
  CommentButton,
  Input,
  ButtonWrapper,
  ErrorMsg,
  InputWrapper,
} from './style';
import { isEmpty } from 'lodash';
import useFetch from 'hooks/useFetch';
import { getUserItems, useItem } from 'api/item';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import Modal from 'layouts/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { setIsBuyItem, setIsUseItem } from 'redux/item';

/**
 * 마이페이지 보유 아이템 카드
 */
function MyItemCard({ userInfo, fetchUserInfo, isUser }) {
  const [items, fetchItems] = useFetch(getUserItems, [], {
    bojHandle: userInfo.bojHandle,
  });
  const [showMyComment, setShowMyComment] = useState(false);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(false);
  const [commentErrorMsg, setCommentErrorMsg] = useState('');
  const { isBuyItem } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isBuyItem || !isUser) return;
    fetchItems();
    dispatch(setIsBuyItem(false));
  }, [isBuyItem]);

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
          fetchUserInfo();
          fetchItems();
          dispatch(setIsUseItem(true));
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

  return (
    <Card>
      <Title>보유 아이템</Title>
      {isEmpty(items) && <NoItem>보유 아이템이 없습니다.</NoItem>}
      <ItemWrapper>
        {items.map((item) => (
          <Item key={item.item.id}>
            <div>
              <ItemIcon itemId={item.item.id} size="38" color="#3362c5" />
            </div>
            <ItemName>{item.item.name}</ItemName>
            <Left>{item.count}개 보유</Left>
            {isUser && (
              <Button
                disabled={item.item.id == 3}
                onClick={() => {
                  clickUseButton(item.item.id);
                }}
              >
                {item.item.id == 3 ? '장착 중' : '사용하기'}
              </Button>
            )}
          </Item>
        ))}
      </ItemWrapper>
      <Modal show={showMyComment} onCloseModal={onCloseModal}>
        <CommentTitle>
          <div>나의 한마디 입력</div>
        </CommentTitle>
        <InputWrapper>
          <Input value={comment} onChange={onChangeComment} />
          {commentError && <ErrorMsg>{commentErrorMsg}</ErrorMsg>}
        </InputWrapper>
        <ButtonWrapper>
          <CommentButton onClick={useMyCommentItem} isConfirm={true}>
            확인
          </CommentButton>
        </ButtonWrapper>
      </Modal>
    </Card>
  );
}

export default MyItemCard;
