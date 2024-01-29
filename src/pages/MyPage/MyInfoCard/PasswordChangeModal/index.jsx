import React, { useCallback, useState } from 'react';
import Modal from 'layouts/Modal';
import { Content, Title, Input, Button, ErrorMsg, InfoMsg } from './style';
import { changePassword } from 'api/user';
import { getHeaderRefreshTokenConfig, logoutProc } from 'utils/auth';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_PREFIX_URL } from 'utils/constants';

function PasswordChangeModal({ showModal, closeModal }) {
  const [pwError, setPwError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );

  const onChangeNewPassword = useCallback((e) => {
    setNewPassword(e.target.value);
  }, []);
  const onChangeOldPassword = useCallback((e) => {
    setOldPassword(e.target.value);
  }, []);
  const onChangeReNewPassword = useCallback((e) => {
    setReNewPassword(e.target.value);
  }, []);

  const changePasswordProc = useCallback((params) => {
    const config = getHeaderRefreshTokenConfig();
    changePassword(params, config)
      .then((response) => {
        // 비밀번호 변경 성공 시 로그아웃 처리한다.
        if (response.status == 200) {
          toast.success('비밀번호를 변경하였습니다. 다시 로그인해주세요.');
          // 로그아웃 처리
          logoutProc();
          return;
        }
        toast.error('비밀번호 변경에 실패하였습니다.');
      })
      .catch((e) => {
        if (e.response.data.message == 'Not matches Password') {
          toast.error('기존 비밀번호가 틀립니다.');
          return;
        }
        toast.error('비밀번호 변경에 실패하였습니다.');
      });
  }, []);

  const onClickChangeButton = useCallback(
    (e) => {
      e.preventDefault();
      if (!loginUser) return;
      if (!newPassword.trim() || !oldPassword.trim() || !reNewPassword.trim()) {
        setPwError(true);
        setErrorMsg('비밀번호를 입력해주세요.');
        return;
      }
      if (newPassword === oldPassword) {
        setPwError(true);
        setErrorMsg('새로운 비밀번호는 기존 비밀번호와 달라야합니다.');
        return;
      }
      if (newPassword !== reNewPassword) {
        setPwError(true);
        setErrorMsg('새로운 비밀번호가 다릅니다.');
        return;
      }
      // 비밀번호 유효성 검사
      const regExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,20}$/g;
      if (!regExp.test(newPassword)) {
        setPwError(true);
        setErrorMsg('규칙에 맞는 비밀번호를 설정해주세요.');
        return;
      }
      setPwError(false);
      const params = {
        bojHandle: loginUser.claim,
        oldPassword,
        newPassword,
      };
      changePasswordProc(params);
    },
    [newPassword, reNewPassword, oldPassword],
  );
  const onCloseModal = useCallback(() => {
    closeModal();
    setNewPassword('');
    setReNewPassword('');
    setOldPassword('');
    setPwError(false);
    setErrorMsg('');
  }, []);

  return (
    <Modal show={showModal} onCloseModal={onCloseModal}>
      <Content>
        <Title>비밀번호 변경하기</Title>
        <InfoMsg>
          영문자와 특수문자, 숫자를 포함해서 9-20자로 설정해주세요.
        </InfoMsg>
        <form onSubmit={onClickChangeButton}>
          <Input
            onChange={onChangeOldPassword}
            value={oldPassword}
            type="password"
            placeholder="기존 비밀번호를 입력해주세요."
          />
          <Input
            onChange={onChangeNewPassword}
            value={newPassword}
            placeholder="새로운 비밀번호를 입력해주세요."
            type="password"
          />
          <Input
            onChange={onChangeReNewPassword}
            value={reNewPassword}
            placeholder="새로운 비밀번호를 한번 더 입력해주세요."
            type="password"
          />
          {pwError && <ErrorMsg>{errorMsg}</ErrorMsg>}
          <Button>변경하기</Button>
        </form>
      </Content>
    </Modal>
  );
}

export default PasswordChangeModal;
