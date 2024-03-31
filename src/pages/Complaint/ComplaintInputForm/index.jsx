import React, { useState } from 'react';
import { Author, Card, ContentArea } from './style';
import { USER_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import {
  Button,
  ButtonWrapper,
  Container,
  Form,
  FormItem,
} from 'pages/Board/Write/style';
import Skeleton from 'react-loading-skeleton';
import { getAllComplaint } from 'api/complaint';

function ComplaintInputForm() {
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: userInfo, mutate: mutateUserInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${loginUser?.claim}`,
    fetcher,
  );
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  /* TODO : API 연결 */
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = (e) => {
    console.log(title);
    console.log(content);
  };

  return userInfo ? (
    <Container>
      <Form>
        <FormItem>
          <div>
            <input
              id="titleInput"
              placeholder="제목"
              onChange={onChangeTitle}
            ></input>
          </div>
        </FormItem>
        <FormItem>
          <p>작성자 : {userInfo ? userInfo.notionId : '누구세요?'}</p>
        </FormItem>
        <FormItem>
          <ContentArea
            rows="10"
            id="content"
            placeholder="민원 내용 작성.."
            onChange={onChangeContent}
          ></ContentArea>
        </FormItem>
        <FormItem>
          <ButtonWrapper>
            <Button onClick={onSubmit}>민원 제출</Button>
          </ButtonWrapper>
        </FormItem>
      </Form>
    </Container>
  ) : (
    <Container>
      <Form>
        <FormItem>
          <Skeleton width="80%" />
        </FormItem>
        <FormItem>
          <Skeleton width="80%" />
        </FormItem>
        <FormItem>
          <Skeleton width="80%" height={200} />
        </FormItem>
      </Form>
    </Container>
  );
}

export default ComplaintInputForm;
