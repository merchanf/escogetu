import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardList } from '@app/components';
import { CrossIconButton, LikeIconButton, ShareIconButton } from '@components/Icons/Icons';

import './home.view.scss';
import { session } from '@services/firebase/firebase';

const HomeViewBase = ({ restaurantsList, userUid, sessionId }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const onCardLeftScreen = () => {
    console.log('onCardLeftScreen');
  };
  const onSwipe = async (direction, likedItem) => {
    if (direction === 'right') {
      await session.like(sessionId, userUid, likedItem);
    }
  };
  const swipe = () => {
    console.log('swipe');
  };

  return (
    <div className="Home">
      <div className="Home__Body">
        <CardList list={restaurantsList} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
      </div>
      <div className="Home__Buttons">
        <CrossIconButton onClick={() => swipe('left')} size="large" color="red" />
        <ShareIconButton onClick={() => setIsShareModalOpen(true)} color="blue" />
        <LikeIconButton onClick={() => swipe('right')} size="large" color="green" />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  user: { uid: userUid, sessionId },
  restaurants: { list: restaurantsList },
}) => ({
  restaurantsList,
  userUid,
  sessionId,
});

HomeViewBase.defaultProps = {
  userUid: null,
  sessionId: null,
};

HomeViewBase.propTypes = {
  restaurantsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userUid: PropTypes.string,
  sessionId: PropTypes.string,
};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
