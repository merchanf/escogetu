import React from 'react';
import classnames from 'classnames';
import styles from './LoadingIcon.module.scss';

const LoadingIcon = () => (
  <div className={classnames(styles.LoadingAnimation, styles.Bouncee)}>
    <svg version="1.1" id="Capa_1" x="0px" y="0px" width="96px" height="96px" viewBox="0 0 96 96">
      <path
        d="M96,47.47v-.19A2.29,2.29,0,0,0,93.81,45a9.19,9.19,0,0,1-7.89-5.34,2.33,2.33,0,0,0-1.5-1.26,2.3,2.3,0,0,0-1.92.34A9.21,9.21,0,0,1,68,30.39a2.29,2.29,0,0,0-2.5-2.5c-.27,0-.55,0-.83,0A9.2,9.2,0,0,1,57.15,13.4a2.3,2.3,0,0,0,.34-1.92A2.33,2.33,0,0,0,56.23,10a9.19,9.19,0,0,1-5.34-7.89A2.29,2.29,0,0,0,48.62-.09h-39A9.62,9.62,0,0,0,0,9.54C.13,32.47,0,67,0,86.3a9.59,9.59,0,0,0,9.6,9.61H86.4a9.6,9.6,0,0,0,9.6-9.6V47.47Z"
        style={{ fill: '#ef5350' }}
      />
    </svg>
  </div>
);

export default LoadingIcon;
