import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Button.module.scss';

const Button = (props) => {
  const { className, children } = props;
  return (
    <button {...props} type="button" className={cx(styles.Button, className)}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
