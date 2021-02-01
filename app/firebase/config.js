import firebaseInstance from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD0un4B6cbX4kdwn79hLascmH3HTeQqU-U",
  authDomain: "pullet-d.firebaseapp.com",
  databaseURL: "https://pullet-d.firebaseio.com",
  projectId: "pullet-d",
  storageBucket: "pullet-d.appspot.com",
  messagingSenderId: "531961506451",
  appId: "1:531961506451:web:6c2ae081a0402795"
};

const firebase = (() => {
  const app = !firebaseInstance.apps.length
    ? firebaseInstance.initializeApp(config)
    : firebaseInstance.app();

  const auth = app.auth();
  const firestore = app.firestore();
  firestore.enablePersistence({ synchronizeTabs: true }).catch(err => {
    if (err.code === "unimplemented")
      console.log("La aplicación no es compatible con este navegador");
  });

  return { firebase: app, auth: auth, db: firestore };
})();

export default firebase;
