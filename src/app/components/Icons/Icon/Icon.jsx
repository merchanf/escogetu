import React from 'react';
import classnames from 'classnames';

import PropTypes from 'prop-types';
import styles from './Icon.module.scss';

export const Icon = ({ className, svg, size, ...props }) => {
  const iconClassNames = classnames(
    styles.Icon,
    { [className]: className },
    {
      [styles.Icon__extra__small]: size === 'extra-small',
      [styles.Icon__small]: size === 'small',
      [styles.Icon__medium]: size === 'medium',
      [styles.Icon__large]: size === 'large',
      [styles.Icon__extra__large]: size === 'extra-large',
    },
  );

  return (
    <div className={iconClassNames} {...props}>
      {svg}
    </div>
  );
};

Icon.defaultProps = {
  size: 'medium',
  className: '',
};

Icon.propTypes = {
  className: PropTypes.string,
  svg: PropTypes.shape({}).isRequired,
  size: PropTypes.string,
};
