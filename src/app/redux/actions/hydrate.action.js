import { createAction } from '@reduxjs/toolkit';
import { uid } from 'uid';
import { getGeoLocation } from '@services/geoLocation.service';
import { createSession, getSession, addUserToSession } from '@services/firestore.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { initGoogleMaps } from '@actions/googleMaps.action';
import { initFirebase } from '@actions/firebase.actions';

// User uid
export const setUserUid = createAction(`${USER_SECTION_NAME}/setUserUid`);
// Session
export const setSession = createAction(`${USER_SECTION_NAME}/setSession`);
// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);

export const initGeoLocation = () => async (dispatch, store) => {
  const {
    hydrate: {
      firebase: { database },
    },
  } = store();

  try {
    const myStorage = window.sessionStorage;
    let userUid;
    let location;

    // Setting User Id
    userUid = myStorage.getItem('userUid');
    if (!userUid) {
      userUid = uid();
      myStorage.setItem('userUid', userUid);
    }
    dispatch(setUserUid(userUid));

    // Setting Session Id
    const storageSessionId = myStorage.getItem('sessionId');
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = storageSessionId || urlParams.get('session');

    // Hydrating
    dispatch(setGeoLocationLoading(true));
    if (sessionId) {
      const storageSession = await getSession(sessionId, database);
      if (storageSession) {
        location = storageSession.location;
        dispatch(setSession(sessionId));
        addUserToSession(sessionId, userUid, database);
        myStorage.setItem('sessionId', sessionId);
      } else {
        // to clean
        const {
          coords: { latitude, longitude },
        } = await getGeoLocation(userUid);
        location = {
          latitude,
          longitude,
        };
        const newSessionId = await createSession(userUid, location, database);
        await dispatch(setSession(newSessionId));
        await addUserToSession(newSessionId, userUid, database);
        myStorage.setItem('sessionId', newSessionId);
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
      const newSession = await createSession(userUid, location, database);
      await dispatch(setSession(newSession));
      await addUserToSession(newSession, userUid);
      myStorage.setItem('sessionId', newSession);
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
  dispatch(initFirebase());
  await dispatch(initGeoLocation());
};
