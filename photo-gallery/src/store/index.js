import { createStore } from "vuex";
import Photo from "@/models/Photo.js";

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
    ADD_PHOTOS(state, newPhotos) {
      state.photos = [...state.photos, ...newPhotos];
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
    async fetchPhotos({ commit, state }) {
      commit("SET_LOADING", true);
      try {
        const response = await fetch("/src/assets/photos-data.json");
        const photosData = await response.json();

        // convert json data to Photo objects
        const photos = photosData.map((data) => Photo.createFromJSON(data));

        // if there are already photos in the store,
        // add only those from the JSON that are not already present
        if (state.photos.length > 0) {
          const existingIds = state.photos.map((p) => p.id);
          const newPhotos = photos.filter((p) => !existingIds.includes(p.id));
          commit("ADD_PHOTOS", newPhotos);
        } else {
          // if no photos in the store, set all from JSON
          commit("SET_PHOTOS", photos);
        }

        commit("SET_ERROR", null);
      } catch (error) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async uploadPhotos({ commit, state }, imageFiles) {
      commit("SET_LOADING", true);
      try {
        // simulate delay for upload
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // generate unique IDs for new photos
        const maxId =
          state.photos.length > 0
            ? Math.max(...state.photos.map((p) => parseInt(p.id)))
            : 0;

        // convert files to Photo objects using the factory method
        const newPhotos = imageFiles.map((imageData, index) =>
          Photo.createFromUpload(imageData, maxId + index + 1)
        );

        commit("ADD_PHOTOS", newPhotos);
        commit("SET_ERROR", null);
        return newPhotos;
      } catch (error) {
        commit("SET_ERROR", error.message);
        throw error;
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
