import React from 'react';
import { Global, css } from '@emotion/react';

const baseStyle = css`
  @font-face {
    font-family: 'DungGeunMo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'DungGeunMo';
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
