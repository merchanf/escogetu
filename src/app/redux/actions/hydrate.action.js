import { createAction } from '@reduxjs/toolkit';
import { uid } from 'uid';
import { useHistory } from 'react-router-dom';
import {
  createSession as createSessionInFirestore,
  getSession,
  addUserToSession,
} from '@services/firestore.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { initGoogleMaps } from '@actions/googleMaps.action';
import { initFirebase } from '@actions/firebase.actions';
import routes from '@constants/routes.constants';

// User uid
export const setUserUid = createAction(`${USER_SECTION_NAME}/setUserUid`);
// Session
export const setSession = createAction(`${USER_SECTION_NAME}/setSession`);
// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);
export const setFlow = createAction(`${USER_SECTION_NAME}/setFlow`);

export const initSession = (location) => async (dispatch) => {
  const mySessionStorage = window.sessionStorage;
  const myLocalStorage = window.localStorage;
  const history = useHistory();

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
    }
    history.push(`/${routes.HOME}`);
  } else {
    sessionId = await createSessionInFirestore(userUid, location);
  }

  await dispatch(setSession(sessionId));
  addUserToSession(sessionId, userUid);
  mySessionStorage.setItem('sessionId', sessionId);
};

export const initializeGoogleMaps = (location) => async (dispatch) => {
  try {
    await dispatch(initGoogleMaps(location));
  } catch (e) {
    dispatch(setGeoLocationError(e.message));
  } finally {
    dispatch(setGeoLocationLoading(false));
  }
};

export const hydrate = () => async (dispatch) => {
  dispatch(initFirebase());
};
