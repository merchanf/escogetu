import React from 'react';
import Icon from './Icon/Icon';

const AddUserIcon = (props) => {
  const svg = (
    <svg focusable={false} width="100%" height="100%" viewBox="0 0 96 96" role="img">
      <path
        d="M33.6,48c10.6,0,19.2-8.6,19.2-19.2S44.2,9.6,33.6,9.6s-19.2,8.6-19.2,19.2S22.9,48,33.6,48z M41.2,55.2H25.9
	c-14.4,0-26,11.6-26,26c0,2.9,2.3,5.2,5.2,5.2H62c2.9,0,5.2-2.3,5.2-5.2C67.2,66.8,55.5,55.2,41.2,55.2z M92.4,39.6h-7.2v-7.2
	c0-2-1.6-3.6-3.6-3.6c-2,0-3.6,1.6-3.6,3.6v7.2h-7.2c-2,0-3.6,1.6-3.6,3.6s1.6,3.6,3.6,3.6H78V54c0,2,1.6,3.6,3.6,3.6
	s3.6-1.6,3.6-3.6v-7.2h7.2c2,0,3.6-1.6,3.6-3.6S94.3,39.6,92.4,39.6z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default AddUserIcon;
