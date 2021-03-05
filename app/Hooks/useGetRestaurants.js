import { createRef, useState, useEffect } from "react";
import axios from "axios";
import { distance } from "../utils/utils";

const nearbyRestaurantsEndpoint = (lat, long, radius, key, pageToken) =>
  `${domain}/api/nearbysearch?&lat=${lat}&lng=${long}&radius=${radius}&type=restaurant&key=${key}&` +
  (pageToken ? `pagetoken=${pageToken}` : "");

const placePhotoSrc = (photoreference) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${gMapsApiKey}&photoreference=${photoreference}&maxheight=${1600}`;

const getPlaceDetailsEndpoint = (placeId) =>
  `${domain}/api/placeDetails?firstParameter=firstparam&key=${gMapsApiKey}&place_id=${placeId}`;

const domain = process.env.DOMAIN;
const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const defaultRadius = 2500;

const useGetRestaurants = (latitude, longitude) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [prePageToken, setPrePageToken] = useState();
  const [pageToken, setPageToken] = useState();

  const loadNextPage = () => setPageToken(prePageToken);

  const pop = () =>
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (!latitude || !longitude) return;
      const request = nearbyRestaurantsEndpoint(
        latitude,
        longitude,
        defaultRadius,
        gMapsApiKey,
        pageToken
      );
      console.log(request);
      const {
        data: { results, next_page_token },
      } = await axios.get(request);
      setPrePageToken(next_page_token);
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
              distance: distance(latitude, longitude, lat, lng),
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

        const results = await axios.get(
          getPlaceDetailsEndpoint(result.placeId)
        );
        console.log(results);

        const pictures_ = photos.map(({ photo_reference, height }) =>
          placePhotoSrc(photo_reference, height)
        );

        setList((prevState) => [
          ...prevState,
          { ...result, pictures: pictures_ },
        ]);
      });
      setLoading(false);
    })();
  }, [latitude, longitude, pageToken]);

  return [list, loading, loadNextPage, pop];
};

export default useGetRestaurants;
