import { createRef, useState, useEffect } from "react";
import { distance } from "../utils/utils";

import useGoogleMaps from "./useGoogleMaps";

const useGetRestaurants = (latitude, longitude, googleMaps) => {
  const defaultRadius = 2500;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [map, setMap] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();

  const nearbySearchCallback = (results) => {
    return results
      .map(
        ({
          place_id,
          name,
          photos,
          geometry: {
            location: { lat, lng },
          },ß
        }) => {
          if (!photos) return null;
          return {
            placeId: place_id,
            name: name,
            distance: distance(latitude, longitude, lat(), lng()),
            pictures: photos.map((photo) =>
              photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })
            ),
            ref: createRef(),
          };
        }
      )
      .filter((result) => result != null);
  };

  useEffect(() => {
    if (!googleMaps || isNaN(latitude) || isNaN(longitude)) return;
    const location = new googleMaps.LatLng(
      parseFloat(latitude),
      parseFloat(longitude)
    );
    setLocationCoordinates(location);
    setMap(
      new googleMaps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
      })
    );
  }, [latitude, longitude, googleMaps]);

  useEffect(() => {
    if (!map || !locationCoordinates) return;
    var request = {
      location: locationCoordinates,
      radius: defaultRadius,
      type: ["restaurant"],
    };

    const service = new googleMaps.places.PlacesService(map);
    service.nearbySearch(request, (results) => {
      const nearbyRestaurants = nearbySearchCallback(results);
      setList(nearbyRestaurants);
      setLoading(false);
    });

  }, [map, locationCoordinates]);

  return [list, loading];
};

export default useGetRestaurants;
