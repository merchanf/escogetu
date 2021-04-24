import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardList } from '@app/components';
import { CrossIconButton, LikeIconButton, ShareIconButton } from '@components/Icons/Icons';

import './home.view.scss';

const HomeViewBase = ({ restaurantsList }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const onCardLeftScreen = () => {
    console.log('onCardLeftScreen');
  };
  const onSwipe = () => {
    console.log('onSwipe');
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

const mapStateToProps = ({ restaurants: { list: restaurantsList } }) => ({
  restaurantsList,
});

HomeViewBase.defaultProps = {};

HomeViewBase.propTypes = {
  restaurantsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
