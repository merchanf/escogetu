import { useEffect, useState } from "react";
import useGetRestaurants from "./useGetRestaurants";

const useDeck = (latitude, longitude, googleMaps) => {
  const [restaurantList, loadingRestaurantList ] = useGetRestaurants(
    latitude,
    longitude,
    googleMaps
  );
  const [list, setList] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!googleMaps || isNaN(latitude) || isNaN(longitude)) return;
    const location = new googleMaps.LatLng(
      parseFloat(latitude),
      parseFloat(longitude)
    );
    setMap(
      new googleMaps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
      })
    );
  }, [latitude, longitude, googleMaps]);

  const getPictures = (results, result) => {
    if (!results?.photos) return;
    const { photos } = results;

    return photos.map((photo) =>
      photo.getUrl({ maxWidth: 1080, maxHeight: 1920 })
    );
  };

  useEffect(() => {
    if (loadingRestaurantList) return;
    restaurantList.forEach((item) => {
      var request = {
        placeId: item.placeId,
        fields: ["photos"],
      };
      const service = new googleMaps.places.PlacesService(map);
      service.getDetails(request, (results) => {
        const pictures = getPictures(results);
        if(pictures){
          setList((prevState) => {
            prevState.push({ ...item, pictures: pictures });
            return [ ...prevState];
          });
        }else{
          setList((prevState) => {
            prevState.push({ ...item });
            return [ ...prevState];
          });
        }
      });
    });
  }, [loadingRestaurantList, restaurantList]);
 
  useEffect(()=>{
    if(loadingRestaurantList) return;
    if(list.length === restaurantList.length)
      setLoadingPhotos(false);
  }, [loadingRestaurantList, list, restaurantList])

  const loading = loadingRestaurantList || loadingPhotos;
  return [loading, list];
};

export default useDeck;
