import { createRef, useState, useEffect } from "react";
import axios from "axios";
import { distance } from "../utils/utils";

const nearbyRestaurantsEndpoint = (lat, long, radius, key) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=restaurant&key=${key}`;

const placePhotoSrc = (photoreference, maxheight = 16000) =>
  `https://maps.googleapis.com/maps/api/place/photo?key=${gMapsApiKey}&photoreference=${photoreference}&maxheight=${1600}`;

const getPlaceDetailsEndpoint = (placeId) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${gMapsApiKey}&place_id=${placeId}`;

const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const defaultRadius = 2500;

const useGetRestaurants = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLong = position.coords.longitude;
        const {
          data: { results },
        } = await axios.get(
          nearbyRestaurantsEndpoint(
            userLat,
            userLong,
            defaultRadius,
            gMapsApiKey
          )
        );

        const db = results
          .map(
            ({
              place_id,
              name,
              photos,
              geometry: {
                location: { lat, lng },
              },
            }) => {
              if (!photos) return null;
              return {
                placeId: place_id,
                name: name,
                distance: distance(userLat, userLong, lat, lng),
                pictures: photos.map(({ photo_reference, height }) =>
                  placePhotoSrc(photo_reference, height)
                ),
                ref: createRef(),
              };
            }
          )
          .filter((result) => result != null);

        db.forEach(async (result) => {
          const {
            data: {
              result: { photos },
            },
          } = await axios.get(getPlaceDetailsEndpoint(result.placeId));

          const pictures_ = photos.map(({ photo_reference, height }) =>
            placePhotoSrc(photo_reference, height)
          );

          setList((prevState) => [
            ...prevState,
            { ...result, pictures: pictures_ },
          ]);
        });
        setLoading(false);
      },
      () => console.log("Denied")
    );
  }, []);

  return [list, loading];
};

export default useGetRestaurants;
