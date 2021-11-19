import React, { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TinderCard from '../TinderCard/TinderCard';
import Img from '../Img/Img';
import RestaurantBio from '../RestaurantBio/RestaurantBio';
import styles from './Card.module.scss';

const Card = forwardRef(
  (
    { distance, id, index, name, onCardLeftScreen, onSwipe, pictures, lowResPictures, bio },
    ref,
  ) => {
    const [imgs, setImgs] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(0);
    const [open, setOpen] = useState(false);
    const handleRightButton = () => {
      if (selectedPicture + 1 < pictures.length) setSelectedPicture((prevState) => prevState + 1);
    };

    useEffect(() => {
      const imgArray = [];
      if (pictures.length) {
        for (let i = 0; i < pictures.length; i++) {
          imgArray.push(
            <Img
              className={styles.Card__Image}
              src={pictures[selectedPicture]}
              lowResSrc={lowResPictures[selectedPicture]}
              alt={`${name} - ${selectedPicture}`}
            />,
          );
        }
      }
      setImgs(imgArray);
    }, [lowResPictures, name, pictures, selectedPicture]);

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
            {imgs && imgs.length ? (
              imgs[selectedPicture]
            ) : (
              <Img
                className={styles.Card__Image}
                src={pictures[selectedPicture]}
                lowResSrc={lowResPictures[selectedPicture]}
                alt={`${name} - ${selectedPicture}`}
              />
            )}
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
  bio: '',
};

Card.propTypes = {
  distance: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  onCardLeftScreen: PropTypes.func,
  onSwipe: PropTypes.func.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  lowResPictures: PropTypes.arrayOf(PropTypes.string).isRequired,
  bio: PropTypes.string,
};

export default Card;
