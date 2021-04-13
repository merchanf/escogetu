import { createRef, useState, useEffect } from "react";
import { distance } from "../utils/utils";

import useGoogleMaps from "./useGoogleMaps";

const domain = process.env.DOMAIN;
const defaultRadius = 1500;

const useGetRestaurants = (latitude, longitude, googleMaps) => {
  const [loading, setLoading] = useState(true);
  const [tempList, setTempList] = useState([]);
  const [tempLength, setTempLength] = useState();
  const [list, setList] = useState();
  const [prePageToken, setPrePageToken] = useState();
  const [pageToken, setPageToken] = useState();
  const [map, setMap] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();

  const loadNextPage = () => setPageToken(prePageToken);

  const pop = () =>
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });

  useEffect(() => {
    if (!googleMaps || isNaN(latitude) || isNaN(longitude)) return;
    setLocationCoordinates(
      new googleMaps.LatLng(parseFloat(latitude), parseFloat(longitude))
    );

    setMap(
      new googleMaps.Map(document.getElementById("map"), {
        center: locationCoordinates,
        zoom: 15,
      })
    );
  }, [latitude, longitude, googleMaps]);

  useEffect(() => {
    if (map && locationCoordinates) {
      var request = {
        location: locationCoordinates,
        radius: defaultRadius,
        type: ["restaurant"],
      };

      const service = new googleMaps.places.PlacesService(map);
      service.nearbySearch(request, nearbySearchCallback);
    }
  }, [map, locationCoordinates]);

  const getDetailsCallback = (results, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    const pictures_ = photos.map((photo) =>
      photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })
    );

    setTempList((prevState) => [
      ...prevState,
      { ...result, pictures: pictures_ },
    ]);
  };

  const nearbySearchCallback = (results) => {
    const mappedResults = results
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
            ref: createRef(),
          };

          setTempList((prevState) => [
            ...prevState,
            { ...result, pictures: pictures_ },
          ]);
        }
      )
      .filter((result) => result != null);
      setList([...mappedResults])
      setLoading(false);
  };

  return [list, loading, loadNextPage, pop];
};

export default useGetRestaurants;
