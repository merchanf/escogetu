import React from 'react';
import Icon from './Icon/Icon';

const CurvedArrow = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby="Curved arrow"
    >
      <path
        style={{ fill: '#FFFFFF' }}
        d="M96,9.3C76.1,48.9,51.3,63.2,34.1,68.1c-7.4,2.1-14.1,2.8-19.5,2.8c-6,0-10.4-0.8-12.4-1.2L19,86.4l-0.7,0.7L0,68.8l0.7-0.7
	l18-18l0.9,0.9L2,68.5c2.8,0.7,15.6,3.3,31.9-1.4c17-4.9,41.4-19,61.2-58.3L96,9.3z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default CurvedArrow;
