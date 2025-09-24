import type { NotificationInstance } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const getTenant = () => {
  return window.location.hostname.split(".")[0];
};

export const getApiURL = () => {
  return `http://${getTenant()}.localhost:8000`;
}

export const openNotificationWithIcon = (api:NotificationInstance,type: NotificationType,message:string,description:string) => {
  api[type]({
    message: message,
    description: description,
  });
};