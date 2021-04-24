import { createAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { getGeoLocation } from '@services/geoLocation.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { RESTAURANTS_SECTION_NAME } from '@stores/restaurants.store';
import { initGoogleMaps } from '@actions/googleMaps.action';

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

export const getRestaurants = () => async (dispatch, getState) => {
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
    const request = {
      location,
      radius: 2500,
      type: ['restaurant'],
    };
    console.log(window.google.maps);
    const service = new window.google.maps.places.PlacesService(client);
    service.nearbySearch(request, (results) => {
      console.log(results);
    });
  } catch (e) {
    console.log(e)
    dispatch(setRestaurantsError(e.message));
  } finally {
    dispatch(setRestaurantsLoading(false));
  }
};

export const hydrate = (userUid) => async (dispatch) => {
  dispatch(setGeoLocationLoading(true));
  try {
    const {
      coords: { latitude, longitude },
    } = await getGeoLocation(userUid);
    await dispatch(initGoogleMaps({ latitude, longitude }));
    dispatch(
      setGeoLocation({
        latitude,
        longitude,
      }),
    );
    await dispatch(getRestaurants());
  } catch (e) {
    dispatch(setGeoLocationError(e.message));
  } finally {
    dispatch(setGeoLocationLoading(false));
  }
};
