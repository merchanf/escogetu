import { useState, useEffect, useCallback } from 'react';
import { useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchRestaurant as fetchRestaurantFromFirebase,
  getPicturesURL,
} from '@services/firestore.service';
import { routes } from '@constants/constants';

const useGetRestaurantDetails = (placeId) => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    hydrate: {
      application: { restaurants },
    },
  } = useStore().getState();
  const history = useHistory();

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      const restaurant = await fetchRestaurantFromFirebase(placeId, onError, true);
      if (restaurant) {
        const { pictures, lowResPictures } = await getPicturesURL(placeId);
        setRestaurantDetails({ ...restaurant, pictures, lowResPictures });
      }
    };

    if (restaurants && restaurants[placeId]) {
      setRestaurantDetails(restaurants[placeId]);
    } else {
      fetchRestaurant();
    }
    setLoading(false);
  }, [restaurants, placeId, onError]);

  return { loading, restaurantDetails };
};

export default useGetRestaurantDetails;
