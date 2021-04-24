// import { session } from '@services/firebase/firebase';

export const getGeoLocation = async (userUid) => {
  // const urlParams = new URLSearchParams(window.location.search);
  // const sessionParam = urlParams.get('session');
  // if (sessionParam) {
  //   setSessionId(sessionParam);
  //   const { lat, lng } = await session.load(userUid, sessionParam);
  //   return {
  //     latitude: lat,
  //     longitude: lng,
  //   };
  // }
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (err) => reject(err),
    ),
  );
};
