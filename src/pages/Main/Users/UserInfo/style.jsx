import styled from '@emotion/styled';

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  @media all and (min-width: 1400px) {
    width: calc(25% - 5px);
  }

  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) and (max-width: 1400px) {
    width: calc(33% - 5px);
  }

  /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 700px) and (max-width: 1023px) {
    width: calc(50% - 5px);
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 700px) {
    width: calc(100% - 5px);
  }
`;

export const UserProblemInfo = styled.div`
  margin: 0 10px 0 10px;
`;

// export const UsersWrapper = styled.div`
//   display: flex;
// `;

// export const ScrollButton = styled.div`
//   position: fixed;
//   left: ${(props) => (props.type == 'prev' ? '0' : '')};
//   right: ${(props) => (props.type == 'next' ? '-1px' : '')};
//   border: none;
//   background: transparent;
//   cursor: pointer;
//   text-align: center;
//   width: 80px;
//   height: 100%;
//   z-index: 999;
//   & div {
//     margin-top: 150px;
//   }
// `;
