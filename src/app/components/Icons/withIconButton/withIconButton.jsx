import React from 'react';
import classnames from 'classnames';
import styles from './withIconButton.module.scss';

export const withIconButton = (Icon) => (props) => {
  const { className, disabled, onClick, onMouseDown, color = 'black', size = 'medium' } = props;

  const iconClassNames = classnames(
    styles.withIconButton,
    { [className]: className },
    {
      [styles[`withIconButton__${size}`]]: size,
    },
  );
  return (
    <button
      className={iconClassNames}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      <Icon
        className={classnames({
          [styles[`withIconButton__${color}`]]: color,
        })}
        size={size}
      />
    </button>
  );
};