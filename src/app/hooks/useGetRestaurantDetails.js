import { useState, useEffect, useCallback } from 'react';
import { useStore, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchRestaurant as fetchRestaurantFromFirebase,
  getPicturesURL,
} from '@services/firestore.service';
import { getRestaurantDetails } from '@services/googleMaps.service';
import { initializeGoogleMaps } from '@actions/hydrate.action';
import { routes } from '@constants/constants';

const useGetRestaurantDetails = (placeId) => {
  const [firestoreAttempt, setFirestoreAttempt] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    hydrate: {
      application: { restaurants },
      googleMaps: { client },
    },
  } = useStore().getState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    const initGoogleMaps = async () => {
      await dispatch(initializeGoogleMaps());
    };
    if (!client) {
      initGoogleMaps();
    }
  }, [client, dispatch]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      const restaurant = await fetchRestaurantFromFirebase(placeId, onError, true);
      if (restaurant) {
        const { pictures, lowResPictures } = await getPicturesURL(placeId);
        setRestaurantDetails({ ...restaurant, pictures, lowResPictures });
        setLoading(false);
      }
      setFirestoreAttempt(true);
    };

    if (restaurants && restaurants[placeId]) {
      setRestaurantDetails(restaurants[placeId]);
      setLoading(false);
    } else {
      fetchRestaurant();
    }
  }, [restaurants, placeId, onError]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      const restaurant = await getRestaurantDetails(placeId);
      setRestaurantDetails(restaurant);
    };

    if (client && firestoreAttempt && !restaurantDetails) {
      fetchRestaurant();
      setLoading(false);
    }
  }, [client, firestoreAttempt, placeId, restaurantDetails]);

  return { loading, restaurantDetails };
};

export default useGetRestaurantDetails;
