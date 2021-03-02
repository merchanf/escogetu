import firebase from "../config";

const session = {
  load: async (userUid, session) => {
    const { db } = firebase;
    const docRef = db.doc(`session/${session}`);
    try {
      let document = await docRef.get();
      if (document) {
        const fsPosition = document.data().location;
        const users = document.data().users;
        docRef.set(
          {
            [userUid]: [],
            users: [...users, userUid],
          },
          { merge: true }
        );
        return {
          lat: fsPosition.lat,
          lng: fsPosition.lng,
        };
      }
    } catch (e) {
      console.log(e);
    }
  },
};

export default session;
