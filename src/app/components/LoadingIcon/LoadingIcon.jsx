import React from 'react';
import burgerChomp from '@assets/BurgerChomp.gif';
import styles from './LoadingIcon.module.scss';

export const LoadingIcon = () => (
  <img alt="loading" src={burgerChomp} className={styles.Loading_Icon} />
);
