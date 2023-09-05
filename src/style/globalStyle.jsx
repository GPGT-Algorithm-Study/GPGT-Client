import React from 'react';
import { Global, css } from '@emotion/react';

const baseStyle = css`
  @import url('https://webfontworld.github.io/kopus/KoPubWorldDotum.css');
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :root {
    --color-primary: #3362c5;
    --color-background: rgb(240, 240, 240);
    --color-textgrey: rgb(112, 112, 112);
    --color-textlight: rgb(150, 150, 150);
    --color-error: #f24343;
    --color-unchecked: rgb(220, 220, 220);
    --color-tag: rgb(228, 228, 230);
    --color-checked: #81cc67;
    --color-point: #3362c5;
    --color-teamsun: #fff1f1;
    --color-teammoon: #fff8e7;
    --color-toggle: #69b5f8;
    --color-border: #dfdfdf;
    --color-team1: #ffd643;
    --color-team0: #ff6c6c;

    --width-maxwidth: 1440px;
  }
  body {
    margin: 0;
    font-family: 'KoPubWorldDotum';
    background-color: rgb(245, 245, 247);
    height: 100%;
    overflow: hidden;
  }

  textarea,
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
  // Toastify 토스트 메시지 커스텀 스타일
  .Toastify__toast {
    font-size: 14px;
    line-height: 1.2;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
