import React, { useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import {
  Card,
  Title,
  TitleWrapper,
  EditButton,
  NoDifficulty,
  SliderWrapper,
} from './style';
import Slider from 'rc-slider';
import { CommonTierImg } from 'style/commonStyle';
import useFetch from 'hooks/useFetch';
import { getUserTodayRandomProblem, putUserRandomLevel } from 'api/user';
import { numToTierStr, tierStrToNum } from 'utils/tier';

/**
 * 마이페이지 랜덤 문제 난이도 설정 카드
 */
function RandomCard({ userInfo }) {
  const [startTier, setStartTier] = useState(0);
  const [endTier, setEndTier] = useState(0);
  const [hasLevel, setHasLevel] = useState(false);
  const [tierMarks, setTierMarks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [randomStreak, fetchRandomStreak] = useFetch(
    getUserTodayRandomProblem,
    {},
    { bojHandle: userInfo.bojHandle },
  );

  useEffect(() => {
    if (isEmpty(randomStreak)) return;
    if (randomStreak.startLevel == '' && randomStreak.endLevel == '') return;
    setHasLevel(true);
    setStartTier(tierStrToNum(randomStreak.startLevel));
    setEndTier(tierStrToNum(randomStreak.endLevel));
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

  const clickEditButton = useCallback(() => {
    if (!isEdit && !hasLevel) {
      setEndTier(4);
    } else if (isEdit) {
      const params = {
        bojHandle: userInfo.bojHandle,
        start: numToTierStr(startTier),
        end: numToTierStr(endTier),
      };
      putUserRandomLevel(params)
        .then((res) => {
          if (res.data.code != 200) {
            // 에러 처리
            return;
          }
          fetchRandomStreak();
        })
        .catch((e) => {
          // 에러 처리
        });
    }
    setIsEdit((prev) => !prev);
  }, [userInfo, startTier, endTier]);

  return (
    <Card>
      <TitleWrapper>
        <Title>
          랜덤 문제 난이도 &nbsp;
          {(hasLevel || isEdit) && (
            <>
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
            </>
          )}
        </Title>
        <EditButton onClick={clickEditButton}>
          {isEdit ? '편집 완료' : '편집하기'}
        </EditButton>
      </TitleWrapper>
      {!hasLevel && !isEdit && (
        <NoDifficulty>
          <div>
            랜덤 문제 난이도가 설정되지 않았습니다. ‘편집하기’ 버튼을 클릭하여
            랜덤으로 추천받을 문제의 난이도를 설정해주세요.
          </div>
        </NoDifficulty>
      )}
      {(hasLevel || isEdit) && (
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
      )}
    </Card>
  );
}

export default RandomCard;
