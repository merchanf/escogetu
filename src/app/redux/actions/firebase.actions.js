import { createAction } from '@reduxjs/toolkit';
import firebaseInstance from 'firebase/app';
import { HYDRATE_SECTION_NAME } from '@stores/hydrate.store';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@constants/env.constants';
import 'firebase/firestore';
import 'firebase/analytics';

// Firebase
export const setFirebaseLoading = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseLoading`);
export const setFirebaseError = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseError`);
export const setFirebaseInstance = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseInstance`);
export const setDatabaseInstance = createAction(`${HYDRATE_SECTION_NAME}/setDatabaseInstance`);

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export const initFirebase = () => async (dispatch) => {
  dispatch(setFirebaseLoading(true));
  try {
    const app = !firebaseInstance.apps.length
      ? firebaseInstance.initializeApp(config)
      : firebaseInstance.app();

    dispatch(setFirebaseInstance(app));
    dispatch(setDatabaseInstance(app.firestore()));
  } catch (e) {
    dispatch(setFirebaseError(e.message));
  } finally {
    dispatch(setFirebaseLoading(false));
  }
};