import RestaurantDetails from "./RestaurantDetails";

export default {
  component: RestaurantDetails,
  title: "RestaurantDetails",
};

const props = {
  apiKey: "AIzaSyB6UMb2CgplkVuv980ICp1Acc-C5czk-Oc",
  address: "Cra 28 # 34 - 20",
  location: { lat: 4.647458649366639, lng: -74.10329314096099 },
  name: "Hamburguesas el corral",
  neighbor: "Usaquen",
  phoneNumber: "3125107300",
  priceLevel: 3,
  rating: 3.5,
};

export const Default = () => <RestaurantDetails {...props} />;
