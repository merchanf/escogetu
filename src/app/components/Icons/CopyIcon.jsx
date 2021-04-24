import React from 'react';
import { Icon } from './Icon/Icon';

export const CopyIcon = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby="Whatsapp Icon"
    >
      <path d="M39,78c-9.4,0-17-7.6-17-17V20h-7C8.9,20,4,24.9,4,31v54c0,6.1,4.9,11,11,11h50c6.1,0,11-4.9,11-11v-7H39z" />
      <path d="M92,11c0-6.1-4.9-11-11-11H39c-6.1,0-11,4.9-11,11v50c0,6.1,4.9,11,11,11h42c6.1,0,11-4.9,11-11V11z" />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};
