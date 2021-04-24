export const getGeoLocation = async () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (err) => reject(err),
    ),
  );
