/* eslint-disable no-console */
import React from 'react';
import ToggleButton from './ToggleButton';

export default {
  component: ToggleButton,
  title: 'ToggleButton',
};

const onToggle = (isActive) => {
  console.log('isActive', isActive);
};

export const Default = () => <ToggleButton onToggle={onToggle}>Click me!</ToggleButton>;
