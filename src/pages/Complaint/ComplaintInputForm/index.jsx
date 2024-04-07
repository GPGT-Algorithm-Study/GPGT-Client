import React, { useCallback, useState } from 'react';
import { Author, Card, ContentArea } from './style';
import { USER_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import {
  Button,
  ButtonWrapper,
  Category,
  CategoryWrapper,
  Container,
  Form,
  FormItem,
} from 'pages/Board/Write/style';
import Skeleton from 'react-loading-skeleton';
import {
  createComplaint,
  getAllComplaint,
  getMyComplaint,
  updateComplaint,
} from 'api/complaint';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

function ComplaintInputForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentComplaint = location.state?.complaint;
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const { data: userInfo, mutate: mutateUserInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${loginUser?.claim}`,
    fetcher,
  );
  const [content, setContent] = useState(
    currentComplaint ? currentComplaint.content : '',
  );
  const [complaintType, setComplaintType] = useState(
    currentComplaint ? currentComplaint.complaintType : '',
  );
  const categories = [
    { name: 'NEW_FUNCTION', description: '신규 기능 건의' },
    { name: 'BUG', description: '버그 제보' },
    { name: 'PROBLEM', description: '문제점' },
    { name: 'ETC', description: '기타' },
  ];

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const validate = useCallback(() => {
    if (isEmpty(content.trim())) {
      toast.error('내용을 입력해주세요.');
      return false;
    }
    if (!categories.find((category) => category.name === complaintType)) {
      toast.error('민원 유형을 선택해주세요.');
      return false;
    }
  });
  const onSubmit = useCallback((e) => {
    if (validate() === false) return;
    if (currentComplaint) {
      //수정모드
      const updatedComplaint = {
        id: currentComplaint.id,
        content: content,
        complaintType: complaintType,
      };
      updateComplaint(updatedComplaint)
        .then((res) => {
          toast.success('민원을 수정했습니다.');
          navigate(-1); //이전 페이지로 리다이렉션
        })
        .catch((err) => {
          toast.error(`민원 수정에 실패했습니다 : ${err.message}`);
        });
    } else {
      //새로 등록 모드
      const newComplaint = {
        requester: loginUser.claim,
        content: content,
        complaintType: complaintType,
      };
      createComplaint(newComplaint)
        .then((res) => {
          toast.success('민원을 등록했습니다.');
        })
        .catch((err) => {
          toast.error(`민원 등록에 실패했습니다 : ${err.message}`);
          console.info(err);
        });
    }
  });

  return userInfo ? (
    <Container>
      <Form>
        {currentComplaint ? (
          <FormItem>수정 : #{currentComplaint.id}</FormItem>
        ) : undefined}
        <FormItem>
          <p>작성자 : {userInfo ? userInfo.notionId : '누구세요?'}</p>
        </FormItem>
        <FormItem>
          <CategoryWrapper>
            {categories.map((category) => {
              return (
                <Category
                  key={category.name}
                  selected={complaintType === category.name}
                  onClick={() => {
                    setComplaintType(category.name);
                  }}
                >
                  {category.description}
                </Category>
              );
            })}
          </CategoryWrapper>
        </FormItem>
        <FormItem>
          <ContentArea
            rows="10"
            id="content"
            placeholder="민원 내용 작성.."
            value={content}
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
