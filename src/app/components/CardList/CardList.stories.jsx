import React from 'react';
import CardList from './CardList';

export default {
  component: CardList,
  title: 'CardList',
};

const db = [
  {
    name: 'El corral',
    distance: '3 Km',
    pictures: [
      'https://via.placeholder.com/930x600/9B59B6?text=El%20Corral',
      'https://via.placeholder.com/930x600/2E86C1?text=El%20Corral',
      'https://via.placeholder.com/930x600/1ABC9C?text=El%20Corral',
      'https://via.placeholder.com/930x600/F1C40F?text=El%20Corral',
      'https://via.placeholder.com/930x600/7F8C8D?text=El%20Corral',
    ],
  },
  {
    name: 'Sierra nevada',
    distance: '4 Km',
    pictures: [
      'https://via.placeholder.com/500x930/7F8C8D?text=Sierra%20nevada',
      'https://via.placeholder.com/500x930/F1C40F?text=Sierra%20nevada',
      'https://via.placeholder.com/500x930/1ABC9C?text=Sierra%20nevada',
      'https://via.placeholder.com/500x930/2E86C1?text=Sierra%20nevada',
      'https://via.placeholder.com/500x930/9B59B6?text=Sierra%20nevada',
    ],
  },
  {
    name: 'La jugueteria',
    distance: '5 Km',
    pictures: [
      'https://via.placeholder.com/600x930/9B59B6?text=La%20jugueteria',
      'https://via.placeholder.com/600x930/2E86C1?text=La%20jugueteria',
      'https://via.placeholder.com/600x930/1ABC9C?text=La%20jugueteria',
      'https://via.placeholder.com/600x930/F1C40F?text=La%20jugueteria',
      'https://via.placeholder.com/600x930/7F8C8D?text=La%20jugueteria',
    ],
  },
  {
    name: 'Sandwich Qbano',
    distance: '6 Km',
    pictures: [
      'https://via.placeholder.com/600x930/9B59B6?text=Sandwich%20Qbano',
      'https://via.placeholder.com/600x930/2E86C1?text=Sandwich%20Qbano',
      'https://via.placeholder.com/600x930/1ABC9C?text=Sandwich%20Qbano',
      'https://via.placeholder.com/600x930/F1C40F?text=Sandwich%20Qbano',
      'https://via.placeholder.com/600x930/7F8C8D?text=Sandwich%20Qbano',
    ],
  },
  {
    name: 'KO Asian kitchen',
    distance: '7 Km',
    pictures: [
      'https://via.placeholder.com/600x930/9B59B6?text=KO%20Asian%20kitchen',
      'https://via.placeholder.com/600x930/2E86C1?text=KO%20Asian%20kitchen',
      'https://via.placeholder.com/600x930/1ABC9C?text=KO%20Asian%20kitchen',
      'https://via.placeholder.com/600x930/F1C40F?text=KO%20Asian%20kitchen',
      'https://via.placeholder.com/600x930/7F8C8D?text=KO%20Asian%20kitchen',
    ],
  },
];

export const Default = () => <CardList list={db} />;
