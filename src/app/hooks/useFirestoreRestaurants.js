import { useState, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
// import { MIN_DETAILED_RESTAURANTS } from '@constants/restaurants.constants';
import { fetchRestaurantsFromOptions } from '@services/firestore.service';
import { like } from '@actions/user.actions';

const useFirestoreRestaurants = () => {
  const [swiping, setSwiping] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    user: { diets, zone },
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

  useEffect(() => {
    const options = {
      zone,
      diets,
    };

    fetchRestaurantsFromOptions(options, setRestaurants, setLoading);
  }, [diets, zone]);

  return { restaurants, loading, swipe, onSwipe, onCardLeftScreen };
};

export default useFirestoreRestaurants;
