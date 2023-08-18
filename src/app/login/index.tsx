'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from 'antd';
import { ThemeContent } from '@/components';
import styles from './styles.module.scss';

const Login = () => {
  const { data: session } = useSession();
  console.log('session', session);

  return (
    <ThemeContent>
      <div className={styles.login}>
        <Button type="primary" onClick={() => signIn('github')}>
          Login With Github
        </Button>
      </div>
    </ThemeContent>
  );
};

export default Login;
