import React from 'react';
import { CallIcon } from '../Icons';
import withTextIconButton from './withTextIconButton';

const TextIconButton = withTextIconButton(CallIcon);

export default {
  component: TextIconButton,
  title: 'Icons/HOCs/withTextIconButton',
};

export const Default = () => (
  <TextIconButton onClick={() => console.log('click')} caption="Llamar a chucho" />
);
