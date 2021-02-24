import GoogleMapReact from "google-map-react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";

import styles from "./RestaurantDetails.module.scss";

import { PinIcon } from "../Icons/Icons";

const defaultProps = {
  zoom: 15,
};

const StyledRating = withStyles({
  icon: {
    color: "#F9EBEA",
  },
  iconFilled: {
    color: "#8B0000",
  },
})(Rating);

const iconStyles = { fontSize: "32px" };
const detailIcons = { ...iconStyles, marginRight: "12px" };

const RestaurantDetails = (props) => {
  const { name, location, apiKey, phoneNumber, address, neighbor } = props;
  return (
    <div className={styles.RestaurantDetails}>
      <p>Hoy vamos a comer en...</p>
      <p className={styles.RestaurantDetails__Name}>¡{name}!</p>
      <div style={{ height: "250px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={location}
          defaultZoom={defaultProps.zoom}
        >
          <PinIcon
            className={styles.RestaurantDetails__Pin}
            lat={location.lat}
            lng={location.lng}
          />
        </GoogleMapReact>
      </div>

      <div className={styles.RestaurantDetails__Details}>
        <div className={styles.RestaurantDetails__Details__Ratings}>
          <StyledRating
            name="price-rating"
            value={2.8}
            precision={0.5}
            icon={<AttachMoneyIcon style={iconStyles} />}
            readOnly
          />
          <StyledRating
            name="score"
            value={2}
            precision={0.5}
            icon={<StarIcon style={iconStyles} />}
            readOnly
          />
        </div>
        <div
          className={styles.RestaurantDetails__Details__ContactInfo__Wrapper}
        >
          <div className={styles.RestaurantDetails__Details__ContactInfo}>
            <div
              className={styles.RestaurantDetails__Details__ContactInfo__Phone}
            >
              <PhoneIcon style={detailIcons} />
              {phoneNumber}
            </div>
            <div
              className={
                styles.RestaurantDetails__Details__ContactInfo__Address
              }
            >
              <LocationOnIcon style={detailIcons} />
              <div
                className={
                  styles.RestaurantDetails__Details__ContactInfo__Address__Text
                }
              >
                <span>{address}</span>
                <span>{neighbor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
