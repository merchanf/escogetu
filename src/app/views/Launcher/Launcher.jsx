import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import routes from '@constants/routes.constants';
import Logo from './logo.webp';
import styles from './Launcher.module.scss';

const LauncherBase = ({ isFirebaseLoading, hydrating, isGoogleMapsLoading, geoLocation }) => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session');
    if (!hydrating && !isFirebaseLoading && !isGoogleMapsLoading) {
      let route = `/${routes.SETTING_UP}`;
      if (sessionId) route = `/${routes.SWIPE}?session=${sessionId}`;
      console.log('geoLocation', geoLocation);
      history.push(route);
    }
  }, [geoLocation, history, hydrating, isFirebaseLoading, isGoogleMapsLoading]);

  return (
    <Layout>
      <main className={styles.Launch}>
        <img src={Logo} alt="Logo de Escogetu" />
      </main>
    </Layout>
  );
};

const mapStateToProps = ({
  hydrate: {
    firebase: { loading: isFirebaseLoading },
    hydrating,
    googleMaps: { loading: isGoogleMapsLoading },
  },
  user: { sessionId, geoLocation },
}) => ({
  isFirebaseLoading,
  hydrating,
  sessionId,
  isGoogleMapsLoading,
  geoLocation,
});

LauncherBase.defaultProps = {
  isFirebaseLoading: true,
  hydrating: true,
  isGoogleMapsLoading: true,
};

LauncherBase.propTypes = {
  isFirebaseLoading: PropTypes.bool,
  hydrating: PropTypes.bool,
  isGoogleMapsLoading: PropTypes.bool,
};

const Launcher = connect(mapStateToProps)(LauncherBase);
export default Launcher;
