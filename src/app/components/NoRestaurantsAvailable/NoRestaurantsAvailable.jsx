import React from 'react';
import Layout from '@components/Layout/Layout';
import EmptyFries from './emptyfries.webp';
import styles from './NoRestaurantsAvailable.module.scss';

const NoRestaurantsAvailable = () => {
  return (
    <Layout>
      <main className={styles.NoRestaurantsAvailable}>
        <img src={EmptyFries} alt="Empty fries package" />
        <p> No hay más restaurantes disponibles :( </p>
        <button type="button" onClick={() => window.open(window.location.href, '_self')}>
          Ir a inicio
        </button>
      </main>
    </Layout>
  );
};

export default NoRestaurantsAvailable;
