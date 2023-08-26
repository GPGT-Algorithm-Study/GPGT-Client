import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { userLogin } from 'api/user';
import { LoginWrapper, Input, Logo, Button, ErrorMsg } from './style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/user';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const changePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const loginProc = useCallback(
    (e) => {
      e.preventDefault();
      if (!id || !id.trim()) {
        setLoginError(true);
        setErrorMsg('아이디를 입력해주세요.');
        return;
      }
      if (!password || !password.trim()) {
        setLoginError(true);
        setErrorMsg('비밀번호를 입력해주세요.');
        return;
      }
      setLoginError(false);
      const user = {
        bojHandle: id,
        password,
      };
      userLogin(user)
        .then((response) => {
          const { data } = response;
          const { accessToken, refreshToken } = data.jwt;
          // API 요청마다 헤더에 jwt 담아 보내도록 설정
          axios.defaults.headers.common['Access_Token'] = accessToken;
          // 로그인 성공 시 리덕스에 사용자 아이디 저장하고 쿠키에 refreshToken 저장
          dispatch(setUser({ bojHandle: data.bojHandle }));
          auth.setRefreshTokenToCookie(refreshToken);
        })
        .catch((e) => {
          setLoginError(true);
          setErrorMsg('아이디 또는 비밀번호를 다시 확인해주세요.');
        });
    },
    [id, password],
  );

  return (
    <LoginWrapper>
      <Logo>GPGT</Logo>
      <form onSubmit={loginProc}>
        <Input onChange={changeId} value={id} placeholder="ID" />
        <Input
          onChange={changePassword}
          value={password}
          type="password"
          placeholder="Password"
        />
        {loginError && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <Button>Login</Button>
      </form>
    </LoginWrapper>
  );
}

export default Login;
