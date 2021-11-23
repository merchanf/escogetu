import { createAction } from '@reduxjs/toolkit';
import { USER_SECTION_NAME } from '@stores/user.store';
import { addLike as addLikeToDatabase } from '@services/firestore.service';

// Likes management
export const addLike = createAction(`${USER_SECTION_NAME}/addLikedElement`);
export const setMatch = createAction(`${USER_SECTION_NAME}/setMatch`);
export const setZone = createAction(`${USER_SECTION_NAME}/setZone`);

export const like = (restaurant) => async (dispatch, store) => {
  const {
    hydrate: {
      firebase: { database },
    },
    user: { userUid, sessionId },
  } = store();
  const { placeId } = restaurant;
  delete restaurant.ref;
  addLikeToDatabase(sessionId, userUid, placeId, database);
  dispatch(addLike({ [placeId]: restaurant }));
};
