'use client';

import styles from './page.module.scss';

// 在这个页面使用 antd 组件会出现闪烁
//【生产环境】这个页面用 link 和 useRouter 都不能跳转成功，暂时用原生API 处理
export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <h1>404 - 迷路的小羔羊</h1>
      <p>您好, 这里什么都没有。</p>
      <span
        className={styles.goHome}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        返回首页
      </span>
    </div>
  );
}
