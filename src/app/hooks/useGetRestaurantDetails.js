import { useState, useEffect } from 'react';

const useGetRestaurantDetails = (placeId, googleMaps) => {
  const [map, setMap] = useState();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  useEffect(() => {
    if (!googleMaps) return;
    setMap(
      new googleMaps.Map(document.getElementById('map'), {
        zoom: 15,
      }),
    );
  }, [googleMaps]);

  const getDetailsCallback = (result, status) => {
    const {
      name,
      price_level,
      vicinity,
      rating,
      international_phone_number,
      geometry: {
        location: { lat, lng },
      },
      photos,
    } = result;
    setDetails({
      address: vicinity,
      location: { lat: lat(), lng: lng() },
      name,
      rating,
      phoneNumber: international_phone_number,
      priceLevel: price_level,
      photos: photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })),
    });
  };

  useEffect(() => {
    (async () => {
      if (!placeId || !googleMaps) return;

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

      const service = new googleMaps.places.PlacesService(map);
      service.getDetails(request, getDetailsCallback);

      setLoading(false);
    })();
  }, [placeId, googleMaps]);

  return [loading, details];
};

export default useGetRestaurantDetails;
