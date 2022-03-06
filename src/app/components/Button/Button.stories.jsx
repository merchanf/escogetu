/* eslint-disable no-console */
import React from 'react';
import Button from './Button';

export default {
  component: Button,
  title: 'Button',
};

const onClick = () => {
  console.log('click');
};

export const Default = () => <Button onClick={onClick}>Click me!</Button>;

export const Disabled = () => (
  <Button onClick={onClick} disabled>
    Click me!
  </Button>
);
