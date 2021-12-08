/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import withIconButton from '../withIconButton/withIconButton';
import styles from './withTextIconButton.module.scss';

const withTextIconButton = (Icon) => (props) => {
  const { caption, className } = props;
  const TextIconButton = withIconButton(Icon);
  const customClassName = classnames(styles.withTextIconButton, { [className]: className });
  return (
    <div className={customClassName}>
      <TextIconButton {...props} />
      <p className={styles.withTextIconButton__Caption}>{caption}</p>
    </div>
  );
};

export default withTextIconButton;
