import styled from '@emotion/styled';

export const CommonProfileImage = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
`;

export const CommonCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const CommonTierImg = styled.img`
  line-height: inherit;
  width: ${(props) => props.width && props.width}px;
  height: ${(props) => props.height && props.height}px;
  vertical-align: middle;
`;
