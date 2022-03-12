/* eslint-disable no-console */
import {
  getAnalytics as getFirestoreAnalytics,
  logEvent,
  setUserProperties as setFirestoreUserProperties,
} from 'firebase/analytics';

export const getAnalytics = (onError) => {
  try {
    const analytics = getFirestoreAnalytics();
    return analytics;
  } catch (err) {
    onError();
  }
  return null;
};

export const logScreenView = (screenName, onError) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: screenName,
    });
  } catch (err) {
    onError();
  }
  return null;
};

export const setUserProperties = (properties, onError) => {
  try {
    const analytics = getAnalytics();
    setFirestoreUserProperties(analytics, properties);
  } catch (err) {
    onError();
  }
  return null;
};

// https://developers.google.com/gtagjs/reference/event?hl=es-419#share
export const logShareEvent = (contentType, itemId = null, method = null) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'share', {
      content_type: contentType,
      item_id: itemId,
      method,
    });
  } catch (err) {
    console.log('logShareEventError', err);
  }
  return null;
};

// https://developers.google.com/gtagjs/reference/event?hl=es-419#select_content
export const logSelectContent = (contentType, itemId) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'select_content', {
      content_type: contentType,
      item_id: itemId,
    });
  } catch (err) {
    console.log('logSelectContent', err);
  }
  return null;
};

// https://developers.google.com/analytics/devguides/collection/ga4/reference/events#example_42
export const logTutorialBegin = (onError) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'tutorial_begin');
  } catch (err) {
    console.log('logTutorialBegin', err);
  }
  return null;
};

export const logTutorialComplete = (onError) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'tutorial_complete');
  } catch (err) {
    console.log('logTutorialComplete', err);
  }
  return null;
};

export const logBooking = (restaurantId) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'booking', {
      restaurantId,
    });
  } catch (err) {
    console.log('logBooking', err);
  }
  return null;
};

export const logDelivery = (restaurantId) => {
  try {
    const analytics = getAnalytics();
    logEvent(analytics, 'delivery', {
      restaurantId,
    });
  } catch (err) {
    console.log('delivery', err);
  }
  return null;
};
