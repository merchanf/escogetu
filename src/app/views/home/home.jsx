import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
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
} from '@app/components';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { env, routes } from '@constants/constants';
import { CrossIconButton, LikeIconButton } from '@components/Icons/Icons';
import { Instructions, Match } from '@app/views';
import { useRestaurants } from '@hooks/useRestaurants';
import { logScreenView } from '@services/googleAnalytics.service';

import './home.scss';
import { setMatch } from '@app/redux/actions/user.actions';

const HomeViewBase = (props) => {
  const { sessionId, match, likes, flow } = props;
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { restaurants, loading, swipe, onSwipe, onCardLeftScreen } = useRestaurants(flow);
  const [showInstructions, setShowInstructions] = useState(
    !localStorage.getItem('closeAndNeverShowAgain'),
  );
  const [size, setSize] = useState('medium');
  const modalRef = useRef(null);
  const history = useHistory();

  const restaurantsWithPhoto = useMemo(
    () => restaurants?.filter((restaurant) => restaurant?.pictures?.length),
    [restaurants],
  );

  useEffect(() => {
    if (width > 768) setSize('large');
    else setSize('medium');
  }, [width]);

  const onCloseInstructions = () => {
    setShowInstructions(false);
  };

  const onCloseMatch = () => {
    dispatch(setMatch(null));
  };

  const onCloseAndNeverShowAgain = () => {
    setShowInstructions(false);
    localStorage.setItem('closeAndNeverShowAgain', true);
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

    if (restaurants == null || loading) return <LoadingIcon />;
    if (!match && restaurantsWithPhoto?.length === 0) return <NoRestaurantsAvailable />;
    if (showInstructions)
      return (
        <Instructions
          onClose={onCloseInstructions}
          onCloseAndNeverShowAgain={onCloseAndNeverShowAgain}
        />
      );

    if (restaurants) {
      return match ? (
        <Match restaurant={likes[match]} onClose={onCloseMatch} showMap />
      ) : (
        <div className="Home" ref={modalRef}>
          <div className="Home__Body">
            <CardList list={restaurants} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
          </div>
          <div className="Home__Buttons">
            <CrossIconButton onClick={() => swipe('left')} size={size} />
            <ShareButton sessionId={sessionId} />
            <LikeIconButton onClick={() => swipe('right')} size={size} />
          </div>
          <FeedbackButton projectId={env.FEEDBACK_ID} />
        </div>
      );
    }

    return null;
  };

  return render();
};

const mapStateToProps = ({ user: { userUid, sessionId, match, likes, flow } }) => ({
  userUid,
  sessionId,
  match,
  likes,
  flow,
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
};

const HomeView = connect(mapStateToProps)(HomeViewBase);
export default HomeView;
