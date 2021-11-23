import { createAction } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

import 'firebase/analytics';

// Firebase
export const setFirebaseLoading = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseLoading`);
export const setFirebaseError = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseError`);
export const setFirebaseInstance = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseInstance`);
export const setDatabaseInstance = createAction(`${HYDRATE_SECTION_NAME}/setDatabaseInstance`);
export const setFirebaseStorage = createAction(`${HYDRATE_SECTION_NAME}/setFirebaseStorage`);

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

export const initFirebase = () => (dispatch) => {
  dispatch(setFirebaseLoading(true));
  try {
    const app = initializeApp(config);
    const db = getFirestore();
    const storage = getStorage(app);

    dispatch(setFirebaseInstance(app));
    dispatch(setDatabaseInstance(db));
    dispatch(setFirebaseStorage(storage));
  } catch (e) {
    dispatch(setFirebaseError(e.message));
  } finally {
    dispatch(setFirebaseLoading(false));
  }
};
