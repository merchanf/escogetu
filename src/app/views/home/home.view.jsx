import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardList, LoadingIcon } from '@app/components';
import { CrossIconButton, LikeIconButton, ShareIconButton } from '@components/Icons/Icons';

import './home.view.scss';
import { useRestaurants } from '@hooks/useRestaurants';

const HomeViewBase = () => {
  // eslint-disable-next-line no-unused-vars
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { restaurants, swipe, onSwipe, onCardLeftScreen } = useRestaurants();

  if (!restaurants.length) {
    return <LoadingIcon />;
  }

  return (
    <div className="Home">
      <div className="Home__Body">
        <CardList list={restaurants} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
      </div>
      <div className="Home__Buttons">
        <CrossIconButton onClick={() => swipe('left')} size="large" color="red" />
        <ShareIconButton onClick={() => setIsShareModalOpen(true)} color="blue" />
        <LikeIconButton onClick={() => swipe('right')} size="large" color="green" />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { uid: userUid } }) => ({
  userUid,
});

HomeViewBase.defaultProps = {};

HomeViewBase.propTypes = {};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
