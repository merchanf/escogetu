import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LanguageIcon from '@mui/icons-material/Language';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FacebookIcon from '@mui/icons-material/Facebook';
import CallIcon from '@mui/icons-material/Call';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { ShareDialog } from '@components/index';
import { withTextIconButton, withIconButton } from '@components/Icons/Icons';
import colors from '@constants/colors.constants';
import { ctas, getCTA, isMobilePhone } from '@utils/utils';
import { logDelivery, logBooking, logShareEvent } from '@services/googleAnalytics.service';

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

const CallIconButton = withIconButton(CallIcon);
const DirectionsIconButton = withIconButton(DirectionsCarIcon);
const BookOnlineIconButton = withTextIconButton(BookOnlineIcon);
const DeliveryDiningIconButton = withTextIconButton(DeliveryDiningIcon);
const InstagramIconButton = withTextIconButton(InstagramIcon);
const ShareIconButton = withTextIconButton(ShareIcon);
const LanguageIconButton = withTextIconButton(LanguageIcon);
const MenuBookIconButton = withTextIconButton(MenuBookIcon);
const FacebookIconButton = withTextIconButton(FacebookIcon);

const RestaurantDetails = ({
  address,
  apiKey,
  booking,
  bookingType,
  cuisines,
  delivery,
  deliveryType,
  dishes,
  facebook,
  instagram,
  placeId,
  menu,
  name,
  location: { latitude: lat, longitude: lng },
  pricing,
  phoneNumber,
  pictures,
  rating,
  showMap,
  showPictures,
  website,
}) => {
  const [open, setOpen] = useState(false);
  const commaSeparated = (previousValue, currentValue) => `${previousValue}, ${currentValue}`;

  const getCTAs = () => {
    const ctaComponents = [];

    if (booking && bookingType) {
      const handleBooking = () => {
        const getBookingCTA = getCTA(bookingType);
        getBookingCTA(booking);
        logBooking(placeId);
      };
      ctaComponents.push(
        <BookOnlineIconButton
          onClick={() => handleBooking(booking)}
          caption="Reservar"
          key="Reservar"
          size="large"
          disabled={!booking || !bookingType}
          iconStyle={styles.IconStyle}
        />,
      );
    }

    if (placeId) {
      const { protocol, host } = window.location;
      const url = `${protocol}//${host}/?restaurant=${placeId}`;

      const shareData = {
        title: '¿Hacemos parche?',
        text: `Mira este restaurante que encontre, ¿vamos o miedo?`,
        url,
      };

      const text = encodeURIComponent(
        `Mira este restaurante que encontre: ${url}, ¿vamos o miedo?`,
      );

      const openShareModal = async () => {
        logShareEvent('restaurant', placeId, 'link');
        if (isMobilePhone() && navigator?.share) await navigator.share(shareData);
        else setOpen(true);
      };

      ctaComponents.push(
        <div key="Compartir">
          <ShareDialog onClose={() => setOpen(false)} url={url} open={open} text={text} />
          <ShareIconButton
            onClick={openShareModal}
            caption="Compartir"
            size="large"
            disabled={!placeId}
            iconStyle={styles.IconStyle}
          />
        </div>,
      );
    }

    if (delivery && deliveryType) {
      const handleDelivery = () => {
        const getDeliveryCTA = getCTA(deliveryType);
        getDeliveryCTA(delivery);
        logDelivery(placeId);
      };
      ctaComponents.push(
        <DeliveryDiningIconButton
          onClick={() => handleDelivery(delivery)}
          caption="Domicilio"
          key="Domicilio"
          size="large"
          iconStyle={styles.IconStyle}
        />,
      );
    }

    if (menu && ctas.length < 4) {
      const handleMenu = getCTA(ctas.WEBSITE);
      ctaComponents.push(
        <MenuBookIconButton
          onClick={() => handleMenu(menu)}
          caption="Menú"
          key="Menu"
          size="large"
          iconStyle={styles.IconStyle}
        />,
      );
    }

    if (instagram && ctaComponents.length < 4) {
      const handleInstagram = getCTA(ctas.INSTAGRAM);
      ctaComponents.push(
        <InstagramIconButton
          onClick={() => handleInstagram(instagram)}
          caption="Instagram"
          key="Instagram"
          size="large"
          iconStyle={styles.IconStyle}
        />,
      );
    }

    if (website && ctaComponents.length < 4) {
      const handleWebsite = getCTA(ctas.WEBSITE);
      ctaComponents.push(
        <LanguageIconButton
          onClick={() => handleWebsite(website)}
          caption="Sitio web"
          key="Website"
          size="large"
          disabled={!website}
          iconStyle={styles.IconStyle}
        />,
      );
    }

    if (facebook && ctaComponents.length < 4) {
      const handleFacebook = getCTA(ctas.FACEBOOK);
      ctaComponents.push(
        <FacebookIconButton
          onClick={() => handleFacebook(facebook)}
          caption="Facebook"
          key="Facebook"
          size="large"
          disabled={!website}
          iconStyle={styles.IconStyle}
        />,
      );
    }

    return ctaComponents;
  };

  const handlePhoneCall = getCTA(ctas.PHONE_NUMBER);
  const handleDirections = getCTA(ctas.DIRECTIONS);

  const surveyLink =
    'https://docs.google.com/forms/d/e/1FAIpQLSfEdefHBjdg53Tz66j8MyRrJRAKqM35unY6g_tkCHId9TudEw/viewform?usp=sf_link';

  return (
    <div className={styles.RestaurantDetails}>
      <h1 className={styles.RestaurantDetails__Name}>¡{name}!</h1>
      <h2>
        ¿Nos ayudas con 5 pregunticas en{' '}
        <a href={surveyLink} target="_blank" rel="noopener noreferrer">
          esta encuesta
          <OpenInNewIcon style={{ marginLeft: '8px', transform: 'scale(1.2)' }} />
        </a>
        <span role="img" aria-label="pleading face">
          🥺
        </span>
        <span role="img" aria-label="pray hands">
          🙏
        </span>
        ?
      </h2>

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
        <div className={styles.RestaurantDetails__Map} style={{ height: '25rem', width: '80%' }}>
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
          {phoneNumber && (
            <div className={styles.RestaurantDetails__Details__ContactInfo__CTA}>
              <div>
                <h3>Teléfono</h3>
                <p className={styles.Text}>{phoneNumber}</p>
              </div>
              <div>
                <CallIconButton
                  onClick={() => handlePhoneCall(phoneNumber)}
                  caption="Llamar"
                  size="medium"
                  iconStyle={styles.IconStyle}
                />
              </div>
            </div>
          )}

          {address && (
            <div className={styles.RestaurantDetails__Details__ContactInfo__CTA}>
              <div>
                <h3>Dirección</h3>
                <p className={styles.Text}>{address}</p>
              </div>
              <div>
                <DirectionsIconButton
                  onClick={() => handleDirections(lat, lng)}
                  caption="Direcciones"
                  size="medium"
                  iconStyle={styles.IconStyle}
                />
              </div>
            </div>
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

          {cuisines && (
            <>
              <h3>Tipo de Cocina</h3>
              <p className={styles.Text}>{cuisines.reduce(commaSeparated)}</p>
            </>
          )}
          {dishes && (
            <>
              <h3>Platos que sirven</h3>
              <p className={styles.Text}>{dishes.reduce(commaSeparated)}</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.RestaurantDetails__Wrapper}>
        <div className={styles.RestaurantDetails__Wrapper__CTAButtons}>{getCTAs()}</div>
      </div>
    </div>
  );
};

RestaurantDetails.defaultProps = {
  bio: '',
  booking: null,
  bookingType: null,
  cuisines: null,
  delivery: null,
  deliveryType: null,
  diets: null,
  dishes: null,
  facebook: null,
  instagram: null,
  menu: null,
  rating: null,
  pricing: null,
  phoneNumber: null,
  reservationLink: null,
  website: null,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  pictures: [],
  showMap: true,
  showPictures: false,
  placeId: null,
};

RestaurantDetails.propTypes = {
  bio: PropTypes.string,
  booking: PropTypes.string,
  bookingType: PropTypes.string,
  cuisines: PropTypes.arrayOf(PropTypes.string),
  delivery: PropTypes.string,
  deliveryType: PropTypes.string,
  diets: PropTypes.arrayOf(PropTypes.string),
  dishes: PropTypes.arrayOf(PropTypes.string),
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  menu: PropTypes.string,
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
  placeId: PropTypes.string,
};

export default RestaurantDetails;
