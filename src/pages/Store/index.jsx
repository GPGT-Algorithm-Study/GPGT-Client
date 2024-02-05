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
import { buyItem } from 'api/item';
import ItemIcon from 'components/ItemIcon';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { ITEM_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import PageTitle from 'components/PageTitle';

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

  const onClickStore = useCallback(() => {
    if (!userInfo) return;
    if (userInfo.warning == 4) {
      toast.error('상점을 이용하실 수 없습니다.');
      return;
    }
  }, [userInfo]);

  // 사용자 보유 아이템 목록
  const { mutate: mutateUserItem } = useSWR(
    loginUser ? `${ITEM_PREFIX_URL}/user?bojHandle=${loginUser.claim}` : null,
    fetcher,
  );

  const clickBuyButton = useCallback(
    (itemId) => {
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
    [loginUser],
  );

  if (!items || !loginUser || !userInfo) {
    return null;
  }

  return (
    <Container>
      <PageTitle title="상점" />
      {userInfo.point}
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
