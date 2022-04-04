import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import colors from '@constants/colors.constants';

import styles from './Img.module.scss';

const { deepChampagne } = colors;

const Img = ({ lowResSrc, src, alt, className, showSkeletonOnLoading }) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref?.current?.complete) {
      setLoaded(true);
      setLoading(false);
    }
  }, []);

  const onLoad = () => {
    if (!ref?.current?.complete) {
      setLoaded(false);
    }
  };

  const loadingCard = (
    <Skeleton
      sx={{ bgcolor: deepChampagne[100] }}
      animation="wave"
      variant="rectangular"
      width="100%"
      height="100%"
    />
  );

  return loading && showSkeletonOnLoading ? (
    loadingCard
  ) : (
    <div className={classnames(className, styles.Image)}>
      <img src={lowResSrc} alt={alt} onLoad={onLoad} aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        ref={ref}
        onLoad={() => setLoaded(true)}
        className={classnames({ [styles.Show]: loaded, [styles.Hide]: !loaded })}
      />
    </div>
  );
};

Img.defaultProps = {
  className: '',
  lowResSrc: 'https://via.placeholder.com/1280x720/E5E7E9/E5E7E9?Text=escogetu',
  showSkeletonOnLoading: false,
};

Img.propTypes = {
  lowResSrc: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  showSkeletonOnLoading: PropTypes.bool,
};

export default Img;
