import { createRef } from 'react';
import { distance } from '@utils/utils';

export const getRestaurantDetails = async ({ client, restaurant }) =>
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
    service.getDetails(
      request,
      ({
        name,
        price_level,
        vicinity,
        rating,
        international_phone_number,
        geometry: {
          location: { lat, lng },
        },
        photos,
      }) => {
        resolve({
          ...restaurant,
          address: vicinity,
          location: { lat: lat(), lng: lng() },
          name,
          rating,
          phoneNumber: international_phone_number,
          priceLevel: price_level,
          pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
        });
      },
    );
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
      callback(
        results
          .filter(({ photos }) => photos)
          .map(({ place_id, name, photos, geometry: { location: { lat, lng } } }) => ({
            placeId: place_id,
            name,
            distance: distance(location.latitude, location.longitude, lat(), lng()),
            pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
            ref: createRef(),
          })),
      );
    });
  }
};