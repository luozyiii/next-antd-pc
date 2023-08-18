import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageContent } from '@/components';
import { items } from './data';
import styles from './page.module.css';

const getData = (cat: string) => {
  const data = items[cat];

  if (data) {
    return data;
  }

  return notFound();
};

const Category = ({ params }: any) => {
  const data = getData(params.category);
  return (
    <PageContent back>
      <div className={styles.container}>
        <h1 className={styles.catTitle}>{params.category}</h1>

        {data.map((item: any) => (
          <div className={styles.item} key={item.id}>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.desc}</p>
            </div>
            <div className={styles.imgContainer}>
              <Image className={styles.img} fill={true} src={item.image} alt="" />
            </div>
          </div>
        ))}
      </div>
    </PageContent>
  );
};

export default Category;
