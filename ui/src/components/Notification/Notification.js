import React from 'react'
import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';



export default function Notification(body,title) {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
          message: title,
          description:body,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
  return (
    openNotification()
  )
}
