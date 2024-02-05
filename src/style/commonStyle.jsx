import styled from '@emotion/styled';

export const CommonProfileImage = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
  border: 1px solid var(--color-border);
`;

export const CommonCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  box-sizing: border-box;
  /* box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08); */
`;

export const CommonTierImg = styled.img`
  line-height: inherit;
  width: ${(props) => props.width && props.width}px;
  height: ${(props) => props.height && props.height}px;
  vertical-align: middle;
`;

export const CommonTitle = styled.div`
  font-weight: bold;
  font-size: 21px;
  margin: 0 0 0 6px;
`;

export const CommonFlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CommonButton = styled.button`
  border-radius: 50px;
  padding: 10px 20px 10px 20px;
  border: none;
  background-color: ${(props) =>
    props.primary ? 'var(--color-primary)' : 'var(--color-background)'};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  font-weight: ${(props) => (props.primary ? '' : 'bold')};
  cursor: pointer;
  font-size: 0.8rem;
  width: ${(props) => props.width && props.width};
`;
