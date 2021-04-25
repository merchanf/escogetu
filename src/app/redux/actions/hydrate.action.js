import { createAction } from '@reduxjs/toolkit';
import { uid } from 'uid';
import { getGeoLocation } from '@services/geoLocation.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { initGoogleMaps } from '@actions/googleMaps.action';
import { createSession, getSession } from '@services/firestore.service';

// User uid
export const setUserUid = createAction(`${USER_SECTION_NAME}/setUserUid`);
// Session
export const setSession = createAction(`${USER_SECTION_NAME}/setSession`);
// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);

export const initGeoLocation = () => async (dispatch, getState) => {
  try {
    const userUid = uid();
    dispatch(setUserUid(userUid));
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');

    dispatch(setGeoLocationLoading(true));
    let location;
    if (sessionParam) {
      const storageSession = await getSession(sessionParam);
      if (storageSession) {
        location = storageSession.location;
        dispatch(setSession(sessionParam));
      } else {
        // to clean
        const {
          coords: { latitude, longitude },
        } = await getGeoLocation(userUid);
        location = {
          latitude,
          longitude,
        };
        const sessionId = await createSession(userUid, location);
        await dispatch(setSession(sessionId));
      }
    } else {
      // to clean
      const {
        coords: { latitude, longitude },
      } = await getGeoLocation(userUid);
      location = {
        latitude,
        longitude,
      };
      const sessionId = await createSession(userUid, location);
      await dispatch(setSession(sessionId));
    }

    await dispatch(initGoogleMaps(location));
    dispatch(setGeoLocation(location));
  } catch (e) {
    dispatch(setGeoLocationError(e.message));
  } finally {
    dispatch(setGeoLocationLoading(false));
  }
};

export const hydrate = () => async (dispatch) => {
  await dispatch(initGeoLocation());
};
