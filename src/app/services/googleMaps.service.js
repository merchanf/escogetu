import { createRef } from 'react';
import { distance } from '@utils/utils';

const isNotARestaurant = (types) => types.includes('lodging') || types.includes('spa');
const excludeNotRestaurantsFromResults = (results) =>
  results.filter(({ types }) => !isNotARestaurant(types));
const excludeResultsWithNullPhotos = (results) => results && results.filter(({ photos }) => photos);
const filterResults = (results) => {
  const filteredResults = excludeResultsWithNullPhotos(results);
  return excludeNotRestaurantsFromResults(filteredResults);
};
const mapper = (
  {
    place_id: placeId,
    name,
    photos,
    geometry: {
      location: { lat, lng },
    },
  },
  location,
) => ({
  placeId,
  name,
  distance: distance(location.lat(), location.lng(), lat(), lng()),
  pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
  ref: createRef(),
});

export const getRestaurantDetailsWithoutRestaurant = async (placeId) => {
  return new Promise((resolve) => {
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
    const service = new window.google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails(request, (details) => {
      resolve({
        placeId,
        address: details?.vicinity,
        location: {
          lat: details?.geometry?.location?.lat(),
          lng: details?.geometry?.location?.lng(),
        },
        name: details?.name,
        rating: details?.rating,
        phoneNumber: details?.international_phone_number,
        priceLevel: details?.price_level,
        pictures:
          details?.photos &&
          details?.photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
      });
    });
  });
};

export const getRestaurantDetailsWithRestaurant = async (client, restaurant) =>
  new Promise((resolve) => {
    const request = {
      placeId: restaurant.placeId,
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
    service.getDetails(request, (details) => {
      const pictures =
        details?.photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })) ||
        restaurant.pictures;
      if (pictures && pictures.length > 1) pictures.shift();
      resolve({
        ...restaurant,
        address: details?.vicinity,
        location: {
          lat: details?.geometry?.location?.lat(),
          lng: details?.geometry?.location?.lng(),
        },
        name: details?.name,
        rating: details?.rating,
        phoneNumber: details?.international_phone_number,
        priceLevel: details?.price_level,
        pictures,
      });
    });
  });

let goNextPage;

export const getNearRestaurants = async ({ client, location, radius = 2500 }, callback) => {
  if (goNextPage) {
    goNextPage();
  } else {
    const service = new window.google.maps.places.PlacesService(client);
    const request = {
      location,
      radius,
      type: ['restaurant'],
    };
    service.nearbySearch(request, (results, status, pageToken) => {
      goNextPage = () => pageToken.nextPage();
      const filteredResults = filterResults(results);
      callback(filteredResults.map((result) => mapper(result, location)) || []);
    });
  }
};

export const getRestaurantDetails = async (client, restaurant) => {
  const isObject = typeof restaurant === 'object';
  if (restaurant != null && isObject) return getRestaurantDetailsWithRestaurant(client, restaurant);
  return getRestaurantDetailsWithoutRestaurant(client, restaurant);
};
