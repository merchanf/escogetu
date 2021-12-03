import React from 'react';
import GoogleMapReact from 'google-map-react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import { withTextIconButton, CallIcon } from '@components/Icons/Icons';

import styles from './RestaurantDetails.module.scss';

const IconWrapper = () => <LocationOnIcon style={{ color: '#8B0000', fontSize: '24px' }} />;

const defaultProps = {
  zoom: 15,
};

const StyledRating = withStyles({
  icon: {
    color: '#F9EBEA',
  },
  iconFilled: {
    color: '#8B0000',
  },
})(Rating);

const iconStyles = { fontSize: '32px' };

const CallIconButton = withTextIconButton(CallIcon);

const RestaurantDetails = ({
  name,
  location: { latitude: lat, longitude: lng },
  apiKey,
  phoneNumber,
  address,
  rating,
  pricing,
}) => {
  return (
    <div className={styles.RestaurantDetails}>
      <p>Hoy vamos a comer en...</p>
      <p className={styles.RestaurantDetails__Name}>¡{name}!</p>
      <div style={{ height: '250px', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey, libraries: ['places'], version: 'weekly' }}
          center={{ lat, lng }}
          defaultZoom={defaultProps.zoom}
        >
          <IconWrapper lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>

      <div className={styles.RestaurantDetails__Details}>
        <div className={styles.RestaurantDetails__Details__Ratings}>
          {pricing ? (
            <StyledRating
              name="price-rating"
              value={pricing}
              precision={0.5}
              icon={<AttachMoneyIcon style={iconStyles} />}
              readOnly
            />
          ) : (
            <div />
          )}
          <StyledRating
            name="score"
            value={rating}
            precision={0.5}
            icon={<StarIcon style={iconStyles} />}
            readOnly
          />
        </div>
        <div className={styles.RestaurantDetails__Details__ContactInfo}>
          <p className={styles.Title}>Teléfono</p>
          <p className={styles.Text}>{phoneNumber}</p>
          <p className={styles.Title}>Dirección</p>
          <p className={styles.Text}>{address}</p>
        </div>
      </div>
      <div className={styles.RestaurantDetails__CTAButtons}>
        <CallIconButton onClick={() => console.log('click 1')} caption="Llamar" />
        <CallIconButton onClick={() => console.log('click 2')} caption="Reservar" />
        <CallIconButton onClick={() => console.log('click 3')} caption="Direcciones" />
        <CallIconButton onClick={() => console.log('click 4')} caption="Pagina web" />
      </div>
    </div>
  );
};

RestaurantDetails.defaultProps = {
  rating: null,
  pricing: null,
  phoneNumber: null,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};

RestaurantDetails.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  apiKey: PropTypes.string,
  phoneNumber: PropTypes.string,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number,
  pricing: PropTypes.number,
};

export default RestaurantDetails;
