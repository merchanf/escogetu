import React from 'react';
import Icon from './Icon/Icon';

const ChevronLeftIcon = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby="Whatsapp Icon"
    >
      <g>
        <path
          style={{ fill: '#472C29' }}
          d="M73.8,2.5c-3.4-3.4-8.8-3.4-12.1,0L22.2,41.9c-3.4,3.4-3.4,8.8,0,12.1l39.4,39.4c3.4,3.4,8.8,3.4,12.1,0
		c3.4-3.4,3.4-8.8,0-12.1L40.4,48l33.3-33.3C77.1,11.3,77,5.8,73.8,2.5z"
        />
        <path
          style={{ fill: '#F6EADD' }}
          d="M72.9,92.7c2.8-2.8,2.8-7.4,0-10.3L38.5,48l34.4-34.4c2.8-2.8,2.8-7.4,0-10.3c-2.8-2.8-7.4-2.8-10.3,0
		L23.1,42.9c-2.8,2.8-2.8,7.4,0,10.3l39.6,39.6C65.4,95.5,70.1,95.5,72.9,92.7z"
        />
      </g>
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default ChevronLeftIcon;
