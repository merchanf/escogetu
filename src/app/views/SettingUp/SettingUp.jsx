import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router-dom';
import { setLocation, setFlow } from '@actions/session.action';
// import { setZone } from '@actions/user.actions';
import { getGeoLocation } from '@services/geoLocation.service';
import { getRestaurantDetailsWithoutRestaurant } from '@services/googleMaps.service';
import { initializeGoogleMaps } from '@actions/hydrate.action';
import { GOOGLE_API_KEY } from '@constants/env.constants';
import routes from '@constants/routes.constants';
import colors from '@constants/colors.constants';
import flows from '@constants/flows.constants';
// import zones from '@constants/zones.constants';
import styles from './SettingUp.module.scss';

const { red } = colors;

const autocompleteStyles = {
  control: (provided, state) => ({
    ...provided,
    border: `1px solid ${red[500]}`,
    borderRadius: '19px',
    '&:hover': {
      borderColor: red[600],
    },
    '&:active': {
      borderColor: red[700],
    },
  }),
  input: (provided) => ({
    ...provided,
    paddingLeft: `12px`,
    color: red[700],
  }),
  placeholder: (provided) => ({
    ...provided,
    paddingLeft: `12px`,
  }),
  option: (provided) => ({
    ...provided,
    color: red[700],
    '&:hover': {
      backgroundColor: red[200],
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: red[700],
    paddingLeft: `12px`,
  }),
};

const SettingUpBase = (props) => {
  const history = useHistory();
  const { sessionId } = props;

  const dispatch = useDispatch();
  const [location, setStateLocation] = useState();
  const [flow, setStateFlow] = useState();
  const [value, setValue] = useState(null);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  // const startFirebaseFlow = (sessionId, zone) => {
  //   dispatch(setFlow(sessionId, flows.FIRESTORE));
  //   dispatch(setZone(zone));
  //   // history.push(`/${routes.SWIPE}`);
  // };

  const getCurrentLocation = async () => {
    setCurrentLocationLoading(true);
    const {
      coords: { longitude, latitude },
    } = await getGeoLocation();
    setStateLocation({ latitude, longitude });
    setStateFlow(flows.NEARBY);
  };

  // start google maps flow if location provided
  useEffect(() => {
    const initGoogleMaps = async () => {
      await dispatch(initializeGoogleMaps(location));
      await dispatch(setLocation(sessionId, location));
      await dispatch(setFlow(sessionId, flow));
      setAutoCompleteLoading(false);
      setCurrentLocationLoading(false);
      history.push(`/${routes.SWIPE}`);
    };
    if (location && flow) initGoogleMaps();
  }, [dispatch, flow, history, location, sessionId]);

  useEffect(() => {
    const getLocation = async (placeId) => {
      const {
        location: { latitude, longitude },
      } = await getRestaurantDetailsWithoutRestaurant(placeId);
      setStateLocation({ latitude, longitude });
      setStateFlow(flows.SPECIFIC_POINT);
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
      {/* <h3>Puedes escoger la zona (recomendado)</h3>
       <div className={styles.SettingUp__ZoneButtons}>
        <button
          type="button"
          onClick={() => {
            // startFirebaseFlow(sessionId, zones.ZONA_G);
          }}
          disabled
        >
          Zona G (Proximamente)
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
        </div> */}
      <h3>Puedes buscar un punto de encuentro</h3>
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
              placeholder: 'Busca un lugar ej: Plaza de bolivar',
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

const mapStateToProps = ({ user: { sessionId } }) => ({
  sessionId,
});

SettingUpBase.defaultProps = {
  sessionId: '',
};

SettingUpBase.propTypes = {
  sessionId: PropTypes.string,
};

const SettingUp = connect(mapStateToProps)(SettingUpBase);
export default SettingUp;
