import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardList, LoadingIcon } from '@app/components';

const HomeViewBase = ({ loadingRestaurants, restaurants }) => {
  const onCardLeftScreen = () => {
    console.log('onCardLeftScreen');
  };
  const onSwipe = () => {
    console.log('onSwipe');
  };

  return (
    <div className="Home">
      <div className="Home__Body">
        {loadingRestaurants ? (
          <LoadingIcon />
        ) : (
          <CardList list={restaurants} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ restaurants: { loading: loadingRestaurants, restaurants } }) => ({
  loadingRestaurants,
  restaurants,
});

HomeViewBase.defaultProps = {};

HomeViewBase.propTypes = {
  loadingRestaurants: PropTypes.bool.isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
