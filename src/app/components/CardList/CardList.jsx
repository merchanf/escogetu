import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';

import styles from './CardList.module.scss';

export const CardList = ({ list, onSwipe }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [ref?.current?.clientWidth, ref?.current?.clientHeight]);

  return (
    <div className={styles.Container} ref={ref}>
      {list.map(({ placeId, name, details, pictures, distance, ref }, index) => (
        <Card
          id={placeId}
          name={name}
          pictures={details?.pictures || pictures}
          distance={distance}
          key={`${placeId}-${index}`}
          onSwipe={onSwipe}
          index={index}
          width={width}
          height={height}
          ref={ref}
        />
      ))}
    </div>
  );
};

CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSwipe: PropTypes.func.isRequired,
};
