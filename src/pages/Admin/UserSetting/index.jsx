import React, { useCallback, useEffect, useState } from 'react';
import { Card, Content, ScrollButton, Title, User, UserWrapper } from './style';
import useScroll from 'hooks/useScroll';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import { USER_SETTING_PREFIX_URL } from 'utils/constants';
import { ToggleButton } from './style';
import {
  toggleUserScrapingSetting,
  toggleUserWarningSetting,
} from 'api/userSetting';
import { toast } from 'react-toastify';

function UserSetting() {
  const { data: userSetting, mutate: mutateSettings } = useSWR(
    `${USER_SETTING_PREFIX_URL}/all`,
    fetcher,
  );

  const [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ] = useScroll();

  const onClickToggleScraping = (setting) => {
    const isAgree = confirm(
      '<' +
        setting.bojHandle +
        '>의 크롤링 설정을 ' +
        (setting.scrapingOn ? 'ON' : 'OFF') +
        ' -> ' +
        (setting.scrapingOn ? 'OFF' : 'ON') +
        '(으)로 변경하시겠습니까?\n',
    );
    if (!isAgree) return;
    toggleUserScrapingSetting(setting.bojHandle)
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          console.log(res);
        toast.success('크롤링 설정이 변경되었습니다.');
        mutateSettings();
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        }
      });
  };

  const onClickToggleWarning = (setting) => {
    const isAgree = confirm(
      '<' +
        setting.bojHandle +
        '>의 경고 설정을 ' +
        (setting.scrapingOn ? 'ON' : 'OFF') +
        ' -> ' +
        (setting.scrapingOn ? 'OFF' : 'ON') +
        '(으)로 변경하시겠습니까?\n',
    );
    if (!isAgree) return;
    toggleUserWarningSetting(setting.bojHandle)
      .then((res) => {
        if (res.status !== 200)
          //에러 처리
          console.log(res);
        toast.success('경고 설정이 변경되었습니다.');
        mutateSettings();
        return;
      })
      .catch((e) => {
        const { data } = e.response;
        if (data && data.code == 400) {
          toast.error(data.message);
          return;
        }
      });
  };

  if (!userSetting) return null;

  return (
    <Card>
      <Title>유저 설정</Title>
      <Content>
        <UserWrapper ref={horizontalScrollRef}>
          {userSetting.map((setting) => (
            <User key={setting.bojHandle}>
              <div>{setting.bojHandle}</div>
              <ToggleButton
                isActive={setting.scrapingOn}
                onClick={() => onClickToggleScraping(setting)}
              >
                {setting.scrapingOn ? '크롤링 ON' : '크롤링 OFF'}
              </ToggleButton>
              <ToggleButton
                isActive={setting.warningOn}
                onClick={() => onClickToggleWarning(setting)}
              >
                {setting.warningOn ? '경고 ON' : '경고 OFF'}
              </ToggleButton>
            </User>
          ))}
        </UserWrapper>
        <ScrollButton
          onClick={() => {
            handleNextButtonClick('prev');
          }}
          onMouseOver={() => setArrowHovering('prev', true)}
          onMouseOut={() => setArrowHovering('prev', false)}
          type="prev"
        >
          {leftArrowHovering && (
            <div>
              <FaChevronLeft />
            </div>
          )}
        </ScrollButton>
        <ScrollButton
          onClick={() => {
            handleNextButtonClick('next');
          }}
          onMouseOver={() => setArrowHovering('next', true)}
          onMouseOut={() => setArrowHovering('next', false)}
          type="next"
        >
          {rightArrowHovering && (
            <div>
              <FaChevronRight />
            </div>
          )}
        </ScrollButton>
      </Content>
    </Card>
  );
}

export default UserSetting;
