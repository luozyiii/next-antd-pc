import React from 'react';
import styles from './page.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>/demo/fetch/portfolio路由下的公用布局组件</h1>
      {children}
    </div>
  );
};

export default Layout;
