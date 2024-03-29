export const HydrateStore = {
  googleMaps: {
    loading: false,
    client: null,
    error: null,
    googleMaps: null,
  },
  firebase: {
    loading: true,
    error: null,
    storage: null,
  },
  application: {
    restaurants: {},
    loading: false,
    newBatch: true,
    noMoreRestaurants: false,
    instructionsAlreadyShown: false,
  },
  hydrating: true,
};

export const HYDRATE_SECTION_NAME = 'hydrate';
