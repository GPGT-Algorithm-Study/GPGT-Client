import React from 'react';
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

function ComplaintInputForm() {
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: userInfo, mutate: mutaUserInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${loginUser.claim}`,
    fetcher,
  );
  /* TODO : API 연결 */
  return (
    <Container>
      <Form>
        <FormItem>
          <div>
            <input id="titleInput" placeholder="제목"></input>
          </div>
        </FormItem>
        <FormItem>
          <p>작성자 : {userInfo.notionId}</p>
        </FormItem>
        <FormItem>
          <ContentArea
            rows="10"
            id="content"
            placeholder="민원 내용 작성.."
          ></ContentArea>
        </FormItem>
        <ButtonWrapper>
          <Button>민원 제출</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}

export default ComplaintInputForm;
