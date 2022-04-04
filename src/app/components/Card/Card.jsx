import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import Skeleton from '@mui/material/Skeleton';

import { getPicturesURL } from '@services/firestore.service';
import colors from '@constants/colors.constants';
import { ChevronRightIcon, ChevronLeftIcon } from '@components/Icons/Icons';
import TinderCard from '../TinderCard/TinderCard';
import Img from '../Img/Img';
import RestaurantBio from '../RestaurantBio/RestaurantBio';

import styles from './Card.module.scss';

const { deepChampagne } = colors;

const Card = forwardRef(({ distance, id, index, name, onCardLeftScreen, onSwipe, bio }, ref) => {
  const [selectedPicture, setSelectedPicture] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState();
  const [lowResPictures, setLowResPictures] = useState();

  const handleRightButton = () => {
    if (selectedPicture + 1 < pictures.length) setSelectedPicture((prevState) => prevState + 1);
  };

  const handleLeftButton = () => {
    if (selectedPicture - 1 >= 0) setSelectedPicture((prevState) => prevState - 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getPictures = async () => {
      setLoading(true);
      const { pictures, lowResPictures } = await getPicturesURL(id);
      setPictures(pictures);
      setLowResPictures(lowResPictures);
      setLoading(false);
    };

    if (id && pictures == null) {
      getPictures();
    }
  }, [id, pictures]);

  const loadingCard = (
    <Skeleton
      sx={{ bgcolor: deepChampagne[100] }}
      animation="wave"
      variant="rectangular"
      width="100%"
      height="100%"
    />
  );

  const tinderCard = (
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
          {selectedPicture + 1}/{pictures?.length}
        </div>

        {bio && (
          <div className={styles.Card__Info}>
            <button className={styles.Card__Info__Button} type="button" onClick={handleOpen}>
              i
            </button>
          </div>
        )}

        <RestaurantBio name={name} open={open} setOpen={setOpen} bio={bio} />

        {pictures && lowResPictures && (
          <Img
            className={styles.Card__Image}
            src={pictures[selectedPicture]}
            lowResSrc={lowResPictures ? lowResPictures[selectedPicture] : pictures[selectedPicture]}
            alt={`${name} - ${selectedPicture}`}
            showSkeletonOnLoading={selectedPicture === 0}
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
              <ChevronLeftIcon className={styles.Button_Chevron} />
            </button>
          ) : (
            <div />
          )}
          {pictures && selectedPicture + 1 < pictures?.length ? (
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
  );

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
      {loading || pictures == null ? loadingCard : tinderCard}
    </div>
  );
});

Card.defaultProps = {
  onCardLeftScreen: () => {},
  name: 'Restaurante',
  bio: '',
  distance: null,
  id: null,
};

Card.propTypes = {
  distance: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  onCardLeftScreen: PropTypes.func,
  onSwipe: PropTypes.func.isRequired,
  bio: PropTypes.string,
};

export default Card;
