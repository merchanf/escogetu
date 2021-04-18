import { createRef, useState, useEffect } from "react";
import { distance } from "../utils/utils";

import useGoogleMaps from "./useGoogleMaps";

const useGetRestaurants = (latitude, longitude, googleMaps, map, locationCoordinates) => {
  const defaultRadius = 2500;
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const pop = () => {
    const item = list.length > 0 ? list[0] : null;
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });
    return item;
  }

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

  return [list, loading, pop];
};

export default useGetRestaurants;
