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
import { useNavigate } from 'react-router-dom';

function NotificationPopup() {
  const { data: loginUser } = useSWR(
    isLoginUser() ? `${USER_PREFIX_URL}/auth/parse/boj` : '',
    fetcher,
  );
  const { data: notificationList, mutate } = useSWR(
    `${NOTIFY_PREFIX_URL}/search/receiver?receiver=${loginUser.claim}`,
    fetcher,
  );
  const { mutate: mutateNotificationCount } = useSWR(
    loginUser ? `${NOTIFY_PREFIX_URL}/search/unread/count` : null,
    fetcher,
  );
  const readNotificationProc = useCallback(async (id) => {
    try {
      await readNotification(id);
      mutate();
      mutateNotificationCount();
    } catch {
      toast.error('알림을 읽는데 문제가 발생하였습니다.');
    }
  }, []);

  const navigate = useNavigate();
  const hasNotification = notificationList?.length > 0;

  return (
    <Container fixHeight={!hasNotification}>
      {!hasNotification && (
        <NoNotification>도착한 알림이 없습니다.</NoNotification>
      )}
      {notificationList?.map((notification) => (
        <Notification
          key={notification.id}
          isRead={notification.isRead}
          onClick={() => {
            if (notification.relatedBoardId) {
              navigate(`/board/${notification.relatedBoardId}`);
            }
            readNotificationProc(notification.id);
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
