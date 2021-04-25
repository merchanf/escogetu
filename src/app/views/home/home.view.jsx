import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { CardList, LoadingIcon } from '@app/components';
import { FeedbackButton } from '@app/components/FeedbackButton/FeedbackButton';
import { CrossIconButton, LikeIconButton, ShareIconButton } from '@components/Icons/Icons';

import './home.view.scss';
import { useRestaurants } from '@hooks/useRestaurants';

const HomeViewBase = () => {
  const feederShProjectId = process.env.REACT_APP_FEEDBACK_ID;
  // eslint-disable-next-line no-unused-vars
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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
        <ShareIconButton onClick={() => setIsShareModalOpen(true)} size="small" color="blue" />
        <LikeIconButton onClick={() => swipe('right')} size="medium" color="green" />
      </div>
      <FeedbackButton projectId={feederShProjectId} />
    </div>
  );
};

const mapStateToProps = ({ user: { userUid } }) => ({
  userUid,
});

HomeViewBase.defaultProps = {};

HomeViewBase.propTypes = {};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
