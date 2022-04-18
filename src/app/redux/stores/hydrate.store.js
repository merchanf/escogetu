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
  },
  hydrating: true,
};

export const HYDRATE_SECTION_NAME = 'hydrate';
