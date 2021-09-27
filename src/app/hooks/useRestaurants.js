/* eslint-disable react-hooks/rules-of-hooks */
// This one breaks hooks rules, but is the easiest way to
// decide which hook should we use.
import flows from '@constants/flows.constants';
import useGoogleMapsRestaurants from './useGoogleMapsRestaurants';

export const useRestaurants = (flow) => {
  if (flow === flows.FIRESTORE) {
    console.log('do firestore stuff');
    return null;
  }
  if (flow === flows.GOOGLE_MAPS) {
    return useGoogleMapsRestaurants();
  }
  return { restaurants: [] };
};
