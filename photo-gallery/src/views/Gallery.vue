<template>
  <div class="container m-auto">
    <div v-if="isLoading" class="loading">
      <p>Caricamento foto...</p>
    </div>

    <div v-if="error" class="text-center text-red-600">
      <p>Errore nel caricamento: {{ error }}</p>
    </div>

    <div
      v-if="photos.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <router-link
        v-for="photo in photos"
        :key="photo.id"
        :to="{ name: 'PhotoDetail', params: { id: photo.id } }"
        class="photo"
      >
        <img
          :src="photo.url"
          :alt="photo.fileName"
          class="photo-image"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Gallery",
  setup() {
    const store = useStore();

    const photos = computed(() => store.getters.getPhotos);
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.getError);

    const fetchPhotos = () => {
      store.dispatch("fetchPhotos");
    };

    onMounted(() => {
      fetchPhotos();
    });

    return {
      photos,
      isLoading,
      error,
      fetchPhotos,
    };
  },
};
</script>
