import { createAction } from '@reduxjs/toolkit';
import { Loader } from '@googlemaps/js-api-loader';
import { HYDRATE_SECTION_NAME } from '@stores/hydrate.store';
import { GOOGLE_API_KEY } from '@constants/env.constants';

// Maps
export const setGoogleMapsLoading = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsLoading`);
export const setGoogleMapsError = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsError`);
export const setGoogleMapsClient = createAction(`${HYDRATE_SECTION_NAME}/setGoogleMapsClient`);

export const initGoogleMaps = ({ latitude, longitude }) => async (dispatch) => {
  dispatch(setGoogleMapsLoading(true));
  try {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: 'weekly',
    });

    await loader.load();
    dispatch(
      setGoogleMapsClient(
        new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: latitude, lng: longitude },
          zoom: 8,
        }),
      ),
    );
  } catch (e) {
    dispatch(setGoogleMapsError(e.message));
  } finally {
    dispatch(setGoogleMapsLoading(false));
  }
};
