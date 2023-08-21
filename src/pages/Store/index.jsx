import React from 'react';
import {
  Button,
  Container,
  ItemWrapper,
  Title,
  Item,
  ItemName,
  Point,
} from './style';
import { AiOutlineWarning } from 'react-icons/ai';

function Store() {
  return (
    <Container>
      <Title>
        <h2>상점</h2>
      </Title>
      <ItemWrapper>
        <Item>
          <div>
            <AiOutlineWarning size="38" color="#81cc67" />
          </div>
          <ItemName>경고 면제권</ItemName>
          <Point>
            123 <span>P</span>
          </Point>
          <Button>구매하기</Button>
        </Item>
      </ItemWrapper>
    </Container>
  );
}

export default Store;
