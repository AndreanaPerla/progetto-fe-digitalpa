<template>
  <!-- full page loader -->
  <div v-if="isLoading" class="fullpage-loader">
    <div class="loader-content">
      <div class="spinner"></div>
      <p class="loader-text">Caricamento foto...</p>
    </div>
  </div>

  <!-- main content -->
  <div v-else class="container m-auto">
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
        <div class="photo-container">
          <img
            :src="photo.url"
            :alt="photo.fileName"
            class="photo-image"
            loading="lazy"
            @load="handleImageLoad"
            @error="handleImageError"
          />
          <div class="photo-placeholder">
            <span class="material-icons">image</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- empty state if there are no photos -->
    <div v-if="!isLoading && photos.length === 0 && !error" class="empty-state">
      <span class="material-icons empty-icon">photo_library</span>
      <p class="empty-text">Nessuna foto disponibile</p>
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

    const handleImageLoad = (event) => {
      const img = event.target;
      const placeholder = img.nextElementSibling;

      img.classList.add("loaded");
      if (placeholder) {
        placeholder.style.display = "none";
      }
    };

    const handleImageError = (event) => {
      const img = event.target;
      const placeholder = img.nextElementSibling;

      img.style.display = "none";
      if (placeholder) {
        placeholder.innerHTML =
          '<span class="material-icons">broken_image</span>';
        placeholder.classList.add("error");
      }
    };

    onMounted(() => {
      fetchPhotos();
    });

    return {
      photos,
      isLoading,
      error,
      fetchPhotos,
      handleImageLoad,
      handleImageError,
    };
  },
};
</script>
