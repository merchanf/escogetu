import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import usePrevious from '@app/hooks/usePrevious';
import styles from './Img.module.scss';

const Img = ({ lowResSrc, src, alt, className, onLoad }) => {
  const [loading, setLoading] = useState(true);
  const prevValues = usePrevious({ lowResSrc, src });
  const imgRef = useRef(null);

  useEffect(() => {
    if (!loading || imgRef.current.complete) {
      if (onLoad) onLoad();
    }
  }, [loading, onLoad]);

  useEffect(() => {
    if (prevValues?.lowResSrc !== lowResSrc) {
      setLoading(true);
      imgRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowResSrc, src]);

  return (
    <div className={classnames(className, styles.Image)}>
      <img src={lowResSrc} alt={alt} aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoading(false)}
        className={classnames({ [styles.Show]: !loading, [styles.Hide]: loading })}
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
