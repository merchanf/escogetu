import { useState, useCallback, useEffect } from 'react';
import { useStore } from 'react-redux';
import { getNearRestaurants, getRestaurantDetails } from '@services/googleMaps.service';
import { useMount } from '@hooks/use-mount.hook';
import { MIN_DETAILED_RESTAURANTS } from '@constants/restaurants.constants';

export const useRestaurants = () => {
  const [restaurantPreviews, setRestaurantPreviews] = useState([]);
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
    setRestaurants((oldRestaurants) => oldRestaurants.slice(0, oldRestaurants.length - 1));
    setRestaurantPreviews((oldPreviews) => oldPreviews.slice(0, oldPreviews.length - 1));
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
    getNearRestaurants({ client, location, radius: 2500 }, (results) =>
      setRestaurantPreviews((previews) => [...results, ...previews]),
    );
  }, [client, latitude, longitude]);

  useEffect(() => {
    if (restaurantPreviews.length === MIN_DETAILED_RESTAURANTS) {
      refreshRestaurants();
    }
  }, [refreshRestaurants, restaurantPreviews]);

  // Get details of next restaurants
  useEffect(() => {
    const restaurantsToDetail = MIN_DETAILED_RESTAURANTS - restaurants.length;
    if (restaurantsToDetail) {
      Promise.all(
        restaurantPreviews
          .slice(
            restaurantPreviews.length - restaurantsToDetail - restaurants.length,
            restaurantPreviews.length - restaurants.length,
          )
          .map((restaurantToDetail) =>
            getRestaurantDetails({ client, restaurant: restaurantToDetail }),
          ),
      ).then((detailedRestaurants) => setRestaurants([...detailedRestaurants, ...restaurants]));
    }
  }, [client, restaurantPreviews, restaurants]);

  useMount(() => refreshRestaurants());

  return { restaurants, swipe, onSwipe };
};
