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
} from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export const getRestaurantsFromOptions = async (options, database) => {
  try {
    const db = getFirestore();
    const citiesRef = collection(db, 'restaurants');
    const q = query(citiesRef, where('name', '==', 'chef burger'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};

export const createSession = async (userUid, location, database) => {
  try {
    const db = getFirestore();
    const userObject = {
      users: [userUid],
      location,
      likedRestaurants: [],
    };
    const document = await addDoc(collection(db, 'session'), userObject);
    return document.id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};

export const addUserToSession = async (sessionId, userUid, database) => {
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
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};

export const getSession = async (sessionId, database) => {
  try {
    const document = await database.doc(`session/${sessionId}`).get();
    if (document.exists) return document.data();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};

export const addLike = async (sessionId, userUid, restaurantId, database) => {
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
    // eslint-disable-next-line no-console
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

export const markAsShown = async (sessionId, userUid, restaurantId) => {
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
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};

export const getPicturesURL = async (restaurantId) => {
  const storage = getStorage();
  const listRef = ref(storage, `restaurants/${restaurantId}/pictures`);
  const res = await listAll(listRef);
  const urlsPromises = res.items.map(getDownloadURL);
  return Promise.all(urlsPromises);
};
