import React from 'react';
import Layout from '../Layout/Layout';
import Logo from './logo.webp';
import styles from './Launch.module.scss';

const Launch = () => {
  return (
    <Layout>
      <main className={styles.Launch}>
        <img src={Logo} alt="Logo de Escogetu" />
      </main>
    </Layout>
  );
};

export default Launch;
