import firebaseInstance from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};


const app = !firebaseInstance.apps.length
    ? firebaseInstance.initializeApp(config)
    : firebaseInstance.app();

const analytics = firebaseInstance.analytics;
const db = app.firestore();


export const createSession = async (userUid, position) =>
    new Promise((resolve) => {
        db.collection("session").add({
            users: [userUid],
            location: position,
            likedRestaurants: [],
        }).then((docRef) => {
            resolve(docRef.id);
        });
    });

export const getSession = async (sessionId) =>
    new Promise((resolve, reject) => {
        let docRef = db.collection("session").doc(sessionId);
        docRef.get().then(doc => {
            if (doc.exists) {
                resolve(doc.data());
            } else {
                resolve(undefined);
            }
        }).catch(reason => {
            reject(reason);
        });
    });

export const likedRestaurant = async (sessionId, restaurantID) =>
    new Promise((resolve, reject) => {
        let docRef = db.collection("session").doc(sessionId.toString());
        docRef.get().then(doc => {
            let storedDoc;
            if (doc.exists) {
                storedDoc = doc.data();
                if (doc.data().likedRestaurants.length > 0) {
                    storedDoc.likedRestaurants = storedDoc.likedRestaurants.map(rest => {
                        if (rest.id === restaurantID) {
                            rest.likes = rest.likes + 1;
                        }
                        return rest;
                    });
                } else {
                    storedDoc.likedRestaurants = [...storedDoc.likedRestaurants,{id: restaurantID, likes: 1}];
                }
            }
            resolve(docRef.set(
                storedDoc,
                {merge: true}));
            reject(`No info for sessionId: ${sessionId}`);
        }).catch(reason => {
            reject(reason);
        });
    });

