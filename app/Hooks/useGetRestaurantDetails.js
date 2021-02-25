import { useState, useEffect } from "react";
import axios from "axios";

const getPlaceDetailsEndpoint = (placeId) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${gMapsApiKey}&place_id=${placeId}`;

const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const useGetRestaurantDetails = (placeId) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();

  useEffect(() => {
    (async () => {
      if (!placeId) return;
      setLoading(true);
      const {
        data: { result },
      } = await axios.get(getPlaceDetailsEndpoint(placeId));
      const {
        international_phone_number,
        name,
        rating,
        vicinity,
        geometry: { location },
        price_level,
      } = result;
      setDetails({
        address: vicinity,
        location: location,
        name: name,
        rating: rating,
        phoneNumber: international_phone_number,
        priceLevel: price_level,
      });

      setLoading(false);
    })();
  }, [placeId]);

  return [loading, details];
};

export default useGetRestaurantDetails;
