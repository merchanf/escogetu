import { createAction } from '@reduxjs/toolkit';
import { uid } from 'uid';
import {
  createSession as createSessionInFirestore,
  getSession,
  addUserToSession,
} from '@services/firestore.service';
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
export const setFlow = createAction(`${USER_SECTION_NAME}/setFlow`);

export const initSession = (location) => async (dispatch, store) => {
  const {
    hydrate: {
      firebase: { database },
    },
  } = store();
  const myStorage = window.sessionStorage;

  try {
    let userUid;

    // Setting User Id
    userUid = myStorage.getItem('userUid');
    if (!userUid) {
      userUid = uid();
      myStorage.setItem('userUid', userUid);
    }
    dispatch(setUserUid(userUid));

    // Setting Session Id
    const urlParams = new URLSearchParams(window.location.search);
    let sessionId = urlParams.get('session');

    // Hydrating
    dispatch(setGeoLocationLoading(true));
    if (sessionId) {
      const firestoreSession = await getSession(sessionId, database);
      if (firestoreSession) {
        location = firestoreSession.location;
      }
    } else {
      sessionId = await createSessionInFirestore(userUid, location, database);
    }

    await dispatch(setSession(sessionId));
    addUserToSession(sessionId, userUid, database);
    myStorage.setItem('sessionId', sessionId);
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
};
