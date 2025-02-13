import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <h1>It is not just about Events and Marketing</h1>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading; 