import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  @media all and (min-width: 1500px) {
    width: calc(25% - 3px);
  }

  @media all and (min-width: 1180px) and (max-width: 1500px) {
    width: calc(33% - 3px);
  }

  @media all and (min-width: 784px) and (max-width: 1180px) {
    width: calc(50% - 3px);
  }

  @media all and (max-width: 784px) {
    width: calc(100% - 3px);
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
