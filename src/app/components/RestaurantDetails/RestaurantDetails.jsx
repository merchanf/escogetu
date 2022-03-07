import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';

import { withTextIconButton } from '@components/Icons/Icons';
import colors from '@constants/colors.constants';
import { isIos, isMobilePhone } from '@utils/utils';

import styles from './RestaurantDetails.module.scss';

const { oldBurgundy, red } = colors;

const IconWrapper = () => (
  <LocationOnIcon className={styles.IconStyle} style={{ color: red[500] }} />
);

const defaultProps = {
  zoom: 15,
};

const carouselProps = {
  showArrows: true,
  showStatus: false,
  showIndicators: false,
  centerMode: true,
  centerSlidePercentage: 80,
  infiniteLoop: true,
  showThumbs: false,
  useKeyboardArrows: true,
  autoPlay: true,
  stopOnHover: true,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 100,
  selectedItem: 0,
  interval: 3500,
  transitionTime: 1000,
  swipeScrollTolerance: 5,
};

const StyledRating = withStyles({
  icon: {
    color: oldBurgundy[100],
  },
  iconFilled: {
    color: oldBurgundy[500],
  },
})(Rating);

const CallIconButton = withTextIconButton(CallIcon);
const DirectionsIconButton = withTextIconButton(DirectionsCarIcon);
const BookOnlineIconButton = withTextIconButton(BookOnlineIcon);
const WebsiteIconButton = withTextIconButton(LanguageIcon);

const RestaurantDetails = ({
  name,
  location: { latitude: lat, longitude: lng },
  apiKey,
  phoneNumber,
  address,
  rating,
  pricing,
  pictures,
  reservationLink,
  website,
  showMap,
  showPictures,
}) => {
  const call = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const directions = () => {
    if (isIos() || !isMobilePhone()) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    } else {
      window.location.href = `geo:${lat},${lng}`;
    }
  };

  return (
    <div className={styles.RestaurantDetails}>
      <h1 className={styles.RestaurantDetails__Name}>¡{name}!</h1>
      <h2>Tu y tus amigos han escogido este restaurante</h2>

      {showPictures && pictures && pictures.length > 0 && (
        <div className={styles.RestaurantDetails__Carousel}>
          <Carousel {...carouselProps}>
            {pictures.map((src, index) => (
              <div key={index} className={styles.RestaurantDetails__Carousel__Picture}>
                <img src={src} alt={src} />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {showMap && (
        <div className={styles.RestaurantDetails__Map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey, libraries: ['places'], version: 'weekly' }}
            center={{ lat, lng }}
            defaultZoom={defaultProps.zoom}
          >
            <IconWrapper lat={lat} lng={lng} />
          </GoogleMapReact>
        </div>
      )}

      <div className={styles.RestaurantDetails__Details}>
        <div className={styles.RestaurantDetails__Details__Ratings} />
        <div className={styles.RestaurantDetails__Details__ContactInfo}>
          {rating && (
            <>
              <h3>Puntuación del sitio</h3>
              <StyledRating
                name="score"
                value={rating}
                precision={0.5}
                icon={<StarIcon className={styles.RatingStyle} />}
                readOnly
              />
            </>
          )}
          {pricing && (
            <>
              <h3>Rango de precios</h3>
              <StyledRating
                name="price-rating"
                value={pricing}
                precision={0.5}
                icon={<AttachMoneyIcon className={styles.RatingStyle} />}
                readOnly
              />
            </>
          )}
          {phoneNumber && (
            <>
              <h3>Teléfono</h3>
              <p className={styles.Text}>{phoneNumber}</p>
            </>
          )}
          {address && (
            <>
              <h3>Dirección</h3>
              <p className={styles.Text}>{address}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.RestaurantDetails__Wrapper}>
        <div className={styles.RestaurantDetails__Wrapper__CTAButtons}>
          <CallIconButton
            onClick={call}
            caption="Llamar"
            size="large"
            disabled={!phoneNumber}
            iconStyle={styles.IconStyle}
          />
          <DirectionsIconButton
            onClick={directions}
            caption="Direcciones"
            size="large"
            disabled={!(lat && lng)}
            iconStyle={styles.IconStyle}
          />
          <BookOnlineIconButton
            onClick={() => {}}
            caption="Reservar"
            size="large"
            disabled={!reservationLink}
            iconStyle={styles.IconStyle}
          />
          <WebsiteIconButton
            onClick={() => {}}
            caption="Pagina web"
            size="large"
            disabled={!website}
            iconStyle={styles.IconStyle}
          />
        </div>
      </div>
    </div>
  );
};

RestaurantDetails.defaultProps = {
  rating: null,
  pricing: null,
  phoneNumber: null,
  reservationLink: null,
  website: null,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  pictures: [],
  showMap: true,
  showPictures: false,
};

RestaurantDetails.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  apiKey: PropTypes.string,
  phoneNumber: PropTypes.string,
  reservationLink: PropTypes.string,
  website: PropTypes.string,
  address: PropTypes.string.isRequired,
  rating: PropTypes.number,
  pricing: PropTypes.number,
  pictures: PropTypes.arrayOf(PropTypes.string),
  showMap: PropTypes.bool,
  showPictures: PropTypes.bool,
};

export default RestaurantDetails;
