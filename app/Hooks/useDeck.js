import { useEffect, useState } from "react";
import useGetRestaurants from "./useGetRestaurants";

const useDeck = (latitude, longitude, googleMaps) => {
  const initialCardsAmount = 4;
  const [list, setList] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [map, setMap] = useState();
  const [locationCoordinates, setLocationCoordinates] = useState();
  const [currentItem, setCurrentItem] = useState(initialCardsAmount);
  const [ service, setService] = useState();
  const [
    restaurantList,
    loadingRestaurantList,
    popFromRestaurantList,
  ] = useGetRestaurants(
    latitude,
    longitude,
    googleMaps,
    map,
    locationCoordinates
  );

  const getPictures = (results, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    return photos.map((photo) =>
      photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })
    );
  };
  
  const pop = () => {
    const item = popFromRestaurantList();
    setList((prevState) => {
      prevState.shift();
      return prevState;
    });
    push(item);
  }

  const push = (item) => {
    if(!service) return;
    const { placeId } = item;
    var request = {
      placeId: placeId,
      fields: ["photos"],
    };

    service.getDetails(request, (results) => {
      const pictures = getPictures(results);
      if (pictures) {
        setList((prevState) => {
          prevState.push({ ...item, pictures: pictures });
          return [...prevState];
        });
      } else {
        setList((prevState) => {
          prevState.push({ ...item });
          return [...prevState];
        });
      }
    });
  }

  useEffect(() => {
    if(!googleMaps && !map) return;
    setService(new googleMaps.places.PlacesService(map));
  }, [googleMaps, map])

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
    if (loadingRestaurantList && !service) return;
    const length =
      restaurantList.length < initialCardsAmount
        ? restaurantList.length
        : initialCardsAmount;
    for (let i = 0; i < length; i++) {
      const item = restaurantList[i];

      var request = {
        placeId: item.placeId,
        fields: ["photos"],
      };

      service.getDetails(request, (results) => {
        const pictures = getPictures(results);
        if (pictures) {
          setList((prevState) => {
            prevState.push({ ...item, pictures: pictures });
            return [...prevState];
          });
        } else {
          setList((prevState) => {
            prevState.push({ ...item });
            return [...prevState];
          });
        }
      });
      popFromRestaurantList();
    }
  }, [loadingRestaurantList, restaurantList, service]);

  useEffect(() => {
    if (loadingRestaurantList) return;
    if (
      list.length === restaurantList.length ||
      list.length === initialCardsAmount
    )
      setLoadingPhotos(false);
  }, [loadingRestaurantList, list, restaurantList]);

  const loading = loadingRestaurantList || loadingPhotos;
  return [loading, list, pop];
};

export default useDeck;
