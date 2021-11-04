import { createAction } from '@reduxjs/toolkit';
import { USER_SECTION_NAME } from '@stores/user.store';
import { setLocation as setFirestoreLocation } from '@services/firestore.service';

// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);
export const setFlow = createAction(`${USER_SECTION_NAME}/setFlow`);

export const setLocation = (sessionId, location) => async (dispatch) => {
  dispatch(setGeoLocation(location));
  setFirestoreLocation(sessionId, location);
};
