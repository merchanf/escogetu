import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getRestaurantDetails as getRestaurantDetailsFromGoogleMaps } from './googleMaps.service';
import { getPicturesURL } from './firestore.service';

export const getRestaurantDetails = async (restaurant) => {
  const db = getFirestore();
  const restaurantRef = collection(db, 'restaurants');
  const q = query(restaurantRef, where('googleId', '==', restaurant.placeId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const urls = await getPicturesURL(querySnapshot.docs[0].id);
    return {
      ...restaurant,
      ...querySnapshot.docs[0].data(),
      pictures: urls,
    };
  }
  return getRestaurantDetailsFromGoogleMaps(restaurant);
};
