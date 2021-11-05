import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Layout from '@components/Layout/Layout';
import routes from '@constants/routes.constants';
import Logo from './logo.webp';
import styles from './Launcher.module.scss';

const LauncherBase = ({ isFirebaseLoading, hydrating }) => {
  const history = useHistory();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session');
    if (!hydrating && !isFirebaseLoading) {
      let route = `/${routes.SETTING_UP}`;
      if (sessionId) route = `/${routes.SWIPE}?session=${sessionId}`;
      history.push(route);
    }
  }, [history, hydrating, isFirebaseLoading]);

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
  },
  user: { sessionId },
}) => ({
  isFirebaseLoading,
  hydrating,
  sessionId,
});

LauncherBase.defaultProps = {
  isFirebaseLoading: true,
  hydrating: true,
};

LauncherBase.propTypes = {
  isFirebaseLoading: PropTypes.bool,
  hydrating: PropTypes.bool,
};

const Launcher = connect(mapStateToProps)(LauncherBase);
export default Launcher;
