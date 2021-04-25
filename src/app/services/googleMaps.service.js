import { createRef } from 'react';
import { distance } from '@utils/utils';

const isNotARestaurant = (types) => types.includes('lodging') || types.includes('spa');
const excludeNotRestaurantsFromResults = (results) =>
  results.filter(({ types }) => !isNotARestaurant(types));
const excludeResultsWithNullPhotos = (results) => results.filter(({ photos }) => photos);
const filterResults = (results) => {
  const filteredResults = excludeResultsWithNullPhotos(results);
  return excludeNotRestaurantsFromResults(filteredResults);
};
const mapper = (
  {
    // eslint-disable-next-line camelcase
    place_id,
    name,
    photos,
    geometry: {
      location: { lat, lng },
    },
  },
  location,
) => ({
  placeId: place_id,
  name,
  distance: distance(location.latitude, location.longitude, lat(), lng()),
  pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
  ref: createRef(),
});

export const getNearRestaurants = async ({ client, location, radius = 2500 }) =>
  new Promise((resolve) => {
    const service = new window.google.maps.places.PlacesService(client);
    const request = {
      location,
      radius,
      type: ['restaurant'],
    };
    service.nearbySearch(request, (results) => {
      const filteredResults = filterResults(results);
      resolve(filteredResults.map((result) => mapper(result, location)));
    });
  });

export const getRestaurantDetails = async ({ client, placeId }) =>
  new Promise((resolve) => {
    const request = {
      placeId,
      fields: [
        'international_phone_number',
        'name',
        'rating',
        'vicinity',
        'geometry',
        'price_level',
        'photos',
      ],
    };
    const service = new window.google.maps.places.PlacesService(client);
    service.getDetails(
      request,
      ({
        name,
        // eslint-disable-next-line camelcase
        price_level,
        vicinity,
        rating,
        // eslint-disable-next-line camelcase
        international_phone_number,
        geometry: {
          location: { lat, lng },
        },
        photos,
      }) => {
        resolve({
          address: vicinity,
          location: { lat: lat(), lng: lng() },
          name,
          rating,
          phoneNumber: international_phone_number,
          priceLevel: price_level,
          photos: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
        });
      },
    );
  });
