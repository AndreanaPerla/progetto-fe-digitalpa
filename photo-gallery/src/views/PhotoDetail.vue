<template>
  <!-- full page loader -->
  <div v-if="isLoading" class="fullpage-loader">
    <div class="loader-content">
      <div class="spinner"></div>
      <p class="loader-text">Caricamento foto...</p>
    </div>
  </div>

  <!-- photo content -->
  <div v-else-if="photo" class="container m-auto">
    <div class="mb-6">
      <button @click="$router.go(-1)" class="back-btn">← Indietro</button>
    </div>

    <div class="photo-card">
      <div class="photo-image-container">
        <img
          :src="photo.url"
          :alt="photo.fileName"
          class="photo-detail-image"
          @load="handleImageLoad"
          @error="handleImageError"
        />
        <div class="photo-image-placeholder" v-if="imageLoading">
          <div class="image-spinner"></div>
        </div>
      </div>

      <div class="photo-details">
        <h1 v-if="photo.fileName" class="photo-title mb-4">
          {{ photo.fileName.split(".")[0] }}
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- info -->
          <div>
            <h3 class="mid-title mb-2">Informazioni File</h3>
            <div class="details">
              <p v-if="photo.fileName">
                <span class="font-medium">Nome file:</span> {{ photo.fileName }}
              </p>
              <p v-if="photo.fileSize">
                <span class="font-medium">Dimensione:</span>
                {{ photo.fileSize }}
              </p>
              <p v-if="photo.exifData?.DateTimeOriginal">
                <span class="font-medium">Data scatto:</span>
                {{ formatDate(photo.exifData.DateTimeOriginal) }}
              </p>
            </div>
          </div>

          <!-- camera data -->
          <div
            v-if="
              photo.exifData?.Make ||
              photo.exifData?.Model ||
              photo.exifData?.Software
            "
          >
            <h3 class="mid-title mb-2">Fotocamera</h3>
            <div class="details">
              <p v-if="photo.exifData?.Make">
                <span class="font-medium">Marca:</span>
                {{ photo.exifData.Make }}
              </p>
              <p v-if="photo.exifData?.Model">
                <span class="font-medium">Modello:</span>
                {{ photo.exifData.Model }}
              </p>
              <p v-if="photo.exifData?.Software">
                <span class="font-medium">Software:</span>
                {{ photo.exifData.Software }}
              </p>
            </div>
          </div>

          <!-- exposure data -->
          <div v-if="photo.exifData?.exposureData">
            <h3 class="mid-title mb-2">Dati di Scatto</h3>
            <div class="details">
              <p v-if="photo.exifData.exposureData.exposureTime">
                <span class="font-medium">Esposizione:</span>
                {{ photo.exifData.exposureData.exposureTime }}
              </p>
              <p v-if="photo.exifData.exposureData.fNumber">
                <span class="font-medium">Apertura:</span>
                {{ photo.exifData.exposureData.fNumber }}
              </p>
              <p v-if="photo.exifData.exposureData.iso">
                <span class="font-medium">ISO:</span>
                {{ photo.exifData.exposureData.iso }}
              </p>
              <p v-if="photo.exifData.exposureData.focalLength">
                <span class="font-medium">Lunghezza focale:</span>
                {{ photo.exifData.exposureData.focalLength }}
              </p>
              <p v-if="photo.exifData.exposureData.exposureMode">
                <span class="font-medium">Modalità:</span>
                {{ photo.exifData.exposureData.exposureMode }}
              </p>
              <p v-if="photo.exifData.exposureData.whiteBalance">
                <span class="font-medium">Bilanciamento bianco:</span>
                {{ photo.exifData.exposureData.whiteBalance }}
              </p>
            </div>
          </div>

          <!-- GPS coordinates -->
          <div
            v-if="
              photo.exifData?.gpsCoordinates &&
              (photo.exifData.gpsCoordinates.location ||
                photo.exifData.gpsCoordinates.latitude ||
                photo.exifData.gpsCoordinates.longitude)
            "
          >
            <h3 class="mid-title mb-2">Posizione</h3>
            <div class="details">
              <p v-if="photo.exifData.gpsCoordinates.location">
                <span class="font-medium">Località:</span>
                {{ photo.exifData.gpsCoordinates.location }}
              </p>
              <p v-if="photo.exifData.gpsCoordinates.latitude">
                <span class="font-medium">Latitudine:</span>
                {{ photo.exifData.gpsCoordinates.latitude }}°
              </p>
              <p v-if="photo.exifData.gpsCoordinates.longitude">
                <span class="font-medium">Longitudine:</span>
                {{ photo.exifData.gpsCoordinates.longitude }}°
              </p>
              <p v-if="photo.exifData.gpsCoordinates.altitude">
                <span class="font-medium">Altitudine:</span>
                {{ photo.exifData.gpsCoordinates.altitude }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center">
    <p class="text-lg text-gray-600">Foto non trovata</p>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "PhotoDetail",
  setup() {
    const store = useStore();
    const route = useRoute();
    const imageLoading = ref(true);

    const photos = computed(() => store.getters.getPhotos);
    const storeLoading = computed(() => store.getters.isLoading);

    const photo = computed(() => {
      const photoId = route.params.id;
      return photos.value.find((p) => p.id === photoId);
    });

    const isLoading = computed(() => {
      return storeLoading.value || photos.value.length === 0;
    });

    const handleImageLoad = () => {
      imageLoading.value = false;
    };

    const handleImageError = () => {
      imageLoading.value = false;
    };

    // Reset image loading quando cambia foto
    watch(
      () => route.params.id,
      () => {
        imageLoading.value = true;
      }
    );

    // Assicurati che le foto siano caricate
    onMounted(() => {
      if (photos.value.length === 0) {
        store.dispatch("fetchPhotos");
      }
    });

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      try {
        // EXIF format: "2023:08:15 14:32:18"
        // convert in ISO: "2023-08-15T14:32:18"
        const isoString = dateString.replace(
          /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
          "$1-$2-$3T$4:$5:$6"
        );

        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
          return dateString; // return the original string if the conversion fails
        }

        return date.toLocaleDateString("it-IT", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        return dateString; // return the original string in case of error
      }
    };

    return {
      photo,
      isLoading,
      imageLoading,
      handleImageLoad,
      handleImageError,
      formatDate,
    };
  },
};
</script>
