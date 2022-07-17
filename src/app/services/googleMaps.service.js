/* eslint-disable camelcase */
import { createRef } from 'react';
import { distance } from '@utils/utils';
import { config } from '@constants/constants';

const { RADIUS } = config;

const isNotARestaurant = (types) => types.includes('lodging') || types.includes('spa');
const excludeNotRestaurantsFromResults = (results) =>
  results.filter(({ types }) => !isNotARestaurant(types));
const excludeResultsWithNullPhotos = (results) => results && results.filter(({ photos }) => photos);
const excludeRestaurantsWithLowerRating = (results) =>
  results.filter(({ rating, user_ratings_total }) => rating >= 4 && user_ratings_total > 50);
const filterResults = (results) => {
  let filteredResults = excludeResultsWithNullPhotos(results);
  filteredResults = excludeNotRestaurantsFromResults(filteredResults);
  return excludeRestaurantsWithLowerRating(filteredResults);
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
  pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1280, maxHeight: 720 })),
  ref: createRef(),
});

const getPictures = (photos, backupPictures) => {
  if (!photos || !backupPictures) return null;
  const pictures =
    photos.map((photo) => photo.getUrl({ maxWidth: 1280, maxHeight: 720 })) || backupPictures;
  if (pictures && pictures.length > 1) pictures.shift();
  return pictures;
};

const getLowResPictures = (photos, backupPictures) => {
  if (!photos || !backupPictures) return null;
  const pictures =
    photos.map((photo) => photo.getUrl({ maxWidth: 20, maxHeight: 38 })) || backupPictures;
  if (pictures && pictures.length > 1) pictures.shift();
  return pictures;
};

const restaurantAdapter = (
  placeId,
  {
    vicinity,
    geometry: {
      location: { lat, lng },
    },
    name,
    rating,
    international_phone_number,
    price_level,
    photos,
  },
  backupPictures,
) => ({
  placeId,
  address: vicinity,
  location: {
    latitude: lat(),
    longitude: lng(),
  },
  name,
  rating,
  phoneNumber: international_phone_number,
  pricing: price_level,
  pictures: getPictures(photos, backupPictures),
  lowResPictures: getLowResPictures(photos, backupPictures),
});

const fields = [
  'international_phone_number',
  'name',
  'rating',
  'vicinity',
  'geometry',
  'price_level',
  'photos',
];

export const getRestaurantDetailsWithoutRestaurant = async (placeId) => {
  return new Promise((resolve) => {
    const request = {
      placeId,
      fields,
    };
    const service = new window.google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails(request, (details) => resolve(restaurantAdapter(placeId, details)));
  });
};

export const getRestaurantDetailsWithRestaurant = async (restaurant) =>
  new Promise((resolve) => {
    const request = {
      placeId: restaurant.placeId,
      fields,
    };
    const service = new window.google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails(request, (details) => {
      if (!details) return;
      resolve({
        ...restaurant,
        ...restaurantAdapter(restaurant.placeId, details, restaurant.pictures),
      });
    });
  });

let goNextPage;

export const getNearRestaurants = async ({ client, location, radius = RADIUS }, callback) => {
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

export const getRestaurantDetails = async (restaurant) => {
  const isObject = typeof restaurant === 'object';
  if (restaurant != null && isObject) return getRestaurantDetailsWithRestaurant(restaurant);
  return getRestaurantDetailsWithoutRestaurant(restaurant);
};
