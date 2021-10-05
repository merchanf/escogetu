import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import { setZone } from '@actions/user.actions';
import { getGeoLocation } from '@services/geoLocation.service';
import { getRestaurantDetailsWithoutRestaurant } from '@services/googleMaps.service';
import { initSession, setGeoLocation, setFlow } from '@actions/hydrate.action';
import { GOOGLE_API_KEY } from '@constants/env.constants';
import routes from '@constants/routes.constants';
import colors from '@constants/colors.constants';
import flows from '@constants/flows.constants';
import zones from '@constants/zones.constants';
import styles from './SettingUp.module.scss';

const { blue } = colors;

const autocompleteStyles = {
  control: (provided, state) => ({
    ...provided,
    border: `1px solid ${blue.basic}`,
    borderRadius: '19px',
    '&:hover': {
      borderColor: blue.darker,
    },
    '&:active': {
      borderColor: blue.moreDarker,
    },
  }),
  input: (provided) => ({
    ...provided,
    paddingLeft: `12px`,
    color: blue.darkest,
  }),
  placeholder: (provided) => ({
    ...provided,
    paddingLeft: `12px`,
  }),
  option: (provided) => ({
    ...provided,
    color: blue.darkest,
    '&:hover': {
      backgroundColor: blue.lightest,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: blue.darkest,
    paddingLeft: `12px`,
  }),
};

const SettingUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const [value, setValue] = useState(null);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  const startFirebaseFlow = (zone) => {
    dispatch(setFlow(flows.FIRESTORE));
    dispatch(setZone(zone));
    history.push(`/${routes.HOME}`);
  };

  const getCurrentLocation = async () => {
    setCurrentLocationLoading(true);
    const {
      coords: { longitude, latitude },
    } = await getGeoLocation();
    setLocation({ latitude, longitude });
  };

  // start google maps flow if location provided
  useEffect(() => {
    const startGoogleMapsFlow = async () => {
      dispatch(setFlow(flows.GOOGLE_MAPS));
      dispatch(setGeoLocation(location));
      await dispatch(initSession(location));
      setAutoCompleteLoading(false);
      setCurrentLocationLoading(false);
      history.push(`/${routes.HOME}`);
    };

    if (location) {
      startGoogleMapsFlow();
    }
  }, [dispatch, history, location]);

  useEffect(() => {
    const getLocation = async (placeId) => {
      const {
        location: { lat, lng },
      } = await getRestaurantDetailsWithoutRestaurant(placeId);
      setLocation({ latitude: lat, longitude: lng });
    };

    if (value) {
      setAutoCompleteLoading(true);
      const {
        // That's how google maps send it
        // eslint-disable-next-line camelcase
        value: { place_id },
      } = value;
      getLocation(place_id);
    }
  }, [value]);

  return (
    <section className={styles.SettingUp}>
      <h1> ¿Dónde vamos a comer hoy? </h1>
      <h3>Puedes escoger la zona (recomendado)</h3>
      <div className={styles.SettingUp__ZoneButtons}>
        <button
          type="button"
          onClick={() => {
            startFirebaseFlow(zones.ZONA_G);
          }}
        >
          Zona G
        </button>
        <button type="button" disabled>
          Quinta de camacho (Proximamente)
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
      <h3>También buscar un punto de encuentro</h3>
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
              styles: autocompleteStyles,
            }}
          />
        </div>
        {autoCompleteLoading && <CircularProgress />}
      </div>
      <h3>O buscar restaurantes cerca a ti</h3>
      <h4>(Deberás darnos acceso a tu ubicación)</h4>
      <div className={styles.SettingUp__CurrentLocation}>
        <button type="button" onClick={getCurrentLocation}>
          Usar mi ubicación actual
        </button>
        {currentLocationLoading && <CircularProgress />}
      </div>
    </section>
  );
};

export default SettingUp;
