import { createAction } from '@reduxjs/toolkit';
import { getGeoLocation } from '@services/geoLocation.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { RESTAURANTS_SECTION_NAME } from '@stores/restaurants.store';
import { initGoogleMaps } from '@actions/googleMaps.action';
import { getNearRestaurants } from '@services/googleMaps.service';
import { session } from '@services/firebase/firebase';

// Session
export const setSession = createAction(`${USER_SECTION_NAME}/setSession`);
// GeoLocation
export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);
export const setGeoLocationLoading = createAction(`${USER_SECTION_NAME}/setGeoLocationLoading`);
export const setGeoLocationError = createAction(`${USER_SECTION_NAME}/setGeoLocationError`);
// Restaurants
export const setRestaurants = createAction(`${RESTAURANTS_SECTION_NAME}/setRestaurants`);
export const setRestaurantsLoading = createAction(
  `${RESTAURANTS_SECTION_NAME}/setRestaurantsLoading`,
);
export const setRestaurantsError = createAction(`${RESTAURANTS_SECTION_NAME}/setRestaurantsError`);

export const initRestaurants = () => async (dispatch, getState) => {
  try {
    dispatch(setRestaurantsLoading(true));
    const {
      hydrate: {
        googleMaps: { client },
      },
      user: {
        geoLocation: {
          location: { latitude, longitude },
        },
      },
    } = getState();
    const location = new window.google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    const restaurants = await getNearRestaurants({ client, location, radius: 2500 });
    dispatch(setRestaurants(restaurants));
  } catch (e) {
    dispatch(setRestaurantsError(e.message));
  } finally {
    dispatch(setRestaurantsLoading(false));
  }
};

export const initGeoLocation = () => async (dispatch, getState) => {
  try {
    dispatch(setGeoLocationLoading(true));
    const {
      user: { uid: userUid },
    } = getState();
    const urlParams = new URLSearchParams(window.location.search);
    const sessionParam = urlParams.get('session');
    let location;
    if (sessionParam) {
      await dispatch(setSession(sessionParam));
      const { lat, lng } = await session.load(userUid, sessionParam);
      location = {
        latitude: lat,
        longitude: lng,
      };
    } else {
      const {
        coords: { latitude, longitude },
      } = await getGeoLocation(userUid);
      location = {
        latitude,
        longitude,
      };
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
  await dispatch(initRestaurants());
};
