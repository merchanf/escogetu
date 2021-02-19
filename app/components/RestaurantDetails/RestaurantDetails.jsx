import styles from "./RestaurantDetails.module.scss";

const RestaurantDetails = ({ name, location }) => {
  return (
    <div className={styles.RestaurantDetails}>
      <p>Hoy vamos a comer en...</p>
      <p className={styles.RestaurantDetails__Name}>¡{name}!</p>
      <div>
        <div>Placeholder for price</div>
        <div>Placeholder for stars</div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
