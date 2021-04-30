export const createSession = async (userUid, position, database) => {
  try {
    const document = await database.collection('session').add({
      users: [userUid],
      location: position,
      likedRestaurants: [],
    });
    return document.id;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const addUserToSession = async (sessionId, userUid, database) => {
  try {
    const query = await database.doc(`session/${sessionId}`);
    const document = await query.get();
    if (document.exists) {
      const storedDoc = document.data();
      if (!storedDoc.users.includes(userUid)) {
        storedDoc.users = [...storedDoc.users, userUid];
      }
      query.set(storedDoc, { merge: true });
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
    const doc = database.doc(`session/${sessionId}`);
    const document = await doc.get();
    if (document.exists) {
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
      doc.set(storedDoc, { merge: true });
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

export const markAsShown = async (sessionId, userUid, restaurantId, database) => {
  try {
    const doc = database.doc(`session/${sessionId}`);
    const document = await doc.get();
    if (document.exists) {
      const storedDoc = document.data();
      storedDoc.likedRestaurants = shown(storedDoc.likedRestaurants, restaurantId);
      doc.set(storedDoc, { merge: true });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  return null;
};
