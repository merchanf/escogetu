/* eslint-disable no-console */
import { createRef } from 'react';
import {
  doc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  setDoc,
  limit,
  orderBy,
} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export const getPicturesURL = async (restaurantId) => {
  const storage = getStorage();
  const listRef = ref(storage, `restaurants/${restaurantId}/pictures`);
  const res = await listAll(listRef);
  const lowResPictures = res.items.filter(({ _location }) => _location.path.includes('25x25'));
  const pictures = res.items.filter(({ _location }) => !_location.path.includes('25x25'));

  const lowResPicturesPromises = lowResPictures.map(getDownloadURL);
  const picturesPromises = pictures.map(getDownloadURL);

  const lowResPicturesURL = await Promise.all(lowResPicturesPromises);
  const picturesURL = await Promise.all(picturesPromises);

  return {
    lowResPictures: lowResPicturesURL,
    pictures: picturesURL,
  };
};

const restaurantAdapter = async (
  restaurantId,
  {
    address,
    bio,
    booking,
    bookingType,
    cuisines,
    delivery,
    deliveryType,
    diets,
    dishes,
    facebook,
    instagram,
    latitude,
    longitude,
    menu,
    name,
    phone,
    pricing,
    rating,
    website,
  },
) => {
  const { pictures, lowResPictures } = await getPicturesURL(restaurantId);
  return {
    placeId: restaurantId,
    address,
    bio,
    booking,
    bookingType,
    cuisines,
    delivery,
    deliveryType,
    diets,
    dishes,
    facebook,
    instagram,
    location: {
      latitude,
      longitude,
    },
    lowResPictures,
    menu,
    name,
    rating: Number.parseFloat(rating),
    phoneNumber: phone,
    pricing: Number.parseFloat(pricing),
    pictures,
    website,
    ref: createRef(),
  };
};

export const fetchRestaurantsFromOptions = async (
  options,
  setRestaurants,
  setRestaurantsLoading,
  onError,
) => {
  setRestaurantsLoading(true);
  const queries = [];

  queries.push(orderBy('rating', 'asc'));

  if (options?.zone) {
    queries.push(where('zone', '==', options.zone));
  }

  if (options?.diets && options.diets.length > 0) {
    queries.push(where('diets', 'array-contains-any', options.diets));
  }

  queries.push(limit(options.limit));

  try {
    const db = getFirestore();
    const citiesRef = collection(db, 'restaurants');
    const q = query(citiesRef, ...queries);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setRestaurants([]);
    } else {
      let index = 0;
      querySnapshot.forEach(async (doc) => {
        const restaurant = await restaurantAdapter(doc.id, doc.data());
        setRestaurants((oldRestaurants) => {
          if (index++ === querySnapshot.size - 1) setRestaurantsLoading(false);
          if (oldRestaurants) return [...oldRestaurants, restaurant];
          return [restaurant];
        });
      });
    }
  } catch (err) {
    console.log(err);
    onError();
  }

  return null;
};

export const createSession = async (userUid) => {
  try {
    const db = getFirestore();
    const userObject = {
      users: [userUid],
      likedRestaurants: [],
      timestamp: new Date(),
    };
    const document = await addDoc(collection(db, 'session'), userObject);
    return document.id;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const addSessionToUser = async (userUid, sessionId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `users/${userUid}`);
    const document = await getDoc(docRef);
    if (!document.empty) {
      const doc = document.data();
      let visits = 0;
      let sessions = [];
      if (doc?.sessions) {
        visits = doc.visits + 1;
      }

      if (doc?.sessions) {
        sessions = [...doc.sessions, sessionId];
      } else {
        sessions = [sessionId];
      }

      console.log('sessions', { ...doc, visits, sessions });
      const storedDoc = { ...doc, visits, sessions };
      await setDoc(docRef, storedDoc, { merge: true });
    }
    return document.id;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const setLocation = async (sessionId, location) => {
  const db = getFirestore();
  const docRef = doc(db, `session/${sessionId}`);
  const document = await getDoc(docRef);
  if (document.exists()) {
    const storedDoc = { ...document.data(), location };
    await setDoc(docRef, storedDoc, { merge: true });
  }
};

export const setFlow = async (sessionId, flow) => {
  const db = getFirestore();
  const docRef = doc(db, `session/${sessionId}`);
  const document = await getDoc(docRef);
  if (document.exists()) {
    const storedDoc = { ...document.data(), flow };
    await setDoc(docRef, storedDoc, { merge: true });
  }
};

export const addUserToSession = async (sessionId, userUid) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `session/${sessionId}`);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const storedDoc = document.data();
      if (!storedDoc.users.includes(userUid)) {
        storedDoc.users = [...storedDoc.users, userUid];
      }
      await setDoc(docRef, storedDoc, { merge: true });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const getSession = async (sessionId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `session/${sessionId}`);
    const document = await getDoc(docRef);
    if (document.exists()) return document.data();
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const addLike = async (sessionId, userUid, restaurantId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, 'session', sessionId);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const storedDoc = document.data();
      if (
        storedDoc.likedRestaurants.length === 0 ||
        !alreadyInLikedRestaurant(storedDoc.likedRestaurants, restaurantId)
      ) {
        storedDoc.likedRestaurants = [
          ...storedDoc.likedRestaurants,
          { id: restaurantId, likes: [userUid], poppedUp: false },
        ];
      } else {
        storedDoc.likedRestaurants = storedDoc.likedRestaurants.map((rest) => {
          if (rest.id === restaurantId) {
            if (!rest.likes.includes(userUid)) {
              rest.likes = [...rest.likes, userUid];
            }
          }
          return rest;
        });
      }
      await setDoc(docRef, storedDoc, { merge: true });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

function alreadyInLikedRestaurant(likedRestaurants, restaurantId) {
  let isIn = false;
  likedRestaurants.forEach((rest) => {
    if (rest.id === restaurantId) {
      isIn = true;
    }
  });
  return isIn;
}

const shown = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.id === id) {
      element.poppedUp = true;
      array[i] = element;
    }
  }
  return array;
};

export const markAsShown = async (sessionId, restaurantId) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, 'session', sessionId);
    const document = await getDoc(docRef);

    if (document.exists()) {
      const storedDoc = document.data();
      storedDoc.likedRestaurants = shown(storedDoc.likedRestaurants, restaurantId);
      setDoc(docRef, storedDoc, { merge: true });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const fetchZonesList = async (setZones, setZonesLoading, onError) => {
  try {
    const db = getFirestore();
    const zonesRef = collection(db, 'zones');
    const q = query(zonesRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setZones((prev) => [...prev, doc.data()]);
    });
  } catch (err) {
    onError();
  } finally {
    setZonesLoading(false);
  }
  return null;
};

export const addZoneToSession = async (sessionId, zone) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `session/${sessionId}`);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const storedDoc = document.data();
      storedDoc.zone = zone;
      await setDoc(docRef, storedDoc, { merge: true });
    } else {
      await setDoc(docRef, { zone });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const fetchDietsList = async (setDiets, setDietsLoading) => {
  try {
    const db = getFirestore();
    const dietsRef = collection(db, 'diets');
    const q = query(dietsRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDiets((prev) => [...prev, doc.data().label]);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } finally {
    setDietsLoading(false);
  }
  return null;
};

export const addDietsToSession = async (sessionId, diets) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `session/${sessionId}`);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const storedDoc = document.data();
      storedDoc.diets = diets;
      await setDoc(docRef, storedDoc, { merge: true });
    } else {
      await setDoc(docRef, { diets });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const addDietsToUser = async (userUid, diets) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, `users/${userUid}`);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const storedDoc = document.data();
      storedDoc.diets = diets;
      await setDoc(docRef, storedDoc, { merge: true });
    } else {
      await setDoc(docRef, { diets });
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const fetchRestaurant = async (
  restaurantId,
  setRestaurant,
  setLoading,
  onError,
  noRef = false,
) => {
  setLoading(true);
  try {
    const db = getFirestore();
    const docRef = doc(db, `restaurants/${restaurantId}`);
    const document = await getDoc(docRef);
    if (document.exists()) {
      const restaurant = await restaurantAdapter(document.id, document.data());
      if (noRef && restaurant?.ref) delete restaurant.ref;
      setRestaurant(restaurant);
    } else {
      console.log('No restaurant found');
    }
  } catch (err) {
    console.log(err);
    onError();
  } finally {
    setLoading(false);
  }
  return null;
};
