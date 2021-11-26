import { useState, useCallback, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { getNearRestaurants } from '@services/googleMaps.service';
import { getRestaurantDetails } from '@services/restaurants.service';
import { like } from '@actions/user.actions';
import { MIN_DETAILED_RESTAURANTS, RADIUS } from '@constants/restaurants.constants';

const useGoogleMapsRestaurants = () => {
  const [loading, setLoading] = useState(true);
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

  const refreshRestaurantPreviews = useCallback(() => {
    if (googleMaps && latitude && longitude) {
      const location = new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude));
      getNearRestaurants({ client, location, radius: RADIUS }, (results) =>
        setRestaurantPreviews((previews) => [...results.reverse(), ...previews]),
      );
    }
  }, [client, googleMaps, latitude, longitude]);

  useEffect(() => {
    if (restaurantPreviews.length < MIN_DETAILED_RESTAURANTS) {
      refreshRestaurantPreviews();
    }
  }, [refreshRestaurantPreviews, restaurantPreviews]);

  useEffect(() => {
    if (!restaurants) {
      setRestaurants([]);
      setLoading(true);
    } else if (restaurants && restaurants.length > 0) {
      setLoading(false);
    }
  }, [restaurants]);

  useEffect(() => {
    if (restaurantPreviews.length > 0 && restaurants.length <= 3) {
      const length = restaurantPreviews.length > 7 ? 7 : restaurantPreviews.length;
      Promise.all(
        restaurantPreviews
          .slice(0, length)
          .map((restaurantToDetail) => getRestaurantDetails(restaurantToDetail)),
      ).then((detailedRestaurants) => {
        setRestaurants([...detailedRestaurants, ...restaurants]);
        setRestaurantPreviews((prevState) => prevState.slice(length));
      });
    }
  }, [restaurantPreviews, restaurants]);

  return { restaurants, loading, swipe, onSwipe, onCardLeftScreen };
};

export default useGoogleMapsRestaurants;
