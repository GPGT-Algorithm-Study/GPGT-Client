import Header from 'layouts/Header';
import React from 'react';
import { Content } from './style';
import MyInfoCard from './MyInfoCard';

function MyPage() {
  return (
    <div>
      <Header />
      <Content>
        <MyInfoCard />
      </Content>
    </div>
  );
}

export default MyPage;
