import React from 'react';
import { CallIcon } from '../Icons';
import withTextIcon from './withTextIcon';

const TextIconButton = withTextIcon(CallIcon);

export default {
  component: TextIconButton,
  title: 'Icons/HOCs/withTextIcon',
};

export const Default = () => <TextIconButton caption="Llamar a chucho" />;
