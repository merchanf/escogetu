import { createAction } from '@reduxjs/toolkit';
import { USER_SECTION_NAME } from '@stores/user.store';
import { addLike as addLikeToDatabase } from '@services/firestore.service';

// Likes management
export const addLike = createAction(`${USER_SECTION_NAME}/addLikedElement`);
export const addRestaurant = createAction(`${USER_SECTION_NAME}/addRestaurant`);

export const like = (restaurant) => async (dispatch, store) => {
  const {
    hydrate: {
      firebase: { database },
    },
    user: { userUid, sessionId },
  } = store();
  const { placeId } = restaurant;
  delete restaurant.ref;
  const tempRestaurant = {};
  tempRestaurant[placeId] = restaurant;
  addLikeToDatabase(sessionId, userUid, placeId, database);
  dispatch(addLike(tempRestaurant));
};
