import React, { useEffect, useState, useCallback } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';

import {
  CardList,
  ShareButton,
  FeedbackButton,
  LoadingIcon,
  NoRestaurantsAvailable,
  Instructions,
} from '@app/components';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { env, routes, flows } from '@constants/constants';
import { CrossIconButtonWithText, LikeIconButtonWithText } from '@components/Icons/Icons';
import { Match } from '@app/views';
import { useRestaurants } from '@hooks/useRestaurants';
import { logScreenView } from '@services/googleAnalytics.service';
import { setMatch } from '@app/redux/actions/user.actions';

import styles from './home.module.scss';

const HomeViewBase = (props) => {
  const { sessionId, match, likes, flow, loading: firebaseLoading, noMoreRestaurants } = props;
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { restaurants, loading: gMapsLoading, swipe, onSwipe, onCardLeftScreen } = useRestaurants(
    flow,
  );

  const [size, setSize] = useState('medium');
  const history = useHistory();
  const loading = flow === flows.FIRESTORE ? firebaseLoading : gMapsLoading;

  useEffect(() => {
    if (width > 768) setSize('large');
    else setSize('medium');
  }, [width]);

  const onCloseMatch = () => {
    dispatch(setMatch(null));
  };

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    logScreenView('swipe', onError);
  }, [onError]);

  const render = () => {
    try {
      getFirestore();
    } catch (e) {
      history.push(routes.LAUNCHER);
    }

    const showNoRestaurantsScreen =
      flow === flows.FIRESTORE ? noMoreRestaurants : !match && restaurants?.length === 0;
    if (showNoRestaurantsScreen) return <NoRestaurantsAvailable />;

    if (restaurants) {
      const showLoadingScreen = (!noMoreRestaurants && restaurants == null) || loading;

      return match ? (
        <Match restaurant={likes[match]} onClose={onCloseMatch} showMap />
      ) : (
        <>
          <Instructions />
          <div className={styles.Home}>
            <div
              className={cx({
                [styles.Show]: showLoadingScreen,
                [styles.Hide]: !showLoadingScreen,
              })}
            >
              <LoadingIcon />
            </div>
            <div className={styles.Home__Body}>
              <CardList
                list={restaurants}
                onSwipe={onSwipe}
                onCardLeftScreen={onCardLeftScreen}
                flow={flow}
              />
            </div>
            <div className={styles.Home__Buttons}>
              <CrossIconButtonWithText
                onClick={() => swipe('left')}
                size={size}
                caption="No Me gusta"
              />
              <ShareButton sessionId={sessionId} />
              <LikeIconButtonWithText
                onClick={() => swipe('right')}
                size={size}
                caption="¡Me gusta!"
              />
            </div>
            <FeedbackButton projectId={env.FEEDBACK_ID} />
          </div>
        </>
      );
    }

    return null;
  };

  return render();
};

const mapStateToProps = ({
  user: { userUid, sessionId, match, likes, flow },
  hydrate: {
    application: { loading, noMoreRestaurants },
  },
}) => ({
  userUid,
  sessionId,
  match,
  likes,
  flow,
  loading,
  noMoreRestaurants,
});

HomeViewBase.defaultProps = {
  match: null,
  sessionId: '',
  flow: '',
};

HomeViewBase.propTypes = {
  sessionId: PropTypes.string,
  match: PropTypes.string,
  // Add base object.
  // eslint-disable-next-line react/forbid-prop-types
  likes: PropTypes.object.isRequired,
  flow: PropTypes.string,
  noMoreRestaurants: PropTypes.bool.isRequired,
};

const HomeView = connect(mapStateToProps)(HomeViewBase);
export default HomeView;
