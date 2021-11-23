export const UserStore = {
  userUid: null,
  sessionId: null,
  match: null,
  likes: {},
  flow: null,
  geoLocation: {
    location: {
      latitude: null,
      longitude: null,
    },
    loading: false,
  },
  firestore: {
    zone: null,
  },
};

export const USER_SECTION_NAME = 'user';
