import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

import styles from './CardList.module.scss';

const CardList = ({ list, onSwipe, onCardLeftScreen }) => {
  const ref = useRef(null);

  return (
    <div className={styles.Container} ref={ref}>
      {list.map(
        ({ placeId, name, details, pictures, lowResPictures, distance, ref: innerRef }, index) => (
          <Card
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

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSwipe: PropTypes.func.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
};

export default CardList;
