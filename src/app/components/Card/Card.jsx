import React, { useState, forwardRef, createRef } from 'react';
import TinderCard from 'react-tinder-card';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

import styles from './Card.scss';

export const Card = ({
  distance,
  height,
  id,
  index,
  name,
  onCardLeftScreen,
  onSwipe,
  pictures,
}) => {
  const [selectedPicture, setSelectedPicture] = useState(0);
  const cardRef = createRef();
  const handleRightButton = () => {
    if (selectedPicture + 1 < pictures.length) setSelectedPicture((prevState) => prevState + 1);
  };

  const handleLeftButton = () => {
    if (selectedPicture - 1 >= 0) setSelectedPicture((prevState) => prevState - 1);
  };

  const trueHeight = height ? Math.trunc(height * 0.9) : 0;
  const trueWidth = height ? Math.trunc(height * 0.50625) : 0; // 56.25% of 90%

  return (
    <TinderCard
      className="tinder-card"
      onSwipe={(dir) => onSwipe(dir, id)}
      ref={cardRef}
      onCardLeftScreen={onCardLeftScreen}
    >
      <div
        className="tinder-card__picture"
      >
        {pictures ? (
          <img
            className="tinder-card__picture-img"
            src={pictures[selectedPicture]}
            alt={`${name} - ${selectedPicture}`}
          />
        ) : (
          <Skeleton variant="rect" width={trueWidth} height={trueHeight} animation="wave">
            <img
              style={{
                maxHeight: trueHeight,
                maxWidth: trueWidth, // 60% of 90%
                width: 'auto',
                height: 'auto',
              }}
              alt="card"
            />
          </Skeleton>
        )}
        <div className="tinder-card__buttons">
          {selectedPicture - 1 >= 0 ? (
            <button
              type="button"
              className="tinder-card__buttons__button"
              onClick={handleLeftButton}
              onTouchStart={handleLeftButton}
            >
              {'<'}
            </button>
          ) : (
            <div />
          )}
          {pictures && selectedPicture + 1 < pictures.length && (
            <button
              type="button"
              className={styles.Card__Buttons__Button}
              onClick={handleRightButton}
              onTouchStart={handleRightButton}
            >
              {'>'}
            </button>
          )}
        </div>
        <p className={styles.Card__Name}>
          <b>{name}</b>, {distance}
        </p>
      </div>
    </TinderCard>
  );
};

Card.defaultProps = {
  height: 1920,
};

Card.propTypes = {
  distance: PropTypes.string.isRequired,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
  onSwipe: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
