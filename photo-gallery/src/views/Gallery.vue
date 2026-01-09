<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">galleria immagini</h1>
    <!-- <h1 class="text-3xl font-bold text-gray-800 mb-6">Galleria Fotografica</h1>

    <div v-if="isLoading" class="text-center">
      <p class="text-lg text-gray-600">Caricamento foto...</p>
    </div>

    <div v-if="error" class="text-center text-red-600">
      <p>Errore nel caricamento: {{ error }}</p>
    </div>

    <div
      v-if="photos.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <router-link
        v-for="photo in photos"
        :key="photo.id"
        :to="{ name: 'PhotoDetail', params: { id: photo.id } }"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer block"
      >
        <img
          :src="photo.url"
          :alt="photo.fileName"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-sm font-semibold text-gray-800 truncate">
            {{ photo.fileName.split(".")[0] }}
          </h3>
          <p class="text-xs text-gray-600 mt-1">{{ photo.fileSize }}</p>
        </div>
      </router-link>
    </div> -->
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
