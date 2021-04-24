import { distance } from '@utils/utils';

export const getNearRestaurants = async ({ client, location, radius = 2500 }) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.PlacesService(client);
    const request = {
      location,
      radius,
      type: ['restaurant'],
    };
    service.nearbySearch(request, (results) => {
      resolve(
        results
          .filter(({ photos }) => photos)
          .map(({ place_id, name, photos, geometry: { location: { lat, lng } } }) => ({
            placeId: place_id,
            name,
            distance: distance(location.latitude, location.longitude, lat(), lng()),
            pictures: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
          })),
      );
    });
  });
