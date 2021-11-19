import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Img.module.scss';

const Img = ({ lowResSrc, src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className={classnames(className, styles.Image)}>
      {lowResSrc && !loaded && <img src={lowResSrc} alt={alt} aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        ref={ref}
        onLoad={() => setLoaded(true)}
        className={classnames({ [styles.Loaded]: loaded })}
      />
    </div>
  );
};

Img.defaultProps = {
  className: '',
};

Img.propTypes = {
  lowResSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
