import React from 'react';
import { Icon } from './Icon/Icon';

export const PinIcon = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby="Like Icon"
    >
      <path
        d="M48,0C30.4,0,16.1,14.3,16.1,31.9c0,5.3,1.3,10.5,3.8,15.2l26.3,47.6c0.4,0.6,1,1,1.7,1c0.7,0,1.4-0.4,1.7-1l26.3-47.7
			c2.5-4.6,3.8-9.9,3.8-15.2C79.9,14.3,65.6,0,48,0z M48,47.9c-8.8,0-16-7.2-16-16s7.2-16,16-16s16,7.2,16,16S56.8,47.9,48,47.9z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};
