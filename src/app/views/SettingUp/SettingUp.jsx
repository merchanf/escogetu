import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { createAction } from '@reduxjs/toolkit';
import { getGeoLocation } from '@services/geoLocation.service';
import { getRestaurantDetailsWithoutRestaurant } from '@services/googleMaps.service';
import { USER_SECTION_NAME } from '@stores/user.store';
import { GOOGLE_API_KEY } from '@constants/env.constants';
import colors from '@constants/colors.constants';
import styles from './SettingUp.module.scss';

export const setGeoLocation = createAction(`${USER_SECTION_NAME}/setGeoLocation`);

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

const SettingUpView = (props) => {
  const { client } = props;
  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const [value, setValue] = useState(null);

  const startFirebaseFlow = (zone) => {};

  const getCurrentLocation = async () => {
    const {
      coords: { longitude, latitude },
    } = await getGeoLocation();
    setLocation({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    const startGoogleMapsFlow = () => {
      dispatch(setGeoLocation(location));
    };

    if (location) {
      startGoogleMapsFlow();
    }
  }, [dispatch, location]);

  useEffect(() => {
    const getLocation = async (placeId) => {
      const {
        location: { lat, lng },
      } = await getRestaurantDetailsWithoutRestaurant(client, placeId);
      setLocation({ lat, lng });
    };

    if (client && value) {
      const {
        // That's how google maps send it
        // eslint-disable-next-line camelcase
        value: { place_id },
      } = value;
      getLocation(place_id);
    }
  }, [client, value]);

  return (
    <section className={styles.SettingUp}>
      <h1> ¿Dónde vamos a comer hoy? </h1>
      <h3>Puedes escoger la zona (recomendado)</h3>
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
        <button type="button">Ir</button>
      </div>
      <h3>O buscar restaurantes cerca a ti</h3>
      <h4>(Deberás darnos acceso a tu ubicación)</h4>
      <button type="button" onClick={getCurrentLocation}>
        Usar mi ubicación actual
      </button>
    </section>
  );
};

const mapStateToProps = ({
  hydrate: {
    googleMaps: { client },
  },
}) => ({
  client,
});

SettingUpView.propTypes = {
  // Complex object out of control
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.object.isRequired,
};

const SettingUp = connect(mapStateToProps)(SettingUpView);

export default SettingUp;
