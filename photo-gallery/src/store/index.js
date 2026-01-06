import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    photos: [],
    loading: false,
    error: null,
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
  },
  actions: {
    async fetchPhotos({ commit }) {
      commit("SET_LOADING", true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos?_limit=20"
        );
        commit("SET_PHOTOS", response.data);
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
