import { createAction } from '@reduxjs/toolkit';
import { USER_SECTION_NAME } from '@stores/user.store';
import { addLike as addLikeToDatabase } from '@services/firestore.service';

// Likes management
export const addLike = createAction(`${USER_SECTION_NAME}/addLikedElement`);

const getRestaurant = () => ({
  placeId: 'test',
  name: 'nombre de prueba',
});

export const like = (placeId) => async (dispatch, store) => {
  const {
    hydrate: {
      firebase: { database },
    },
    user: { userUid, sessionId },
  } = store();
  const restaurant = getRestaurant();
  await addLikeToDatabase(sessionId, userUid, placeId, database);
  await dispatch(addLike(restaurant));
};
