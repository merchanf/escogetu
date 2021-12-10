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
          d="M22.2,2.5c-3.4,3.4-3.4,8.8,0,12.1L55.6,48L22.2,81.4c-3.4,3.4-3.4,8.8,0,12.1c3.4,3.4,8.8,3.4,12.1,0L73.8,54
		c3.4-3.4,3.4-8.8,0-12.1L34.3,2.4C31.1-0.8,25.6-0.8,22.2,2.5z"
        />
        <path
          style={{ fill: '#F6EADD' }}
          d="M23.2,3.4c-2.8,2.8-2.8,7.4,0,10.3L57.6,48L23.2,82.4c-2.8,2.8-2.8,7.4,0,10.3c2.8,2.8,7.4,2.8,10.3,0L73,53.1
		c2.8-2.8,2.8-7.4,0-10.3L33.5,3.3C30.7,0.5,26,0.5,23.2,3.4z"
        />
      </g>
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default ChevronLeftIcon;
