import React from 'react';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';

export default {
  component: GooglePlacesAutocomplete,
  title: 'GooglePlacesAutocomplete',
};

const onChange = (data) => {
  console.log(`data`, data);
};

export const Default = () => (
  <GooglePlacesAutocomplete
    name="El corral"
    distance="3 Km"
    pictures={pictures}
    onSwipe={onSwipe}
    height={500}
    width={500}
    bio="Esta es una bio de prueba"
  />
);
