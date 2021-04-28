export const HydrateStore = {
  googleMaps: {
    loading: true,
    client: null,
    error: null,
    googleMaps: null,
  },
  firebase: {
    loading: true,
    instance: null,
    database: null,
    error: null,
  },
};

export const HYDRATE_SECTION_NAME = 'hydrate';
