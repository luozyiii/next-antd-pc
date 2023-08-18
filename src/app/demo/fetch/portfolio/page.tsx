import React from 'react';
import Link from 'next/link';
import { PageContent } from '@/components';
import styles from './page.module.css';

const Portfolio = () => {
  return (
    <PageContent>
      <div className={styles.container}>
        <h1 className={styles.selectTitle}>这是一个获取本地数据的示例。</h1>
        <div className={styles.items}>
          <Link href="/demo/fetch/portfolio/illustrations" className={styles.item}>
            <span className={styles.title}>代表作一</span>
          </Link>
          <Link href="/demo/fetch/portfolio/websites" className={styles.item}>
            <span className={styles.title}>代表作二</span>
          </Link>
          <Link href="/demo/fetch/portfolio/applications" className={styles.item}>
            <span className={styles.title}>代表作三</span>
          </Link>
        </div>
      </div>
    </PageContent>
  );
};

export default Portfolio;
