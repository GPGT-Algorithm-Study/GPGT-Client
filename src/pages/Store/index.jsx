import React, { useCallback } from 'react';
import {
  Container,
  ItemWrapper,
  Title,
  Item,
  ItemName,
  Point,
  Description,
} from './style';
import { CommonButton } from 'style/commonStyle';
import useFetch from 'hooks/useFetch';
import { buyItem, getAllItems } from 'api/item';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import { getUserInfo } from 'api/user';
import { setIsBuyItem } from 'redux/item';

function Store() {
  const [items] = useFetch(getAllItems, []);
  const user = useSelector((state) => state.user);
  const [userInfo, fetchUserInfo] = useFetch(
    getUserInfo,
    {},
    { bojHandle: user.bojHandle },
  );

  const dispatch = useDispatch();

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
          fetchUserInfo();
          dispatch(setIsBuyItem(true));
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
            <CommonButton
              onClick={() => {
                clickBuyButton(item.id);
              }}
            >
              구매하기
            </CommonButton>
          </Item>
        ))}
      </ItemWrapper>
    </Container>
  );
}

export default Store;
