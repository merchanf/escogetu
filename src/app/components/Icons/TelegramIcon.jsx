import React from 'react';
import { Icon } from './Icon/Icon';

export const TelegramIcon = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby="Like Icon"
    >
      <circle fill="#039BE5" cx="48" cy="48" r="48" />
      <path
        fill="#FFFFFF"
        d="M22,47l46.3-17.8c2.1-0.8,4,0.5,3.3,3.8l0,0L63.7,70c-0.6,2.6-2.1,3.3-4.3,2l-12-8.8l-5.8,5.6
	c-0.6,0.6-1.2,1.2-2.4,1.2L40,57.7l22.2-20.1c1-0.9-0.2-1.3-1.5-0.5L33.3,54.5l-11.8-3.7C18.8,50,18.8,48.2,22,47L22,47z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};
