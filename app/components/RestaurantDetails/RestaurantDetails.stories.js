import RestaurantDetails from "./RestaurantDetails";

export default {
  component: RestaurantDetails,
  title: "RestaurantDetails",
};

const props = {
  name: "Hamburguesas el corral",
};

export const Default = () => <RestaurantDetails {...props} />;
