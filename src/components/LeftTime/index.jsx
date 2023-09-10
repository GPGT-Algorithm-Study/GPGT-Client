import React, { useState, useEffect } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { Info } from './style';

function LeftTime({ marginLeft }) {
  // 데이터 수집 주기
  const dataScrapingInterval = 20;
  const now = new Date();
  const currentMinutes = now.getUTCMinutes();
  const currentSeconds = now.getUTCSeconds();
  // 매시 0분, 20분, 40분까지의 타이머를 생성해야한다.
  // 현재 시간에서 가장 가까운 타이머 위치를 지정한다.
  const [leftMinutes, setLeftMinutes] = useState(
    dataScrapingInterval -
      (currentMinutes % dataScrapingInterval) -
      (currentSeconds != 0 ? 1 : 0),
  );
  const [leftSeconds, setLeftSeconds] = useState((60 - currentSeconds) % 60);

  useEffect(() => {
    // 타이머를 생성한다.
    const interval = setInterval(() => {
      setLeftSeconds((prev) => {
        // 0초까지 샜으면 분을 바꿔주고 59초로 바꿔준다.
        if (prev <= 0) {
          setLeftMinutes((prev) => {
            // 0분까지 샜으면 다음 타이머까지 20분 남았다는 것이므로 설정해준다.
            if (prev <= 0) {
              setLeftSeconds(59);
              return dataScrapingInterval - 1;
            }
            return prev - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Info marginLeft={marginLeft}>
      <div>
        다음 데이터 수집까지{' '}
        <b>
          {leftMinutes != 0 && `${leftMinutes}분`} {leftSeconds}초
        </b>{' '}
        남았습니다.
      </div>
      <div>
        <AiFillQuestionCircle
          size="18px"
          color="var(--color-textgrey)"
          data-tooltip-id="info-tooltip"
        />
      </div>
      <Tooltip
        id="info-tooltip"
        place="right"
        content={
          <div style={{ lineHeight: '1.5' }}>
            데이터는 정각 기준 20분 주기로 수집되며 (매시 정각, 20분, 40분)
            <br />
            이후 사이트에 반영되기까지는 약 20초 정도 소요됩니다.
          </div>
        }
      />
    </Info>
  );
}

export default LeftTime;
