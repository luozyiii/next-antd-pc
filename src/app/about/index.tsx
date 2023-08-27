import { cookies } from 'next/headers';
import { CustomLayout } from '@/components';
import styles from './styles.module.scss';

const About = () => {
  const token = cookies().get('token')?.value || '';
  const _userInfoStr = cookies().get('userInfo')?.value;
  const userInfo = _userInfoStr ? JSON.parse(_userInfoStr || '{}') : {};

  return (
    <CustomLayout token={token} userInfo={userInfo}>
      <div className={styles.box}>
        <h4>或许您可以通过下面几个链接了解</h4>
        <ul>
          <li>
            掘金：
            <a href="https://juejin.cn/user/1820446984504135" target="_blank">
              https://juejin.cn/user/1820446984504135
            </a>
          </li>
          <li>
            Github：
            <a href="https://github.com/luozyiii" target="_blank">
              https://github.com/luozyiii
            </a>
          </li>
        </ul>
      </div>
    </CustomLayout>
  );
};

export default About;
