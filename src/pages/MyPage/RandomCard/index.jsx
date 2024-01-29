import React, { useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import {
  Card,
  Title,
  TitleWrapper,
  EditButton,
  NoDifficulty,
  SliderWrapper,
  SwitchWrapper,
  InfoWRapper,
} from './style';
import Slider from 'rc-slider';
import { CommonTierImg } from 'style/commonStyle';
import { putUserRandomLevel } from 'api/user';
import { numToTierStr, tierStrToNum } from 'utils/tier';
import Switch from 'react-switch';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { USER_PREFIX_URL } from 'utils/constants';
import fetcher from 'utils/fetcher';

/**
 * 마이페이지 랜덤 문제 난이도 설정 카드
 */
function RandomCard() {
  const [startTier, setStartTier] = useState(0);
  const [endTier, setEndTier] = useState(0);
  const [hasLevel, setHasLevel] = useState(false);
  const [tierMarks, setTierMarks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isKo, setIsKo] = useState(true);

  // 사용자 정보
  const { bojHandle } = useParams();
  const { data: userInfo } = useSWR(
    `${USER_PREFIX_URL}/info?bojHandle=${bojHandle}`,
    fetcher,
  );
  // 로그인한 사용자 여부
  const { data: loginUser } = useSWR(
    `${USER_PREFIX_URL}/auth/parse/boj`,
    fetcher,
  );
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (!loginUser) return;
    setIsUser(loginUser.claim === bojHandle);
  }, [loginUser]);

  const { data: randomStreak, mutate: mutateRandomStreak } = useSWR(
    `${USER_PREFIX_URL}/streak/streak?bojHandle=${bojHandle}`,
    fetcher,
  );

  useEffect(() => {
    if (isEmpty(randomStreak)) return;
    if (randomStreak.startLevel == '' && randomStreak.endLevel == '') return;
    setHasLevel(true);
    setStartTier(tierStrToNum(randomStreak.startLevel));
    setEndTier(tierStrToNum(randomStreak.endLevel));
    if (randomStreak.isKo != null) setIsKo(randomStreak.isKo);
  }, [randomStreak]);

  useEffect(() => {
    // 슬라이더에 마커 설정 (5 단위, 티어 색상이 변경될 때 마다 티어 이미지 삽입)
    const marks = [...Array(30)].map((_, i) => {
      if (i % 5 == 0)
        return (
          <CommonTierImg
            width={18}
            height={18}
            src={`https://static.solved.ac/tier_small/${i + 1}.svg`}
          />
        );
    });
    // 배열을 객체로 바꿈
    setTierMarks(
      marks.reduce((accumulator, value, index) => {
        return { ...accumulator, [index]: value };
      }, {}),
    );
  }, []);

  /**
   * 슬라이더 변경 핸들러
   */
  const onChangeSlider = useCallback((range) => {
    setStartTier(range[0]);
    setEndTier(range[1]);
  }, []);

  /**
   * 한국어 문제 추천 버튼 핸들러
   */
  const onClickKoButton = useCallback(() => {
    setIsKo((prev) => !prev);
  }, []);
  /**
   * 수정버튼 클릭 리스너
   */
  const clickEditButton = useCallback(() => {
    if (!isEdit && !hasLevel) {
      setEndTier(4);
    }
    if (isEdit) {
      const params = {
        bojHandle: userInfo.bojHandle,
        start: numToTierStr(startTier),
        end: numToTierStr(endTier),
        isKo,
      };
      putUserRandomLevel(params)
        .then((res) => {
          if (res.data.code != 200) {
            // 에러 처리
            return;
          }
          mutateRandomStreak();
          setIsEdit((prev) => !prev);
        })
        .catch((e) => {
          const { data } = e.response;
          if (data && data.code == 400) {
            toast.error(data.message);
          }
        });
    }
    if (!isEdit) {
      setIsEdit((prev) => !prev);
    }
  }, [userInfo, startTier, endTier, isKo]);

  return (
    <Card>
      <TitleWrapper>
        <Title>
          <div>랜덤 문제 난이도 &nbsp;</div>
          {(hasLevel || isEdit) && (
            <InfoWRapper>
              <CommonTierImg
                width={18}
                height={18}
                src={`https://static.solved.ac/tier_small/${startTier + 1}.svg`}
              />
              &nbsp;~&nbsp;
              <CommonTierImg
                width={18}
                height={18}
                src={`https://static.solved.ac/tier_small/${endTier + 1}.svg`}
              />
            </InfoWRapper>
          )}
        </Title>
        {isUser && (
          <EditButton onClick={clickEditButton}>
            {isEdit ? '편집 완료' : '편집하기'}
          </EditButton>
        )}
      </TitleWrapper>
      {!hasLevel && !isEdit && (
        <NoDifficulty>
          <div>
            랜덤 문제 난이도가 설정되지 않았습니다.
            {isUser &&
              '‘편집하기’ 버튼을 클릭하여 랜덤으로 추천받을 문제의 난이도를 설정해주세요.'}
          </div>
        </NoDifficulty>
      )}
      {(hasLevel || isEdit) && (
        <>
          <SliderWrapper>
            <Slider
              range
              min={0}
              max={29}
              value={[startTier, endTier]}
              allowCross={false}
              onChange={onChangeSlider}
              marks={tierMarks}
              disabled={!isEdit}
              trackStyle={{ backgroundColor: 'var(--color-toggle)' }}
            />
          </SliderWrapper>
          <SwitchWrapper>
            <span>한국어 문제만 추천 받기</span>
            <Switch
              onChange={onClickKoButton}
              checked={isKo}
              checkedIcon={false}
              uncheckedIcon={false}
              width={40}
              height={20}
              onColor="#3362c5"
              offColor="#d2d2d2"
              disabled={!isEdit}
            />
          </SwitchWrapper>
        </>
      )}
    </Card>
  );
}

export default RandomCard;
