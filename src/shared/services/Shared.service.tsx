import type { NotificationInstance } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const getTenant = () => {
  return window.location.hostname.split(".")[0];
};

export const getApiURL = () => {
  return `http://${getTenant()}.localhost:8000`;
}

export const openNotificationWithIcon = (api:NotificationInstance,type: NotificationType,message:string,description:string,details?:string[]) => {
  let stringDetail = ""
  if(details){
    stringDetail = Object.entries(details)
      .map(([field, messages]) => 
        Array.isArray(messages)
          ? `${field}: ${messages.join(', ')}`
          : `${field}: ${messages}`
      )
      .join('\n');
  }

  api[type]({
    message: message,
    description: (
    <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
      {description + "\n" + stringDetail}
    </pre>
  ),
  });
};