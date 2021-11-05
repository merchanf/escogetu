import React from 'react';
import { useMount } from '@hooks/use-mount.hook';
import Layout from '@components/Layout/Layout';
import Logo from './logo.webp';
import styles from './Launcher.module.scss';

const Launcher = () => {
  useMount(() => {});

  return (
    <Layout>
      <main className={styles.Launch}>
        <img src={Logo} alt="Logo de Escogetu" />
      </main>
    </Layout>
  );
};

export default Launcher;
