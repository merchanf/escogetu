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
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationCoordinates, setLocationCoordinates] = useState();

  const loadNextPage = () => setPageToken(prePageToken);

  const pop = () =>
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      if (!window.initMap)
        window.initMap = () => {
          setIsLoaded(true);
        };
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&libraries=places&callback=initMap`;
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoaded || isNaN(latitude) || isNaN(longitude)) return;
      if (!window?.google?.maps) return;

      setLocationCoordinates(
        new window.google.maps.LatLng(
          parseFloat(latitude),
          parseFloat(longitude)
        )
      );

      setMap(
        new window.google.maps.Map(document.getElementById("map"), {
          center: locationCoordinates,
          zoom: 15,
        })
      );
    })();
  }, [latitude, longitude, isLoaded]);

  useEffect(() => {
    setLoading(true);
    if (map && locationCoordinates) {
      var request = {
        location: locationCoordinates,
        radius: "2000",
        type: ["restaurant"],
      };

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbySearchCallback);
      setLoading(false);
    }
  }, [map, locationCoordinates]);

  const getDetailsCallback = (results, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    const pictures_ = photos.map((photo) =>
      photo.getUrl({ maxWidth: 1600, maxHeight: 1600 })
    );

    setList((prevState) => [...prevState, { ...result, pictures: pictures_ }]);
  };

  const nearbySearchCallback = (results) => {
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
      service.getDetails(request, (results, _) => {
        getDetailsCallback(results, result);
      });
    });
  };

  return [list, loading, loadNextPage, pop];
};

export default useGetRestaurants;
