import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@app/components';
import styles from './CardList.module.scss';

export const CardList = ({ list, onSwipe, onCardLeftScreen }) => {
  console.log(list)
  const ref = useRef(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [ref?.current?.clientWidth, ref?.current?.clientHeight]);

  return (
    <div className={styles.Container} ref={ref}>
      {list.map(({ placeId, name, pictures, distance, ref }, index) => (
        <Card
          id={placeId}
          name={name}
          pictures={pictures}
          distance={distance}
          key={name}
          onSwipe={onSwipe}
          index={list.length - index}
          width={width}
          height={height}
          ref={ref}
          onSwipe={onSwipe}
          onCardLeftScreen={onCardLeftScreen}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  list: PropTypes.string.isRequired,
  onSwipe: PropTypes.func.isRequired,
  onCardLeftScreen: PropTypes.func.isRequired,
};
