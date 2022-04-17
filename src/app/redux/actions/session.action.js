import { createAction } from '@reduxjs/toolkit';
import { USER_SECTION_NAME } from '@stores/user.store';
import {
  setLocation as setFirestoreLocation,
  setFlow as setFirestoreFlow,
  addZoneToSession,
} from '@services/firestore.service';

// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);
export const setStateFlow = createAction(`${USER_SECTION_NAME}/setFlow`);
export const setStateZone = createAction(`${USER_SECTION_NAME}/setZone`);
export const setRestaurantDetails = createAction(`${USER_SECTION_NAME}/setRestaurantDetails`);
export const setRestaurantDetailsPictures = createAction(
  `${USER_SECTION_NAME}/setRestaurantDetailsPictures`,
);

export const setLocation = (sessionId, location) => async (dispatch) => {
  await dispatch(setGeoLocation(location));
  await setFirestoreLocation(sessionId, location);
};

export const setFlow = (sessionId, flow) => async (dispatch) => {
  await dispatch(setStateFlow(flow));
  await setFirestoreFlow(sessionId, flow);
};

export const setZone = (sessionId, zone) => async (dispatch) => {
  await dispatch(setStateZone(zone));
  await addZoneToSession(sessionId, zone);
};
