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
  const { placeId } = props;
  const [preloadPictures, setPreloadPictures] = useState();
  const [preloadingFinished, setPreloadingFinished] = useState(false);
  const { loading, pictures } = useGetFirestorePictures(placeId);
  const dispatch = useDispatch();

  const onLoad = (index) => {
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
        img.onload = onLoad(index);
      });
    }
  }, [dispatch, loading, pictures, placeId]);

  useEffect(() => {
    if (preloadPictures && preloadPictures.every((picture) => picture)) {
      setPreloadingFinished(true);
    }
  }, [preloadPictures]);

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

  return !preloadingFinished || pictures == null ? loadingCard : tinderCard;
});

CardWrapper.defaultProps = {
  placeId: null,
};

CardWrapper.propTypes = {
  placeId: PropTypes.string,
};

export default CardWrapper;
