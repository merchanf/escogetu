import React from 'react';
import Icon from './Icon/Icon';

const CrossIcon = (props) => {
  const svg = (
    <svg focusable={false} width="100%" height="100%" viewBox="0 0 96 96" role="img">
      <g>
        <path
          d="M93.5,77.7L18.3,2.5C15-0.8,9.7-0.8,6.4,2.5l-4,4c-3.3,3.3-3.3,8.6,0,11.9l75.2,75.2c3.3,3.3,8.6,3.3,11.9,0
          l4-4C96.8,86.3,96.8,81,93.5,77.7z"
        />
        <path
          d="M77.7,2.5L2.5,77.7c-3.3,3.3-3.3,8.6,0,11.9l4,4c3.3,3.3,8.6,3.3,11.9,0l75.2-75.2c3.3-3.3,3.3-8.6,0-11.9
          l-4-4C86.3-0.8,81-0.8,77.7,2.5z"
        />
      </g>
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default CrossIcon;
