import React from 'react';
import GoogleMapReact from 'google-map-react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

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
const detailIcons = { ...iconStyles, marginRight: '12px' };

export const RestaurantDetails = ({
  name,
  location,
  apiKey,
  phoneNumber,
  address,
  rating,
  priceLevel,
}) => {
  const gMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || apiKey;
  return (
    <div className={styles.RestaurantDetails}>
      <p>Hoy vamos a comer en...</p>
      <p className={styles.RestaurantDetails__Name}>¡{name}!</p>
      <div style={{ height: '250px', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: gMapsApiKey }}
          center={location}
          defaultZoom={defaultProps.zoom}
        >
          <IconWrapper lat={location.lat} lng={location.lng} />
        </GoogleMapReact>
      </div>

      <div className={styles.RestaurantDetails__Details}>
        <div className={styles.RestaurantDetails__Details__Ratings}>
          {priceLevel ? (
            <StyledRating
              name="price-rating"
              value={priceLevel}
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
        <div className={styles.RestaurantDetails__Details__ContactInfo__Wrapper}>
          <div className={styles.RestaurantDetails__Details__ContactInfo}>
            {phoneNumber && (
              <div className={styles.RestaurantDetails__Details__ContactInfo__Phone}>
                <PhoneIcon style={detailIcons} />
                {phoneNumber}
              </div>
            )}
            <div className={styles.RestaurantDetails__Details__ContactInfo__Address}>
              <LocationOnIcon style={detailIcons} />
              <div className={styles.RestaurantDetails__Details__ContactInfo__Address__Text}>
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantDetails.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  priceLevel: PropTypes.string.isRequired,
};
