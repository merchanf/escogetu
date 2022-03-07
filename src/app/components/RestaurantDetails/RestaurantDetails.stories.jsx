import React from 'react';
import RestaurantDetails from './RestaurantDetails';

export default {
  component: RestaurantDetails,
  title: 'RestaurantDetails',
};

const pictures = [
  'https://via.placeholder.com/600x930/9B59B6?text=El%20Corral',
  'https://via.placeholder.com/600x930/2E86C1?text=El%20Corral',
  'https://via.placeholder.com/600x930/1ABC9C?text=El%20Corral',
  'https://via.placeholder.com/600x930/F1C40F?text=El%20Corral',
  'https://via.placeholder.com/600x930/7F8C8D?text=El%20Corral',
];

const props = {
  apiKey: 'AIzaSyB6UMb2CgplkVuv980ICp1Acc-C5czk-Oc',
  address: 'Cra 28 # 34 - 20',
  location: { latitude: 4.647458649366639, longitude: -74.10329314096099 },
  name: 'Hamburguesas el corral',
  neighbor: 'Usaquen',
  phoneNumber: '3125107300',
  pricing: 3,
  rating: 3.5,
  pictures,
};

export const Default = () => <RestaurantDetails {...props} />;

export const WithMaps = () => <RestaurantDetails {...props} showMap />;

export const WithPictures = () => <RestaurantDetails {...props} showPictures />;

export const WithMapAndPictures = () => <RestaurantDetails {...props} showPictures showMap />;
