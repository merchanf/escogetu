import { useEffect, useState } from 'react';
import useGetRestaurants from 'src/app/hooks/useRestaurants';

export const useDeck = (latitude, longitude, googleMaps) => {
  const initialCardsAmount = 3;
  const [list, setList] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [map, setMap] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();
  const [initialCards, setInitialCards] = useState(0);
  const [service, setService] = useState();
  const [restaurantList, loadingRestaurantList, popFromRestaurantList] = useGetRestaurants(
    latitude,
    longitude,
    googleMaps,
    map,
    locationCoordinates,
  );

  const getPictures = (results, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    return photos.map((photo) => photo.getUrl({ maxWidth: 1080, maxHeight: 1920 }));
  };

  const push = (item) => {
    if (!service) return;
    const { placeId } = item;
    const request = {
      placeId,
      fields: ['photos'],
    };

    service.getDetails(request, (results) => {
      const pictures = getPictures(results);
      if (pictures) {
        setList((prevState) => {
          prevState.push({ ...item, pictures });
          return [...prevState];
        });
      } else {
        setList((prevState) => {
          prevState.push({ ...item });
          return [...prevState];
        });
      }
    });
  };

  const pop = () => {
    const item = popFromRestaurantList();
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });
    if (item) {
      push(item);
    }
  };

  useEffect(() => {
    if (!googleMaps && !map) return;
    setService(new googleMaps.places.PlacesService(map));
  }, [googleMaps, map]);

  useEffect(() => {
    if (!googleMaps || isNaN(latitude) || isNaN(longitude)) return;
    const location = new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude));
    setLocationCoordinates(location);
    setMap(
      new googleMaps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
      }),
    );
  }, [latitude, longitude, googleMaps]);

  useEffect(() => {
    if (loadingRestaurantList && !service) return;
    if (initialCards >= initialCardsAmount) {
      setLoadingPhotos(false);
      return;
    }
    pop();
    setInitialCards(initialCards + 1);
  }, [loadingRestaurantList, restaurantList, initialCards, service, pop]);

  const loading = loadingRestaurantList || loadingPhotos;
  return [loading, list, pop];
};
