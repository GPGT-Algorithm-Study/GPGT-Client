import React, { useCallback } from 'react';
import {
  Container,
  Message,
  NoNotification,
  Notification,
  NotifyType,
  Read,
} from './style';
import { isLoginUser } from 'utils/auth';
import fetcher from 'utils/fetcher';
import { notificationType } from 'utils/notification';
import { NOTIFY_PREFIX_URL, USER_PREFIX_URL } from 'utils/constants';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { readNotification } from 'api/notify';

function NotificationPopup() {
  const { data: loginUser } = useSWR(
    isLoginUser() ? `${USER_PREFIX_URL}/auth/parse/boj` : '',
    fetcher,
  );
  const { data: notificationList, mutate } = useSWR(
    `${NOTIFY_PREFIX_URL}/search/receiver?receiver=${loginUser.claim}`,
    fetcher,
  );
  const onClickNotification = useCallback(async (id) => {
    try {
      await readNotification(id);
      mutate();
    } catch {
      toast.error('알림을 읽는데 문제가 발생하였습니다.');
    }
  }, []);

  return (
    <Container>
      {notificationList?.length === 0 && (
        <NoNotification>도착한 알림이 없습니다.</NoNotification>
      )}
      {notificationList?.map((notification) => (
        <Notification
          key={notification.id}
          isRead={notification.isRead}
          onClick={() => {
            onClickNotification(notification.id);
          }}
        >
          <NotifyType>{notificationType[notification.type].label}</NotifyType>
          <Message>{notification.message}</Message>
          <Read>{notification.isRead ? '읽음' : ''}</Read>
        </Notification>
      ))}
    </Container>
  );
}

export default NotificationPopup;
