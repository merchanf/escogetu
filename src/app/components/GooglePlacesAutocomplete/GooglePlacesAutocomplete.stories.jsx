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
  <GooglePlacesAutocomplete onChange={onChange} value="" apiKey="ApiKey" />
);
