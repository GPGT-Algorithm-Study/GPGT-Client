import React, { useCallback } from 'react';
import {
  Container,
  ItemWrapper,
  PointWrapper,
  Item,
  ItemName,
  Point,
  Description,
  IconWrapper,
  Button,
} from './style';
import { buyItem } from 'api/item';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { ITEM_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import PageTitle from 'components/PageTitle';
// import MyItem from './MyItem';

function Store() {
  const { data: items } = useSWR(`${ITEM_PREFIX_URL}/all`, fetcher);
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  const { data: userInfo, mutate: mutateUserInfo } = useSWR(
    loginUser ? `${USER_PREFIX_URL}/info?bojHandle=${loginUser.claim}` : null,
    fetcher,
  );

  // 사용자 보유 아이템 목록
  const { mutate: mutateUserItem } = useSWR(
    loginUser ? `${ITEM_PREFIX_URL}/user?bojHandle=${loginUser.claim}` : null,
    fetcher,
  );

  const clickBuyButton = useCallback(
    (itemId) => {
      if (!userInfo) return;
      if (userInfo.warning == 4) {
        toast.error('상점을 이용하실 수 없습니다.');
        return;
      }
      const params = {
        bojHandle: loginUser.claim,
        itemId: itemId,
      };
      buyItem(params)
        .then((res) => {
          const { data } = res;
          if (data.code == 200) {
            toast.success('아이템을 구매했습니다.');
            mutateUserInfo();
            mutateUserItem();
          } else {
            toast.error('아이템 구매에 실패했습니다.');
          }
        })
        .catch((e) => {
          const res = e.response;
          toast.error(res.data.message);
        });
    },
    [loginUser, userInfo],
  );

  if (!items || !loginUser || !userInfo) {
    return null;
  }

  return (
    <Container>
      <PageTitle title="상점" />
      <PointWrapper>
        {userInfo.point} <span>P</span>
      </PointWrapper>
      <ItemWrapper>
        {items.map((item) => (
          <Item key={item.id}>
            <IconWrapper>
              <ItemIcon itemId={item.id} />
            </IconWrapper>
            <ItemName>{item.name}</ItemName>
            <Description>{item.description}</Description>
            <Point>
              {item.itemValue} <span>P</span>
            </Point>
            <Description>
              <div>최대 {item.maxItemCount}개 보유 가능</div>
            </Description>
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
      {/* <MyItemTitle>보유 아이템</MyItemTitle>
      <MyItem /> */}
    </Container>
  );
}

export default Store;
