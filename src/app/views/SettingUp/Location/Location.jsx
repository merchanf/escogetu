import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useHistory } from 'react-router-dom';

import { CircularProgress, Button } from '@components/index';
import { logScreenView } from '@services/googleAnalytics.service';
import { fetchZonesList } from '@services/firestore.service';
import { initializeGoogleMaps } from '@actions/hydrate.action';
import { getGeoLocation } from '@services/geoLocation.service';
import { setLocation, setFlow, setZone } from '@actions/session.action';
import { flows, routes } from '@constants/constants';

import styles from './Location.module.scss';

const { NEARBY, FIRESTORE } = flows;
const { SWIPE } = routes;

const Location = ({ sessionId, nextStep }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [location, setStateLocation] = useState();
  const [flow, setStateFlow] = useState();
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [geoLocationLoaded, setGeoLocationLoaded] = useState();
  const [zones, setZones] = useState([]);
  const [zonesLoading, setZonesLoading] = useState(false);

  const getCurrentLocation = async () => {
    setCurrentLocationLoading(true);

    try {
      const {
        coords: { longitude, latitude },
      } = await getGeoLocation();
      setStateLocation({ latitude, longitude });
      setGeoLocationLoaded(true);
    } catch (error) {
      setGeoLocationLoaded(false);
    }
    setStateFlow(NEARBY);
  };

  // start google maps flow if location provided
  useEffect(() => {
    const initGoogleMaps = async () => {
      await dispatch(initializeGoogleMaps(location));
      await dispatch(setLocation(sessionId, location));
      await dispatch(setFlow(sessionId, flow));
      setCurrentLocationLoading(false);

      history.push(SWIPE);
    };
    if (location && flow) initGoogleMaps();
  }, [dispatch, flow, history, location, sessionId]);

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    setZonesLoading(true);
    fetchZonesList(setZones, setZonesLoading, onError);
  }, [onError]);

  useEffect(() => {
    logScreenView('location', onError);
  }, [onError]);

  const startFirebaseFlow = (zone) => {
    dispatch(setFlow(sessionId, FIRESTORE));
    dispatch(setZone(sessionId, zone));
    nextStep();
  };

  return (
    <section className={styles.Location}>
      <h1> ¿Dónde vamos a comer hoy? </h1>
      <h2>Puedes escoger la zona (recomendado)</h2>
      <div className={styles.Location__ZoneButtons}>
        {zonesLoading ? (
          <CircularProgress />
        ) : (
          zones.map(({ label, available }) => (
            <Button
              key={label}
              type="button"
              className={styles.Location__ZoneButtons__Button}
              onClick={() => {
                startFirebaseFlow(label);
              }}
              disabled={!available}
            >
              {label}
              {!available && ' *'}
            </Button>
          ))
        )}
      </div>
      <h2>O buscar restaurantes cerca a ti</h2>
      <h3>(Deberás darnos acceso a tu ubicación)</h3>
      <div className={styles.Location__CurrentLocation}>
        <Button onClick={getCurrentLocation}>Usar mi ubicación actual</Button>
        {(currentLocationLoading && geoLocationLoaded == null) ||
          (geoLocationLoaded && <CircularProgress />)}
        {geoLocationLoaded != null && !geoLocationLoaded && (
          <ClearRoundedIcon className={styles.CrossIcon} />
        )}
      </div>
      {geoLocationLoaded != null && !geoLocationLoaded && (
        <p>
          No podemos acceder a tu ubicación. Revisa los permisos de tu teléfono o usa otra de las
          opciones listadas
        </p>
      )}
    </section>
  );
};

Location.defaultProps = {
  sessionId: '',
  nextStep: () => {},
};

Location.propTypes = {
  sessionId: PropTypes.string,
  nextStep: PropTypes.func,
};

export default Location;
