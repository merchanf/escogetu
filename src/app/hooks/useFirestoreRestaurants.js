import { useState, useEffect, useMemo, useCallback } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes, config } from '@constants/constants';
import { fetchRestaurantsFromOptions } from '@services/firestore.service';
import { logSelectContent } from '@services/googleAnalytics.service';
import { like } from '@actions/user.actions';
import { setRestaurantDetails } from '@actions/session.action';

const {
  FIRESTORE_PAGINATION_LIMIT: PAGINATION_LIMIT,
  FIRESTORE_MINIMUM_RESTAURANTS: MINIMUM_RESTAURANTS,
} = config;

const useFirestoreRestaurants = () => {
  const [swiping, setSwiping] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [startAt, setStartAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    user: { diets, zone },
  } = useStore().getState();

  const onCardLeftScreen = () => {
    setRestaurants((oldRestaurants) => oldRestaurants.slice(0, oldRestaurants.length - 1));
    setSwiping(false);
  };

  const onSwipe = async (direction, likedItem) => {
    if (direction === 'right') {
      logSelectContent('restaurant', likedItem);
      const restaurant = restaurants.find(({ placeId }) => placeId === likedItem);
      dispatch(like(restaurant));
    }
  };

  const onError = useCallback(() => {
    history.push(routes.LAUNCHER);
  }, [history]);

  const swipe = (direction) => {
    if (!swiping) {
      const restaurant = restaurants[restaurants.length - 1];
      restaurant.ref.current.swipe(direction); // Swipe the card!
      setSwiping(true);
    }
  };

  const options = useMemo(
    () => ({
      zone,
      diets,
      limit: PAGINATION_LIMIT,
      startAt,
    }),
    [diets, startAt, zone],
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (restaurants === null || restaurants.length < MINIMUM_RESTAURANTS) {
        setLoading(true);

        const { lastSnapshot, restaurants } = await fetchRestaurantsFromOptions(options, onError);

        restaurants.forEach((restaurant) => {
          dispatch(setRestaurantDetails(restaurant));
        });

        setRestaurants((prevRestaurants) =>
          prevRestaurants && Array.isArray(prevRestaurants)
            ? [...restaurants, ...prevRestaurants]
            : restaurants,
        );

        setStartAt(lastSnapshot);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [diets, dispatch, onError, options, restaurants, zone]);

  return { restaurants, loading, swipe, onSwipe, onCardLeftScreen };
};

export default useFirestoreRestaurants;
