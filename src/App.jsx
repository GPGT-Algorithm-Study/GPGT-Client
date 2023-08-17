import React from 'react';
import GlobalStyle from './style';
import Main from './pages/Main';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Main />
      <ToastContainer />
    </div>
  );
}

export default App;
