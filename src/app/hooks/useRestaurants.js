import { useState, useCallback } from 'react';
import { useStore } from 'react-redux';
import { getNearRestaurants } from '@services/googleMaps.service';
import { useMount } from '@hooks/use-mount.hook';

export const useRestaurants = () => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [likedRestaurants] = useState([]);
  const [unlikedRestaurants] = useState([]);

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
    const restaurant = restaurants.pop();
    if (direction === 'right') {
      likedRestaurants.push(restaurant);
    } else {
      unlikedRestaurants.push(restaurant);
    }
  };

  const swipe = (direction) => {
    const restaurant = restaurants[restaurants.length - 1];
    restaurant.ref.current.swipe(direction); // Swipe the card!
  };

  const refreshRestaurants = useCallback(() => {
    const location = new window.google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    getNearRestaurants({ client, location, radius: 2500 }).then((results) => {
      setRestaurants(results);
      setLoading(false);
    });
  }, [client, latitude, longitude]);

  useMount(() => refreshRestaurants());

  return { restaurants, loading, swipe, onSwipe };
};
