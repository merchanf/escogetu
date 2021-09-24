import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { createAction } from '@reduxjs/toolkit';
import { getGeoLocation } from '@services/geoLocation.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { GOOGLE_API_KEY } from '@constants/env.constants';
import styles from './SettingUp.module.scss';

export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);

const SettingUp = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const [value, setValue] = useState(null);

  const startFirebaseFlow = (zone) => {};

  const getCurrentLocation = async () => {
    const {
      coords: { longitude, latitude },
    } = await getGeoLocation();
    setLocation({ lng: longitude, lat: latitude });
    dispatch(setGeoLocation(location));

    // Check how to init application from this point
  };

  const startGoogleMapsFlow = (lng, lat) => {};

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  return (
    <section className={styles.SettingUp}>
      <h1> ¿Dónde vamos a comer hoy? </h1>
      <h3>Escoge la zona en la que quieres comer</h3>
      <div className={styles.SettingUp__ZoneButtons}>
        <button type="button" onClick={() => {}}>
          Zona G
        </button>
        <button type="button" disabled>
          Zona T (Proximamente)
        </button>
        <button type="button" disabled>
          Macarena (Proximamente)
        </button>
        <button type="button" disabled>
          Usaquén (Proximamente)
        </button>
        <button type="button" disabled>
          Zona T (Proximamente)
        </button>
      </div>
      <h3>Busca un punto de encuentro</h3>
      <div className={styles.SettingUp__GooglePlacesAutocomplete}>
        <div className={styles.SettingUp__GooglePlacesAutocomplete__Component}>
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_API_KEY}
            apiOptions={{ language: 'es', region: 'co' }}
            autocompletionRequest={{
              componentRestrictions: {
                country: ['co'],
              },
            }}
            minLengthAutocomplete={3}
            selectProps={{
              value,
              onChange: setValue,
            }}
          />
        </div>
        <button type="button">Ir</button>
      </div>
      <h3>O busca restaurantes cerca a ti</h3>
      <h4>(Deberás darnos acceso a tu ubicación)</h4>
      <button type="button" onClick={getCurrentLocation}>
        Usar mi ubicación actual
      </button>
    </section>
  );
};

export default SettingUp;
