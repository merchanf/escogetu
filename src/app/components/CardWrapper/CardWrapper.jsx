import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';

import useGetFirestorePictures from '@app/hooks/useGetFirestorePictures';
import colors from '@constants/colors.constants';
import Card from '@components/Card/Card';
import { setRestaurantDetailsPictures } from '@actions/session.action';

const { deepChampagne } = colors;

const CardWrapper = forwardRef((props, ref) => {
  const { placeId, onLoad, index } = props;
  const [preloadPictures, setPreloadPictures] = useState();
  const { loading, pictures } = useGetFirestorePictures(placeId);
  const dispatch = useDispatch();

  const handleLoad = (index) => {
    setPreloadPictures((prevState) => {
      prevState[index] = true;
      return [...prevState];
    });
  };

  useEffect(() => {
    if (!loading && pictures && pictures.length > 0) {
      setPreloadPictures(new Array(pictures.length).fill(false));
      dispatch(setRestaurantDetailsPictures({ placeId, pictures }));
      pictures.forEach((picture, index) => {
        const img = new Image();
        img.src = picture;
        img.onload = handleLoad(index);
      });
    }
  }, [dispatch, loading, pictures, placeId]);

  useEffect(() => {
    if (preloadPictures && preloadPictures.every((picture) => picture)) {
      if (onLoad) onLoad(index);
    }
  }, [index, onLoad, preloadPictures]);

  const loadingCard = (
    <Skeleton
      sx={{ bgcolor: deepChampagne[100] }}
      animation="wave"
      variant="rectangular"
      width="100%"
      height="100%"
    />
  );

  const tinderCard = <Card {...props} pictures={pictures} ref={ref} />;

  return pictures == null ? loadingCard : tinderCard;
});

CardWrapper.defaultProps = {
  placeId: null,
  onLoad: null,
  index: null,
};

CardWrapper.propTypes = {
  placeId: PropTypes.string,
  onLoad: PropTypes.func,
  index: PropTypes.number,
};

export default CardWrapper;
