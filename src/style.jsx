import React from 'react';
import { Global, css } from '@emotion/react';

const baseStyle = css`
  @import url('https://webfontworld.github.io/kopus/KoPubWorldDotum.css');

  :root {
    --color-primary: rgb(18, 146, 250);
    --color-background: rgb(240, 240, 240);
    --color-textgrey: rgb(112, 112, 112);
    --color-textlight: rgb(150, 150, 150);
    --color-error: #f24343;
    --color-unchecked: rgb(220, 220, 220);
    --color-checked: #81cc67;
    --color-point: #546ffa;
    --width-usercard: 340px;
  }
  body {
    background-color: var(--color-background);
    margin: 0;
    font-family: 'KoPubWorldDotum';
  }

  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
