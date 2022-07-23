import React from 'react';
import Gallery from './Gallery';

export default {
  component: Gallery,
  title: 'Gallery',
};

const pictures = [
  'https://via.placeholder.com/600x930/9B59B6?text=El%20Corral',
  'https://via.placeholder.com/600x930/2E86C1?text=El%20Corral',
  'https://via.placeholder.com/600x930/1ABC9C?text=El%20Corral',
  'https://via.placeholder.com/600x930/F1C40F?text=El%20Corral',
  'https://via.placeholder.com/600x930/7F8C8D?text=El%20Corral',
  'https://via.placeholder.com/600x930/7F8C8D?text=El%20Corral',
];

export const Default = () => <Gallery pictures={pictures} />;
