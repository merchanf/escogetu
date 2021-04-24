import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@app/components';

import './CardList.scss';

export const CardList = ({ list, onSwipe, onCardLeftScreen }) => {
  return (
    <div className="card-list">
      {list.map(({ placeId, name, pictures, distance }, index) => (
        <Card
          id={placeId}
          name={name}
          pictures={pictures}
          distance={distance}
          key={name}
          onSwipe={onSwipe}
          index={list.length - index}
          onSwipe={onSwipe}
          onCardLeftScreen={onCardLeftScreen}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSwipe: PropTypes.func.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
};
