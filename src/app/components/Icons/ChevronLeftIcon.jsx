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
          d="M48,96.09c26.51,0,48-21.49,48-48s-21.49-48-48-48c-26.51,0-48,21.49-48,48S21.49,96.09,48,96.09z M19.76,43.86l19.33-19.33
	c2.34-2.34,6.14-2.34,8.48,0s2.34,6.14,0,8.48l-9.1,9.08H72c3.32,0,6,2.68,6,6s-2.68,6-6,6H38.48l9.26,9.26
	c2.34,2.34,2.34,6.14,0,8.48s-6.14,2.34-8.48,0L19.92,52.5C18.26,50.85,18,49.01,18,48.09C18,47.17,18.26,45.34,19.76,43.86z"
        />
      </g>
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default ChevronLeftIcon;
