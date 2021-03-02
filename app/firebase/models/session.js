import firebase from "../config";

const session = {
  create: async (userUid, position) => {
    const { db } = firebase;
    const docRef = db.collection("session").doc();
    docRef.set({
      [userUid]: [],
      users: [userUid],
      location: position,
    });
    return docRef.id;
  },
  deleteLikedItem: async (sessionId, userUid, itemToDelete) => {
    const { db } = firebase;
    const query = db.doc(`session/${sessionId}`);
    try {
      let document = await query.get();
      if (document) {
        const liked = document.data()[userUid];
        await query.set(
          { [userUid]: liked.filter((item) => item !== itemToDelete) },
          { merge: true }
        );
      }
    } catch (e) {
      console.log(e);
    }
  },
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
  like: async (sessionId, userUid, likedItem) => {
    const { db } = firebase;
    const query = db.doc(`session/${sessionId}`);
    try {
      let document = await query.get();
      if (document) {
        const liked = document.data()[userUid];
        await query.set({ [userUid]: [...liked, likedItem] }, { merge: true });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

export default session;
