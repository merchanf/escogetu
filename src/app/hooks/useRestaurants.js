import flows from '@constants/flows.constants';
import useGoogleMapsRestaurants from './useGoogleMapsRestaurants';
import useFirestoreRestaurants from './useFirestoreRestaurants';

export const useRestaurants = (flow) => {
  const firestoreRestaurants = useFirestoreRestaurants();
  const googleMapsRestaurants = useGoogleMapsRestaurants();

  if (flow === flows.FIRESTORE) {
    return firestoreRestaurants;
  }
  if (flow === flows.NEARBY || flow === flows.SPECIFIC_POINT) {
    return googleMapsRestaurants;
  }
  return { restaurants: [] };
};
