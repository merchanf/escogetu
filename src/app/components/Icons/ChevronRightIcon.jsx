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
        <circle style={{ fill: '#F2F2F2' }} cx="48" cy="48" r="48" />
        <path
          d="M48,0.09c-26.51,0-48,21.49-48,48s21.49,48,48,48s48-21.49,48-48S74.51,0.09,48,0.09z M76.24,52.33L56.91,71.66
	c-2.34,2.34-6.14,2.34-8.48,0s-2.34-6.14,0-8.48l9.1-9.08H24c-3.32,0-6-2.68-6-6s2.68-6,6-6h33.52l-9.26-9.26
	c-2.34-2.34-2.34-6.14,0-8.48s6.14-2.34,8.48,0l19.33,19.33c1.66,1.66,1.92,3.49,1.92,4.41C78,49.01,77.74,50.85,76.24,52.33z"
        />
      </g>
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default ChevronLeftIcon;
