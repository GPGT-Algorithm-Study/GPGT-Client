import {
  computeTodayUserStats,
  makeAllUsersTodayRandomProblem,
  makeAllUsersTodayRandomStreakJandi,
  runCronEveryDayTermJob,
  runCronEveryTermJob,
  runCronEveryWeekTermJob,
} from 'api/admin';
import { Button, Card, Content, Title } from './style';
import { toast } from 'react-toastify';
import { useState } from 'react';

function AdminApiList() {
  const [apiLoading, setApiLoading] = useState(false);

  const onClickMakeAllUsersTodayRandomProblem = () => {
    const isAgree = confirm(
      '모든 유저의 랜덤 문제 생성 및 할당을 정말 실행시키겠습니까?\n',
    );
    if (!isAgree) return;
    setApiLoading(true);
    makeAllUsersTodayRandomProblem()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        toast.success('모든 유저의 랜덤 문제 생성 및 할당에 성공했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const onClickMakeAllUsersTodayRandomStreakJandi = () => {
    const isAgree = confirm(
      '모든 유저의 오늘 잔디 생성을 정말 실행시키겠습니까?\n',
    );
    if (!isAgree) return;
    setApiLoading(true);
    makeAllUsersTodayRandomStreakJandi()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        toast.success('모든 유저의 오늘 잔디 생성에 성공했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const onClickComputeTodayUserStats = () => {
    const isAgree = confirm(
      '모든 유저의 일일 통계 다시 계산하기를 정말 실행시키겠습니까?\n',
    );
    if (!isAgree) return;
    setApiLoading(true);
    computeTodayUserStats()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        toast.success('모든 유저의 일일 통계 다시 계산하기에 성공했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const onClickRunCronEveryTermJob = () => {
    const isAgree = confirm(
      '크론 배치잡 (Every 20 min)을 정말 실행시키겠습니까?\n',
    );
    if (!isAgree) return;
    setApiLoading(true);
    runCronEveryTermJob()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        console.log(res);
        toast.success('크론 배치잡 (Every 20 min)에 성공했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const onClickRunCronEveryDayTermJob = () => {
    const isAgree = confirm(
      "크론 배치잡 (EveryDay 6 O'Clock)을 정말 실행시키겠습니까?\n",
    );
    if (!isAgree) return;
    setApiLoading(true);
    runCronEveryDayTermJob()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        toast.success("크론 배치잡 (EveryDay 6 O'Clock)에 성공했습니다.");
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const onClickRunCronEveryWeekTermJob = () => {
    const isAgree = confirm(
      '크론 배치잡 (Evrey Week Job)을 정말 실행시키겠습니까?\n',
    );
    if (!isAgree) return;
    setApiLoading(true);
    runCronEveryWeekTermJob()
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          alert(res);
        toast.success('크론 배치잡 (Evrey Week Job)에 성공했습니다.');
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        } else if (data) {
          alert(data.message);
        }
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  return (
    <Card>
      <Title>🚨사용 주의🚨</Title>
      <Title>관리자용 서버 API</Title>
      {apiLoading ? (
        <Content addPadding={true}>😎 처리 중이야!! 잠시만 기다려!!!!</Content>
      ) : (
        <Content>
          <Button onClick={() => onClickMakeAllUsersTodayRandomProblem()}>
            모든 유저의 랜덤 문제 생성 및 할당
          </Button>
          <Button onClick={() => onClickMakeAllUsersTodayRandomStreakJandi()}>
            모든 유저의 오늘 잔디 생성
          </Button>
          <Button onClick={() => onClickComputeTodayUserStats()}>
            모든 유저의 일일 통계 다시 계산하기
          </Button>
          <Button onClick={() => onClickRunCronEveryTermJob()}>
            크론 배치잡 (Every 20 min)
          </Button>
          <Button onClick={() => onClickRunCronEveryDayTermJob()}>
            크론 배치잡 (EveryDay 6 O'Clock)
          </Button>
          <Button onClick={() => onClickRunCronEveryWeekTermJob()}>
            크론 배치잡 (Evrey Week Job)
          </Button>
        </Content>
      )}
    </Card>
  );
}

export default AdminApiList;
