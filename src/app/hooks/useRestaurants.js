import { useState, useCallback, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { getNearRestaurants, getRestaurantDetails } from '@services/googleMaps.service';
import { like } from '@actions/user.actions';
import { useMount } from '@hooks/use-mount.hook';
import { MIN_DETAILED_RESTAURANTS } from '@constants/restaurants.constants';

export const useRestaurants = () => {
  const [restaurantPreviews, setRestaurantPreviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [swiping, setSwiping] = useState(false);
  const dispatch = useDispatch();

  const {
    hydrate: {
      googleMaps: { client, googleMaps },
    },
    user: {
      geoLocation: {
        location: { latitude, longitude },
      },
    },
  } = useStore().getState();

  const onCardLeftScreen = () => {
    setRestaurants((oldRestaurants) => oldRestaurants.slice(0, oldRestaurants.length - 1));
    setRestaurantPreviews((oldPreviews) => oldPreviews.slice(0, oldPreviews.length - 1));
    setSwiping(false);
  };

  const onSwipe = async (direction, likedItem) => {
    if (direction === 'right') {
      const restaurant = restaurants.find(({ placeId }) => placeId === likedItem);
      dispatch(like(restaurant));
    }
  };

  const swipe = (direction) => {
    if (!swiping) {
      const restaurant = restaurants[restaurants.length - 1];
      restaurant.ref.current.swipe(direction); // Swipe the card!
      setSwiping(true);
    }
  };

  const refreshRestaurants = useCallback(() => {
    if (googleMaps) {
      const location = new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude));
      getNearRestaurants({ client, location, radius: 2500 }, (results) =>
        setRestaurantPreviews((previews) => [...results, ...previews]),
      );
    }
  }, [client, googleMaps, latitude, longitude]);

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
          .map((restaurantToDetail) => getRestaurantDetails(client, restaurantToDetail)),
      ).then((detailedRestaurants) => setRestaurants([...detailedRestaurants, ...restaurants]));
    }
  }, [client, restaurantPreviews, restaurants]);

  useMount(() => refreshRestaurants());

  return { restaurants, swipe, onSwipe, onCardLeftScreen };
};
