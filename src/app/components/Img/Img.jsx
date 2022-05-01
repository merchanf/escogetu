import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import usePrevious from '@app/hooks/usePrevious';
import styles from './Img.module.scss';

const Img = ({ lowResSrc, src, alt, className, onLoad }) => {
  const [lowResLoading, setLowResLoading] = useState(true);
  const [highResLoading, setHighResLoading] = useState(true);
  const prevValues = usePrevious({ lowResSrc, src });

  useEffect(() => {
    if (!lowResLoading && !highResLoading) {
      if (onLoad) onLoad();
    }
  }, [lowResLoading, highResLoading, onLoad]);

  useEffect(() => {
    if (prevValues?.lowResSrc !== lowResSrc) {
      setLowResLoading(true);
    }

    if (prevValues?.src !== src) {
      setHighResLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowResSrc, src]);

  return (
    <div className={classnames(className, styles.Image)}>
      <img src={lowResSrc} alt={alt} onLoad={() => setLowResLoading(false)} aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        onLoad={() => setHighResLoading(false)}
        className={classnames({ [styles.Show]: !lowResLoading, [styles.Hide]: lowResLoading })}
      />
    </div>
  );
};

Img.defaultProps = {
  className: '',
  lowResSrc: 'https://via.placeholder.com/1280x720/E5E7E9/E5E7E9?Text=escogetu',
  onLoad: null,
};

Img.propTypes = {
  lowResSrc: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
};

export default Img;
