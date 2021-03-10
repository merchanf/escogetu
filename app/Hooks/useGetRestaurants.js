import { createRef, useState, useEffect } from "react";
import axios from "axios";
import { distance } from "../utils/utils";

const nearbyRestaurantsEndpoint = (lat, long, radius, key, pageToken) =>
  `${domain}/api/nearbysearch?&lat=${lat}&lng=${long}&radius=${radius}&type=restaurant&key=${key}&` +
  (pageToken ? `pagetoken=${pageToken}` : "");

const placePhotoSrc = (photoreference) =>
  `${domain}/api/placePhotos?key=${gMapsApiKey}&photoreference=${photoreference}&maxheight=${1600}`;

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
  const [map, setMap] = useState();

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
      /* const db = results
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

        const pictures_ = photos.map(async ({ photo_reference, height }) => {
          const request = placePhotoSrc(photo_reference, height);
          const {
            data: { src },
          } = await axios.get(request);
          return src;
        });

        setList((prevState) => [
          ...prevState,
          { ...result, pictures: pictures_ },
        ]);
      });
      */
      setLoading(false);
    })();
  }, [latitude, longitude, pageToken]);

  useEffect(() => {
    var locationCoordinates = new window.google.maps.LatLng(
      latitude,
      longitude
    );

    setMap(
      new window.google.maps.Map(document.getElementById("map"), {
        center: locationCoordinates,
        zoom: 15,
      })
    );

    var request = {
      location: locationCoordinates,
      radius: "2000",
      type: ["restaurant"],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }, [latitude, longitude]);

  const callback2 = (results, status, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    const pictures_ = photos.map((photo) =>
      photo.getUrl({ maxWidth: 1600, maxHeight: 1600 })
    );

    setList((prevState) => [...prevState, { ...result, pictures: pictures_ }]);
  };

  const callback = (results, status) => {
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
            distance: distance(latitude, longitude, lat(), lng()),
            pictures: photos.map((photo) =>
              photo.getUrl({ maxWidth: 1600, maxHeight: 1600 })
            ),
            ref: createRef(),
          };
        }
      )
      .filter((result) => result != null);

    db.forEach(async (result) => {
      var request = {
        placeId: result.placeId,
        fields: ["photos"],
      };

      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails(request, (results, status, result) =>
        callback2(results, status, result)
      );
    });
  };

  return [list, loading, loadNextPage, pop];
};

export default useGetRestaurants;
