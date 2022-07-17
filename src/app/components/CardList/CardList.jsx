import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useStore } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardWrapper } from '@components/index';
import { setLoading, setNewBatch } from '@actions/hydrate.action';
import { flows } from '@constants/constants';

import styles from './CardList.module.scss';

const CardList = ({ list, onSwipe, onCardLeftScreen, flow, userUid }) => {
  const SwipeCard = flow === flows.FIRESTORE ? CardWrapper : Card;
  const dispatch = useDispatch();
  const {
    hydrate: {
      application: { newBatch, noMoreRestaurants },
    },
  } = useStore().getState();
  const [loadedCards, setLoadedCards] = useState();
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (list && newBatch) {
      dispatch(setLoading(true));
      setLoadedCards(new Array(list.length).fill(false));
      setDispatched(false);
      dispatch(setNewBatch(false));
    }
  }, [dispatch, list, newBatch, noMoreRestaurants]);

  useEffect(() => {
    if (loadedCards && loadedCards.every((card) => card) && !dispatched) {
      dispatch(setLoading(false));
      setDispatched(true);
    }
  }, [dispatch, dispatched, loadedCards]);

  const onLoad = useCallback((index) => {
    setLoadedCards((prevState) => {
      if (prevState) {
        prevState[index] = true;
        return [...prevState];
      }
      return prevState;
    });
  }, []);

  return (
    <div className={styles.Container}>
      {list.map(
        ({ placeId, name, details, pictures, lowResPictures, distance, ref: innerRef }, index) => (
          <SwipeCard
            id={placeId}
            placeId={placeId}
            name={name}
            pictures={details?.pictures || pictures}
            lowResPictures={lowResPictures}
            distance={distance}
            key={`${placeId}-${index}`}
            onSwipe={onSwipe}
            index={index}
            onCardLeftScreen={onCardLeftScreen}
            ref={innerRef}
            onLoad={onLoad}
            userUid={userUid}
          />
        ),
      )}
    </div>
  );
};

CardList.defaultProps = {
  flow: '',
  userUid: '',
};

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSwipe: PropTypes.func.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
  flow: PropTypes.string,
  userUid: PropTypes.string,
};

export default CardList;
