import React from 'react';
import { LoginWrapper, Input, Logo, Button } from './style';

function Login() {
  return (
    <LoginWrapper>
      <Logo>GPGT</Logo>
      <form>
        <Input placeholder="ID" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </form>
    </LoginWrapper>
  );
}

export default Login;
