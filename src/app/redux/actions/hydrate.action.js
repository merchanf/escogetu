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
import {
  setGeoLocationError,
  setGeoLocationLoading,
  setGeoLocation,
  setStateFlow,
} from '@actions/session.action';

export const setHydrating = createAction(`${USER_SECTION_NAME}/setHydrating`);
// User uid
export const setUserUid = createAction(`${USER_SECTION_NAME}/setUserUid`);
// Session
export const setSession = createAction(`${USER_SECTION_NAME}/setSession`);

export const initializeGoogleMaps = (location) => async (dispatch) => {
  dispatch(setGeoLocationLoading(true));
  try {
    await dispatch(initGoogleMaps(location));
    dispatch(setGeoLocation(location));
  } catch (e) {
    dispatch(setGeoLocationError(e.message));
  } finally {
    dispatch(setGeoLocationLoading(false));
  }
};

export const initSession = (location) => async (dispatch) => {
  dispatch(setHydrating(true));
  const mySessionStorage = window.sessionStorage;
  const myLocalStorage = window.localStorage;

  let userUid;

  // Setting User Id
  userUid = myLocalStorage.getItem('userUid');
  if (!userUid) {
    userUid = uid();
    myLocalStorage.setItem('userUid', userUid);
  }
  dispatch(setUserUid(userUid));

  // Setting Session Id
  const urlParams = new URLSearchParams(window.location.search);
  let sessionId = urlParams.get('session');

  // Hydrating
  if (sessionId) {
    const firestoreSession = await getSession(sessionId);
    if (firestoreSession) {
      location = firestoreSession.location;
      const { flow } = firestoreSession;
      await dispatch(initializeGoogleMaps(location));
      await dispatch(setGeoLocation(sessionId, location));
      await dispatch(setStateFlow(flow));
    }
  } else {
    sessionId = await createSessionInFirestore(userUid, location);
  }

  await dispatch(setSession(sessionId));
  addUserToSession(sessionId, userUid);
  mySessionStorage.setItem('sessionId', sessionId);
  dispatch(setHydrating(false));
};

export const hydrate = () => async (dispatch) => {
  dispatch(initFirebase());
  dispatch(initSession());
};
