import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';

import { getPicturesURL } from '@services/firestore.service';
import colors from '@constants/colors.constants';
import Card from '@components/Card/Card';

const { deepChampagne } = colors;

const CardWrapper = forwardRef((props, ref) => {
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState();
  const [lowResPictures, setLowResPictures] = useState();

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
