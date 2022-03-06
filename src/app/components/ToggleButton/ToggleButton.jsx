import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './ToggleButton.module.scss';

const ToggleButton = (props) => {
  const { className, onToggle, children } = props;
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(!isActive);
    onToggle(!isActive, children);
  };

  return (
    <button
      type="button"
      className={cx(className, styles.ToggleButton, {
        [styles.isActive]: isActive,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ToggleButton.defaultProps = {
  className: '',
  onToggle: () => {},
};

ToggleButton.propTypes = {
  className: PropTypes.string,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ToggleButton;
