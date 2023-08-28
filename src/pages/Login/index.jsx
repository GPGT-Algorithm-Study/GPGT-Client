import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/user';
import { userLogin } from 'api/user';
import { LoginWrapper, Input, LogoWrapper, Button, ErrorMsg } from './style';
import { onSilentRefresh, setRefreshTokenToCookie } from 'utils/auth';
import { useNavigate } from 'react-router-dom';

const JWT_EXPIRY_TIME = 60 * 1000; // 만료 시간: 1분

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
          axios.defaults.headers.common['Access_Token'] = accessToken;
          dispatch(setUser({ bojHandle: data.bojHandle }));
          // 리프레쉬 토큰 저장
          setRefreshTokenToCookie(refreshToken);
          // 액세스 토큰 만료 3초전에 재발급
          setTimeout(() => {
            onSilentRefresh(dispatch);
          }, JWT_EXPIRY_TIME - 3000);
          navigate('/');
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
      <LogoWrapper>
        <img width="180" src="headerLogo.svg" />
      </LogoWrapper>
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
