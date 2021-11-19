import React from 'react';
import Img from './Img';

export default {
  component: Img,
  title: 'Img',
};

const randomNumber = Math.floor(Math.random() * 250);

export const Default = () => (
  <Img
    lowResSrc={`https://picsum.photos/id/${randomNumber}/24/14`}
    src={`https://picsum.photos/id/${randomNumber}/1280/720`}
    alt="Imagen random"
  />
);
