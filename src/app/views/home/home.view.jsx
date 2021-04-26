import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardList, LoadingIcon, ShareButton, FeedbackButton } from '@app/components';
import { CrossIconButton, LikeIconButton } from '@components/Icons/Icons';

import './home.view.scss';
import { useRestaurants } from '@hooks/useRestaurants';

const HomeViewBase = ({ sessionId }) => {
  const domain = process.env.REACT_APP_DOMAIN;
  const feederShProjectId = process.env.REACT_APP_FEEDBACK_ID;
  const { restaurants, swipe, onSwipe, onCardLeftScreen } = useRestaurants();

  const restaurantsWithPhoto = useMemo(
    () => restaurants.filter((restaurant) => restaurant.pictures?.length),
    [restaurants],
  );
  if (!restaurantsWithPhoto.length) {
    return <LoadingIcon />;
  }

  return (
    <div className="Home">
      <div className="Home__Body">
        <CardList list={restaurants} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
      </div>
      <div className="Home__Buttons">
        <CrossIconButton onClick={() => swipe('left')} size="medium" color="red" />
        <ShareButton sessionId={sessionId} domain={domain} />
        <LikeIconButton onClick={() => swipe('right')} size="medium" color="green" />
      </div>
      <FeedbackButton projectId={feederShProjectId} />
    </div>
  );
};

const mapStateToProps = ({ user: { userUid, sessionId } }) => ({
  userUid,
  sessionId,
});

HomeViewBase.defaultProps = {};

HomeViewBase.propTypes = {
  sessionId: PropTypes.string.isRequired,
};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
