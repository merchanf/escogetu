import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Img.module.scss';

const Img = ({ lowResSrc, src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref?.current?.complete) {
      setLoaded(true);
    }
  }, []);

  const onLoad = () => {
    if (!ref?.current?.complete) {
      setLoaded(false);
    }
  };

  return (
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
};

Img.propTypes = {
  lowResSrc: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
