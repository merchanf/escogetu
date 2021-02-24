import RestaurantDetails from "./RestaurantDetails";

export default {
  component: RestaurantDetails,
  title: "RestaurantDetails",
};

const props = {
  name: "Hamburguesas el corral",
  apiKey: "AIzaSyB6UMb2CgplkVuv980ICp1Acc-C5czk-Oc",
  location: { lat: 4.647458649366639, lng: -74.10329314096099 },
  phoneNumber: "3125107300",
  address: "Cra 28 # 34 - 20",
  neighbor: "Usaquen",
};

export const Default = () => <RestaurantDetails {...props} />;
