export const UserStore = {
  userUid: null,
  sessionId: null,
  match: null,
  likes: {},
  geoLocation: {
    location: {
      latitude: null,
      longitude: null,
    },
    loading: true,
  },
};

export const USER_SECTION_NAME = 'user';
