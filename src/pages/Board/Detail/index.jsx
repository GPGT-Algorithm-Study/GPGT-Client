import React, { useState } from 'react';
import dayjs from 'dayjs';
import {
  Title,
  Toolbar,
  Writer,
  CreateDate,
  Button,
  WriteInfo,
  Content,
  CommentWrapper,
} from './style';
import { CommonProfileImage } from 'style/commonStyle';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * 게시판 글 상세 컴포넌트
 */
function Detail() {
  const [post] = useState({
    id: 1,
    title: '다익스트라 알고리즘',
    writer: 'fin',
    emoji: '🏖️',
    date: new Date(),
    content:
      '## 오픈스택\n**모든 타입의 클라우드 컴퓨팅 플랫폼을 개발하고 관리할 수 있는 오픈 소스 소프트웨어 기반의 클라우드 운영체제**\n서비스형 IaaS를 쉽게 구축할 수 있는 플랫폼으로 관리자는 데이터센터의 프로세싱, 스토리지, 네트워킹 자원들을 대시보드를 통해 제어할 수 있고 사용자는 웹을 통해 필요한 기능을 사용한다.\n서버의 하드웨어와 운영체제에 관계 없이 클라우드 컴퓨팅 개발의 표준을 제공하는 것이 목표이다.\n> _OpenStack은 데이터 센터 전체에서 컴퓨팅, 스토리지 및 네트워킹 리소스의 대규모 풀을 제어하는 클라우드 운영 체제이며, 모두 관리자가 제어권을 갖는 대시보드를 통해 관리되며 사용자가 웹 인터페이스를 통해 리소스를 프로비저닝할 수 있도록 지원합니다_\n## 오픈스택 구성\n오픈스택은 필요에 따라 구성 요소를 추가할 수 있도록 서비스로 구분되어 있다.\n### Heat\n**Heat Orchestration Template(HOT)을 사용하여 클라우드 자원을 생성하고 관리**한다.\n(인스턴스 생성, 네트워크 설정 등 일련의 과정을 자동화한다) \n> Heat은 템플릿 기반의 오케스트레이션 서비스를 제공하는 프로젝트로 사용자가 구성하고자하는 가상 자원들을 템플릿에 명시하도록 한다. HOT 템플릿은 YAML을 인코딩 방식으로 사용한다.\n**구조**\n1. 사용자는 API를 호출하거나 CLI를 통해 오케스트레이션 서비스를 요청한다.\n이 때 CLI 역시 사용자 명령을 API로 변환하여 처리한다.\n2. 수신된 API서버는 AMQP 규격 기반의 메시지 통신을 통해 Heat Engine으로 이를 전달한다.\n3. Heat Engine은 수신한 템플릿과  API의 파라미터에 포함된 사용자 요청 데이터를 기반으로 인프라 및 클라우드 애플리케이션을 생성하기 위해 Nova API, Neutron API 등과 같은 오픈스택 프로젝트들의 API를 호출한다.\n<br>\n### **Nova**\n**컴퓨트 서비스의 핵심**이며 하이퍼바이저, 메세지 큐, 인스턴스 접속을 하는 콘솔 등 **다양한 기능이 유기적으로 연결되어 가상 서버를 생성할 수 있는 시스템을 구성**한다.\n> RESTful API를 지원하고, 아마존 EC2 API와 연동이 가능하다.\n**구조**\n1. 대시보드나 CLI가 호출하는 nova-api로부터 시작한다.\n2. nova-api는 큐를 통해 nova-compute에 인스턴스를 생성하라는 명령어를 전달한다.\n3. nova-compute는 하이퍼바이저 라이브러리를 통해 인스턴스를 생성하라는 명령어를 다시 전달한다.\n4. 하이퍼바이저는 인스턴스를 생성하고 생성된 인스턴스는 nova-console을 통해 사용자가 접근할 수 있게 된다.\n',
  });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <Title>{post.title}</Title>
      <Toolbar>
        <WriteInfo>
          <Writer>
            <CommonProfileImage
              width={20}
              height={20}
              src={
                'https://static.solved.ac/uploads/profile/fin-picture-1665752455693.png'
              }
            />
            <div>
              {post.writer} {post.emoji}{' '}
            </div>
          </Writer>
          <CreateDate>{dayjs(post.date).format('YYYY년 M월 DD일')}</CreateDate>
        </WriteInfo>
        <WriteInfo>
          {user.bojHandle == post.writer && (
            <>
              <Link to="/board/write" post={post}>
                <Button>수정</Button>
              </Link>
              <Button>삭제</Button>
            </>
          )}
          <Link to="/board">
            <Button>목록으로</Button>
          </Link>
        </WriteInfo>
      </Toolbar>
      <Content>
        <MDEditor.Markdown
          style={{
            padding: 10,
            backgroundColor: 'transparent',
          }}
          source={post.content}
          autoFocus={false}
        />
      </Content>
      <CommentWrapper>
        <Comment postId={post.id} />
      </CommentWrapper>
    </div>
  );
}

export default Detail;
