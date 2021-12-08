import React from 'react';
import Card from './Card';

export default {
  component: Card,
  title: 'Card',
};

const onSwipe = (direction, nameToDelete) => {
  console.log(`removing: ${nameToDelete}`);
};

const pictures = [
  'https://via.placeholder.com/300x465/9B59B6?text=El%20Corral',
  'https://via.placeholder.com/300x465/2E86C1?text=El%20Corral',
  'https://via.placeholder.com/300x465/1ABC9C?text=El%20Corral',
  'https://via.placeholder.com/300x465/F1C40F?text=El%20Corral',
  'https://via.placeholder.com/300x465/7F8C8D?text=El%20Corral',
];

export const Default = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Card
      name="El corral"
      distance="3 Km"
      pictures={pictures}
      onSwipe={onSwipe}
      height={500}
      width={500}
      bio="Esta es una bio de prueba"
    />
  </div>
);
