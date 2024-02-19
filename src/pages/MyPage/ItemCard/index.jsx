import React, { useCallback, useState, useEffect } from 'react';
import {
  Card,
  Title,
  Content,
  Button,
  NoItems,
  CommentTitle,
  CommentButton,
  Input,
  ButtonWrapper,
  ErrorMsg,
  InputWrapper,
  ItemWrapper,
  Item,
  IconWrapper,
  ItemName,
  Description,
} from './style';
import { isEmpty } from 'lodash';
import { useItem } from 'api/item';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import Modal from 'layouts/Modal';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';
import { ITEM_PREFIX_URL } from 'utils/constants';

/**
 * 마이페이지 아이템 카드
 */
function ItemCard({ userInfo, isUser }) {
  const { data: items, mutate: mutateUserItem } = useSWR(
    `${ITEM_PREFIX_URL}/user?bojHandle=${userInfo.bojHandle}`,
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
    if (!isUser) return;
    useItem(params)
      .then((res) => {
        const { data } = res;
        if (data.code == 200) {
          toast.success('아이템을 사용했습니다.');
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

  const clickUseButton = useCallback(
    (itemId) => {
      if (!userInfo || !isUser) return;
      if (userInfo.warning == 4) {
        toast.error('아이템을 사용하실 수 없습니다.');
        return;
      }
      const params = { itemId, bojHandle: userInfo.bojHandle };
      if (itemId == 4) {
        setShowMyComment(true);
        return;
      }
      useItemProc(params);
    },
    [userInfo, isUser],
  );

  if (!items) return null;

  return (
    <Card>
      <Title>👝 보유 아이템</Title>
      <Content>
        {isEmpty(items) && <NoItems>보유 아이템이 없습니다.</NoItems>}
        <ItemWrapper>
          {items.map((item) => (
            <Item key={item.item.id}>
              <IconWrapper>
                <ItemIcon itemId={item.item.id} size="38" color="#3362c5" />
              </IconWrapper>
              <ItemName>{item.item.name}</ItemName>
              <Description>{item.count}개 보유</Description>
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
      </Content>
    </Card>
  );
}

export default ItemCard;
