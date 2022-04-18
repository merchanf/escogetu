import React, { forwardRef, useEffect } from 'react';
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
  const { loading, pictures, lowResPictures } = useGetFirestorePictures(placeId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !loading &&
      pictures &&
      pictures.length > 0 &&
      lowResPictures &&
      lowResPictures.length > 0
    ) {
      dispatch(setRestaurantDetailsPictures({ placeId, pictures, lowResPictures }));
    }
  }, [dispatch, loading, lowResPictures, pictures, placeId]);

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
    <Card {...props} pictures={pictures} lowResPictures={lowResPictures} ref={ref} />
  );

  return loading || pictures == null ? loadingCard : tinderCard;
});

CardWrapper.defaultProps = {
  placeId: null,
};

CardWrapper.propTypes = {
  placeId: PropTypes.string,
};

export default CardWrapper;
