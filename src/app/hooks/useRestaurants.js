import { useState, useCallback, useEffect } from 'react';
import { useStore } from 'react-redux';
import { getNearRestaurants, getRestaurantDetails } from '@services/googleMaps.service';
import { useMount } from '@hooks/use-mount.hook';

export const useRestaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const {
    hydrate: {
      googleMaps: { client },
    },
    user: {
      geoLocation: {
        location: { latitude, longitude },
      },
    },
  } = useStore().getState();

  const onSwipe = (direction) => {
    restaurants.pop();
    if (direction === 'right') {
      //  TODO save in database
    }
  };

  const swipe = (direction) => {
    const restaurant = restaurants[restaurants.length - 1];
    restaurant.ref.current.swipe(direction); // Swipe the card!
  };

  const refreshRestaurants = useCallback(() => {
    const location = new window.google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    getNearRestaurants({ client, location, radius: 2500 }).then((results) => {
      setRestaurants([
        ...results.slice(0, 3).map((restaurant) => ({
          ...restaurant,
          ...getRestaurantDetails({ client, placeId: restaurant.placeId }),
        })),
        ...results.slice(3, results.length),
      ]);
    });
  }, [client, latitude, longitude]);

  useMount(() => refreshRestaurants());

  return { restaurants, loading, swipe, onSwipe };
};
