import React from 'react';
import Instructions from './Instructions';

export default {
  component: Instructions,
  title: 'Instructions',
};

const onClose = () => {
  console.log('onClose');
};

export const Default = () => <Instructions onClose={onClose} />;
