import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import styles from './CardList.module.scss';

export const CardList = ({ list, onSwipe, onCardLeftScreen }) => {
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
          key={placeId}
          onSwipe={onSwipe}
          index={index}
          width={width}
          height={height}
          ref={ref}
          onCardLeftScreen={onCardLeftScreen}
        />
      ))}
    </div>
  );
};
