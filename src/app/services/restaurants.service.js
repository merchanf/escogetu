import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getRestaurantDetails as getRestaurantDetailsGoogleMaps } from './googleMaps.service';

export const getRestaurantDetails = async (restaurant) => {
  const db = getFirestore();
  const restaurantRef = collection(db, 'restaurants');
  const q = query(restaurantRef, where('googleId', '==', restaurant.placeId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return {
      ...restaurant,
      ...querySnapshot.docs[0].data(),
    };
  }
  return getRestaurantDetailsGoogleMaps(restaurant);
};
