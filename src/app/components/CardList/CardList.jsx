import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardWrapper } from '@components/index';
import { flows } from '@constants/constants';

import styles from './CardList.module.scss';

const CardList = ({ list, onSwipe, onCardLeftScreen, flow }) => {
  const SwipeCard = flow === flows.FIRESTORE ? CardWrapper : Card;

  return (
    <div className={styles.Container}>
      {list.map(
        ({ placeId, name, details, pictures, lowResPictures, distance, ref: innerRef }, index) => (
          <SwipeCard
            id={placeId}
            name={name}
            pictures={details?.pictures || pictures}
            lowResPictures={lowResPictures}
            distance={distance}
            key={`${placeId}-${index}`}
            onSwipe={onSwipe}
            index={index}
            onCardLeftScreen={onCardLeftScreen}
            ref={innerRef}
          />
        ),
      )}
    </div>
  );
};

CardList.defaultProps = {
  flow: '',
};

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSwipe: PropTypes.func.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
  flow: PropTypes.string,
};

export default CardList;
