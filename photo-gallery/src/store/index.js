import { createStore } from "vuex";

export default createStore({
  state: {
    photos: [],
    loading: false,
    error: null,
    sidebarOpen: false,
  },
  mutations: {
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SIDEBAR_OPEN(state, isOpen) {
      state.sidebarOpen = isOpen;
    },
  },
  actions: {
    async fetchPhotos({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await fetch("/src/assets/photos-data.json");
        const photos = await response.json();
        commit("SET_PHOTOS", photos);
        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    getPhotos: (state) => state.photos,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});
