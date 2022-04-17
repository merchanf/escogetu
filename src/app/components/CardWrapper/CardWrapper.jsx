import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';

import useGetFirestorePictures from '@app/hooks/useGetFirestorePictures';
import colors from '@constants/colors.constants';
import Card from '@components/Card/Card';

const { deepChampagne } = colors;

const CardWrapper = forwardRef((props, ref) => {
  const { id } = props;
  const { loading, pictures, lowResPictures } = useGetFirestorePictures(id);

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
  id: null,
};

CardWrapper.propTypes = {
  id: PropTypes.string,
};

export default CardWrapper;
