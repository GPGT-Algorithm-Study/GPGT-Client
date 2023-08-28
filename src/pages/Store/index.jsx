import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  ItemWrapper,
  Title,
  Item,
  ItemName,
  Point,
  Description,
} from './style';
import useFetch from 'hooks/useFetch';
import { isEmpty } from 'lodash';
import { buyItem, getAllItems } from 'api/item';
import { useSelector } from 'react-redux';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import { getUserInfo } from 'api/user';

function Store() {
  const [items] = useFetch(getAllItems, []);
  const user = useSelector((state) => state.user);
  const [userInfo] = useFetch(getUserInfo, {}, { bojHandle: user.bojHandle });

  const clickBuyButton = useCallback((itemId) => {
    const params = {
      bojHandle: user.bojHandle,
      itemId: itemId,
    };
    buyItem(params)
      .then((res) => {
        const { data } = res;
        if (data.code == 200) {
          toast.success('아이템을 구매했습니다.');
        } else {
          toast.error('아이템 구매에 실패했습니다.');
        }
      })
      .catch((e) => {
        const res = e.response;
        toast.error(res.data.message);
      });
  }, []);

  return (
    <Container>
      <Title>
        <h2>상점</h2>
        <div>
          (보유 포인트: {userInfo.point}
          <span> P</span>)
        </div>
      </Title>
      <ItemWrapper>
        {items.map((item) => (
          <Item key={item.id}>
            <div>
              <ItemIcon itemId={item.id} size="38" color="#3362c5" />
            </div>
            <ItemName>{item.name}</ItemName>
            <Description>
              {item.description}
              <div>(최대 {item.maxItemCount}개 보유 가능)</div>
            </Description>
            <Point>
              {item.itemValue} <span>P</span>
            </Point>
            <Button
              onClick={() => {
                clickBuyButton(item.id);
              }}
            >
              구매하기
            </Button>
          </Item>
        ))}
      </ItemWrapper>
    </Container>
  );
}

export default Store;
