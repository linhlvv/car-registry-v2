"use client"

import { authApi } from '@/api/auth/auth';
import styles from '@/app/auth/page.module.css';
import background from '@/assets/images/auth/background.jpeg';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { setAccountId, setAccessToken } from '@/utils/Credentials';
import { getWindow } from '@/utils/Common';

const Login = () => {
  const [imageHeight, setImageHeight] = useState(getWindow()?.innerHeight);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setImageHeight(getWindow()?.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderBackgroundImage = () => {
    return (
      <Image
        src={background}
        alt='login'
        className={styles.background}
        width={undefined}
        height={imageHeight}
      />
    )
  }

  const renderTitle = () => {
    return (
      <div className={styles.formTitle}>Welcome to RegistryTotal</div>
    )
  }

  const handleLogin = async () => {
    try {
      const response = await authApi.login({ email, password });
      setAccountId(response?.id);
      setAccessToken(response?.token);
      if (getWindow()) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const renderInput = () => {
    return (
      <>
        <Input
          className={styles.formInput}
          size='large'
          placeholder='Email'
          variant='borderless'
          prefix={<MailOutlined style={{ marginRight: '10px' }} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          className={styles.formInput}
          size='large'
          placeholder='Password'
          variant='borderless'
          prefix={<LockOutlined style={{ marginRight: '10px' }} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
    )
  }

  const renderButton = () => {
    return (
      <Button className={styles.formButton} onClick={handleLogin}>Login</Button>
    )
  }

  const renderForm = () => {
    return (
      <div className={styles.form}>
        <div className={styles.formContent}>
          {renderTitle()}
          {renderInput()}
          {renderButton()}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {renderForm()}
      {renderBackgroundImage()}
    </div>
  )
}

export default Login;
