/* eslint-disable no-console */
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const eventTypes = {
  like: '1',
  Impression: '2',
  booking: '3',
  delivery: '4',
  share: '5',
  menu: '6',
  nextPicture: '7',
  goHome: '8',
  closeApp: '9',
  dislike: '10',
  previousPicture: '13',
};

const registerEvent = async (eventType, restaurantId, userId, sessionId, eventDetails) => {
  try {
    const db = getFirestore();
    const eventObject = {
      timestamp: new Date(),
      eventType,
      userId,
      sessionId,
      ...(restaurantId && { restaurantId }),
      ...eventDetails,
    };

    await addDoc(collection(db, 'events'), eventObject);
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const registerLikeEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.like, restaurantId, userId, sessionId);
};

export const registerImpressionEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.Impression, restaurantId, userId, sessionId);
};

export const registerBookingEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.booking, restaurantId, userId, sessionId);
};

export const registerDeliveryEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.delivery, restaurantId, userId, sessionId);
};

export const registerShareEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.share, restaurantId, userId, sessionId);
};

export const registerMenuEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.menu, restaurantId, userId, sessionId);
};

export const registerNextPictureEvent = async (restaurantId, userId, sessionId, pictureNumber) => {
  const eventDetails = { pictureNumber };
  await registerEvent(eventTypes.nextPicture, restaurantId, userId, sessionId, eventDetails);
};

export const registerGoHomeEvent = async (userId, sessionId) => {
  await registerEvent(eventTypes.goHome, null, userId, sessionId);
};

export const registerCloseAppEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.closeApp, restaurantId, userId, sessionId);
};

export const registerDislikeEvent = async (restaurantId, userId, sessionId) => {
  await registerEvent(eventTypes.dislike, restaurantId, userId, sessionId);
};

export const registerPreviousPictureEvent = async (
  restaurantId,
  userId,
  sessionId,
  pictureNumber,
) => {
  const eventDetails = { pictureNumber };
  await registerEvent(eventTypes.previousPicture, restaurantId, userId, sessionId, eventDetails);
};
