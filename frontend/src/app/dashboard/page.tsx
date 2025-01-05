"use client"

import styles from '@/app/dashboard/page.module.css';
import { getAccountId } from '@/utils/Credentials';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import background from '@/assets/images/dashboard/background.png';
import { getWindow } from '@/utils/Common';
const Dashboard = () => {
  const [accountId, setAccountId] = useState<string>('');

  useEffect(() => {
    const accountId = getAccountId();
    if (accountId) {
      setAccountId(accountId);
    }
  }, []);

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <div className={styles.headerTitle}>RegistryTotal</div>
        <div className={styles.headerUser}>
          <div className={styles.headerUserId}>{accountId}</div>
          <div className={styles.headerUserAvatar}>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        </div>
      </div>
    )
  }

  const renderBackground = () => {
    return (
      <div className={styles.background}>
        {renderContent()}
        <div className={styles.backgroundImage}>
          <Image src={background} alt="background" width={undefined} height={1000} />
        </div>
      </div>
    )
  }


  const renderContent = () => {
    return (
      <div className={styles.content}>
        <div className={styles.contentTitle}>Take your car registry management experience to the next level.</div>
        <div className={styles.contentDescription}>With this application, registry management can be much easier and enjoyable than ever with modern interface and extremely convenient functions.</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {renderHeader()}
      {renderBackground()}
    </div>
  )
}

export default Dashboard;
