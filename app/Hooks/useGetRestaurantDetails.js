import { useState, useEffect } from "react";
import axios from "axios";

import useGoogleMaps from "./useGoogleMaps";

const getPlaceDetailsEndpoint = (placeId) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${gMapsApiKey}&place_id=${placeId}`;

const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const useGetRestaurantDetails = (placeId) => {
  const googleMaps = useGoogleMaps();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [map, setMap] = useState();

  useEffect(() => {
    (async () => {
      if (!googleMaps) return;

      setMap(
        new googleMaps.Map(document.getElementById("map"), {
          zoom: 15,
        })
      );
    })();
  }, [googleMaps]);

  const getDetailsCallback = (result, status) => {
    console.log('result', result);
    console.log('status', status);
  }

  useEffect(() => {
    (async () => {
      if (!placeId || !googleMaps) return;
      setLoading(true);

      var request = {
        placeId: placeId,
        // fields: ["international_phone_number", "name", "rating", "vicinity", "geometry", "price_level"],
        fields: ["name"],
      };
      console.log("entra");
      const service = new googleMaps.places.PlacesService(map);
      service.getDetails(request, getDetailsCallback);

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
  }, [placeId, googleMaps]);

  return [loading, details];
};

export default useGetRestaurantDetails;
