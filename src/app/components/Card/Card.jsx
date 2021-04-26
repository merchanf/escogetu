import React, { useState, forwardRef } from 'react';
import TinderCard from 'react-tinder-card';
import PropTypes from 'prop-types';

import styles from './Card.module.scss';

export const Card = forwardRef(
  ({ distance, id, index, name, onCardLeftScreen, onSwipe, pictures }, ref) => {
    const [selectedPicture, setSelectedPicture] = useState(0);

    const handleRightButton = () => {
      if (selectedPicture + 1 < pictures.length) setSelectedPicture((prevState) => prevState + 1);
    };

    const handleLeftButton = () => {
      if (selectedPicture - 1 >= 0) setSelectedPicture((prevState) => prevState - 1);
    };

    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          zIndex: index,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <TinderCard
          className={styles.TinderCard}
          onSwipe={(dir) => onSwipe(dir, id)}
          ref={ref}
          onCardLeftScreen={onCardLeftScreen}
        >
          <div className={styles.Card}>
            <div className={styles.Card__Counter}>
              <span className={styles.Card__Counter__Label}>
                <p>
                  {selectedPicture + 1}/{pictures.length}
                </p>
              </span>
            </div>

            <img
              className={styles.Card__Image}
              src={pictures[selectedPicture]}
              alt={`${name} - ${selectedPicture}`}
            />
            <div className={styles.Card__Buttons}>
              {selectedPicture - 1 >= 0 ? (
                <button
                  type="button"
                  className={styles.Card__Buttons__Button}
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
      </div>
    );
  },
);

Card.defaultProps = {
  onCardLeftScreen: () => {},
  name: 'Restaurante',
};

Card.propTypes = {
  distance: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  onCardLeftScreen: PropTypes.func,
  onSwipe: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
