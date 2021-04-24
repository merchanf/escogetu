// import { session } from '@services/firebase/firebase';

export const getRestaurants = async ({latitude, longitude}) => {
  new googleMaps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
  }),
  const service = new googleMaps.places.PlacesService(map);
  service.nearbySearch(request, (results) => {
    console.log(results)
    const nearbyRestaurants = nearbySearchCallback(results);
    setList(nearbyRestaurants);
    setLoading(false);
  });
};
