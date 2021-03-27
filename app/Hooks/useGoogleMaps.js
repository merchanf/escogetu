import { useEffect, useState } from 'react';

const useGoogleMaps = () => {
  const [googleMaps, setGoogleMaps]= useState();
  const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

  const initMap = () => {
    setGoogleMaps(window.google.maps);
  }

  useEffect(() => {
    const element = document.querySelector('#google-maps-api');
    if (!element) {
      if (!window.initMap)
        window.initMap = initMap;
      const script = document.createElement("script");
      script.id = "google-maps-api"
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&libraries=places&callback=initMap`;
      document.body.appendChild(script);
    }
  }, [googleMaps]);

  return googleMaps;
}

export default useGoogleMaps;