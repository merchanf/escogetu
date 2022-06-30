/* eslint-disable react/prop-types */
import React from 'react';
import cx from 'classnames';
import styles from './withTextIcon.module.scss';

const withTextIcon = (Icon) => (props) => {
  const { caption, className, iconStyle, remainingProps } = props;

  return (
    <div className={cx(styles.withTextIconButton, { [className]: className })}>
      <Icon className={iconStyle} {...remainingProps} />
      <p className={styles.withTextIconButton__Caption}>{caption}</p>
    </div>
  );
};

export default withTextIcon;
