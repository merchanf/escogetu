/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import styles from './withIconButton.module.scss';

const withIconButton = (Icon) => ({
  className,
  disabled,
  onClick,
  onMouseDown,
  size = 'medium',
  iconStyle,
}) => {
  const iconButtonClassNames = classnames(
    styles.withIconButton,
    { [className]: className },
    {
      [styles[`withIconButton__${size}`]]: size,
    },
  );

  const iconClassNames = classnames(styles.withIconButtonColor, { [iconStyle]: iconStyle });

  return (
    <button
      type="button"
      className={iconButtonClassNames}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      <Icon className={iconClassNames} size={size} />
    </button>
  );
};

export default withIconButton;
