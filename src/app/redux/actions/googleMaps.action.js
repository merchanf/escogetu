import { createAction } from '@reduxjs/toolkit';
import { Loader } from '@googlemaps/js-api-loader';
import { HYDRATE_SECTION_NAME } from '@stores/hydrate.store';
import { env } from '@constants/constants';

const { GOOGLE_API_KEY } = env;

// Maps
export const setGoogleMapsLoading = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsLoading`);
export const setGoogleMapsError = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsError`);
export const setGoogleMapsClient = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsClient`);
export const setGoogleMapsInstance = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsInstance`);

export const initGoogleMaps = () => async (dispatch) => {
  dispatch(setGoogleMapsLoading(true));
  try {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      libraries: ['places'],
      version: 'weekly',
    });

    await loader.load();
    dispatch(setGoogleMapsInstance(window.google.maps));
    dispatch(setGoogleMapsClient(new window.google.maps.Map(document.getElementById('map'))));
  } catch (e) {
    dispatch(setGoogleMapsError(e.message));
  } finally {
    dispatch(setGoogleMapsLoading(false));
  }
};
