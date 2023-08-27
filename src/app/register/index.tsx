'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, message } from 'antd';
import { ThemeContent, Form } from '@/components';
import { fetchData } from '@/hooks/useFetch';
import styles from './styles.module.scss';

const fields: any[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    rules: [{ required: true, message: '请输入您的用户名!' }],
    cProps: {
      maxLength: 10,
    },
  },
  {
    type: 'password',
    label: '密码',
    name: 'password',
    rules: [{ required: true, message: '请输入您的密码!' }],
    cProps: {
      maxLength: 20,
    },
  },
  {
    type: 'password',
    label: '确认密码',
    name: 'password2',
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: '请再次输入你的密码!',
      },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('两次密码不一致!'));
        },
      }),
    ],
    cProps: {
      maxLength: 20,
    },
  },
];

const Login = () => {
  const router = useRouter();
  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      await formRef?.current?.validateFields();
      const { username, password } = formRef?.current?.getFieldsValue();

      setLoading(true);
      const { data } = await fetchData({
        url: '/user/register',
        method: 'post',
        params: {
          username,
          password,
        },
      });

      if (data) {
        message.success('注册成功!');
        router.push('/login');
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <ThemeContent>
      <div className={styles.register}>
        <div className={styles.registerBox}>
          <h4 className={styles.title}>您好，注册后可体验 NextJS 13项目!</h4>
          <Form labelCol={{ span: 6 }} requiredMark={false} ref={formRef} fields={fields} />
          <Button loading={loading} type="primary" block onClick={handleSubmit}>
            注册
          </Button>
          <div className={styles.footer}>
            <Button block onClick={() => router.back()}>
              返回
            </Button>
          </div>
          <div className={styles.h}></div>
        </div>
      </div>
    </ThemeContent>
  );
};

export default Login;
