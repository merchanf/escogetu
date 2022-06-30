import React from 'react';
import Icon from './Icon/Icon';

const LikeIcon = (props) => {
  const svg = (
    <svg focusable={false} width="100%" height="100%" viewBox="0 0 96 96" role="img">
      <path
        d="M70.5,5.6c-5.2,0-10,1.7-14.2,4.9c-4,3.1-6.7,7.1-8.3,10c-1.6-2.9-4.3-6.9-8.3-10c-4.2-3.3-9-4.9-14.2-4.9
        C11,5.6,0,17.5,0,33.3c0,17,13.7,28.7,34.4,46.3c3.5,3,7.5,6.4,11.6,10c0.5,0.5,1.2,0.7,2,0.7s1.4-0.3,2-0.7c4.1-3.6,8.1-7,11.6-10
        C82.3,62,96,50.3,96,33.3C96,17.5,85,5.6,70.5,5.6z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default LikeIcon;
