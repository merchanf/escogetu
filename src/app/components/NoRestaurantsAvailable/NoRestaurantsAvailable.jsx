import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '@components/Layout/Layout';
import { registerGoHomeEvent } from '@services/firestoreAnalytics.service';
import EmptyFries from './emptyfries.webp';
import styles from './NoRestaurantsAvailable.module.scss';

const NoRestaurantsAvailable = ({ userUid, sessionId }) => {
  const [registered, setRegistered] = useState(false);

  const onClick = async () => {
    await registerGoHomeEvent(userUid, sessionId);
    setRegistered(true);
  };

  useEffect(() => {
    if (registered) {
      window.open(window.location.href, '_self');
    }
  }, [registered]);

  return (
    <Layout>
      <main className={styles.NoRestaurantsAvailable}>
        <img src={EmptyFries} alt="Empty fries package" />
        <p> No hay más restaurantes disponibles :( </p>
        <button type="button" onClick={onClick}>
          Ir a inicio
        </button>
      </main>
    </Layout>
  );
};

NoRestaurantsAvailable.propTypes = {
  userUid: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
};

export default NoRestaurantsAvailable;
