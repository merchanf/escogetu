import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import { ChevronRightIcon, ChevronLeftIcon } from '@components/Icons/Icons';
import TinderCard from '../TinderCard/TinderCard';
import Img from '../Img/Img';
import RestaurantBio from '../RestaurantBio/RestaurantBio';
import styles from './Card.module.scss';

const Card = forwardRef(
  (
    { distance, id, index, name, onCardLeftScreen, onSwipe, pictures, lowResPictures, bio },
    ref,
  ) => {
    const [selectedPicture, setSelectedPicture] = useState(0);
    const [open, setOpen] = useState(false);
    const handleRightButton = () => {
      if (selectedPicture + 1 < pictures.length) setSelectedPicture((prevState) => prevState + 1);
    };

    const handleLeftButton = () => {
      if (selectedPicture - 1 >= 0) setSelectedPicture((prevState) => prevState - 1);
    };
    const handleOpen = () => {
      setOpen(true);
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
          flickOnSwipe
          preventSwipe={['up', 'down']}
        >
          <div className={styles.Card}>
            <div className={styles.Card__Counter}>
              {selectedPicture + 1}/{pictures.length}
            </div>

            {bio && (
              <div className={styles.Card__Info}>
                <button className={styles.Card__Info__Button} type="button" onClick={handleOpen}>
                  i
                </button>
              </div>
            )}

            <RestaurantBio name={name} open={open} setOpen={setOpen} bio={bio} />

            <Img
              className={styles.Card__Image}
              src={pictures[selectedPicture]}
              lowResSrc={
                lowResPictures ? lowResPictures[selectedPicture] : pictures[selectedPicture]
              }
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
                  <ChevronLeftIcon className={styles.Button_Chevron} />
                </button>
              ) : (
                <div />
              )}
              {pictures && selectedPicture + 1 < pictures.length ? (
                <button
                  type="button"
                  className={styles.Card__Buttons__Button}
                  onClick={handleRightButton}
                  onTouchStart={handleRightButton}
                >
                  <ChevronRightIcon className={styles.Button_Chevron} />
                </button>
              ) : (
                <div />
              )}
            </div>
            <p className={styles.Card__Name}>
              <b>{name}</b>
              {distance && (
                <>
                  ,<DirectionsWalkRoundedIcon className={styles.Card__Name__Icon} /> {distance}
                </>
              )}
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
  bio: '',
  lowResPictures: null,
  distance: null,
};

Card.propTypes = {
  distance: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  onCardLeftScreen: PropTypes.func,
  onSwipe: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  lowResPictures: PropTypes.arrayOf(PropTypes.string),
  bio: PropTypes.string,
};

export default Card;
