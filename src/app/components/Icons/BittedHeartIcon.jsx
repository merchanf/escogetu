import React from 'react';
import Icon from './Icon/Icon';

const BittedHeartIcon = (props) => {
  const svg = (
    <svg focusable={false} width="100%" height="100%" viewBox="0 0 96 96" role="img">
      <path
        d="M87.5,28.2c0-2,0.5-4,1.5-5.7c-6.4-0.3-11.4-5.6-11.1-12c0.1-1.9,0.6-3.7,1.6-5.4c-2.5-0.9-5.2-1.4-7.9-1.5
	C54.2,3,48.8,19.7,48.8,19.7S43.4,3,26.1,3.6S-3.2,20.9,0.8,36.2C5,52.5,20.7,63,33.6,76.3c8.6,8.9,15.2,16.2,15.2,16.2
	s6.6-7.3,15.2-16.2c12.1-12.4,26.7-22.5,31.9-37C91,37.9,87.6,33.4,87.5,28.2L87.5,28.2z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default BittedHeartIcon;
