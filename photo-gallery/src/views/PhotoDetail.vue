<template>
  <div v-if="photo" class="max-w-4xl mx-auto">
    <div class="mb-6">
      <button
        @click="$router.go(-1)"
        class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        ← Indietro
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        :src="photo.url"
        :alt="photo.fileName"
        class="w-full h-96 object-cover"
      />

      <div class="p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ photo.fileName.split(".")[0] }}
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Info generali -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">
              Informazioni File
            </h3>
            <div class="space-y-2 text-sm">
              <p>
                <span class="font-medium">Nome file:</span> {{ photo.fileName }}
              </p>
              <p>
                <span class="font-medium">Dimensione:</span>
                {{ photo.fileSize }}
              </p>
              <p>
                <span class="font-medium">Data scatto:</span>
                {{ formatDate(photo.exifData.DateTimeOriginal) }}
              </p>
            </div>
          </div>

          <!-- Dati fotocamera -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">Fotocamera</h3>
            <div class="space-y-2 text-sm">
              <p>
                <span class="font-medium">Marca:</span>
                {{ photo.exifData.Make }}
              </p>
              <p>
                <span class="font-medium">Modello:</span>
                {{ photo.exifData.Model }}
              </p>
              <p>
                <span class="font-medium">Software:</span>
                {{ photo.exifData.Software }}
              </p>
            </div>
          </div>

          <!-- Dati scatto -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">Dati di Scatto</h3>
            <div class="space-y-2 text-sm">
              <p>
                <span class="font-medium">Esposizione:</span>
                {{ photo.exifData.exposureData.exposureTime }}
              </p>
              <p>
                <span class="font-medium">Apertura:</span>
                {{ photo.exifData.exposureData.fNumber }}
              </p>
              <p>
                <span class="font-medium">ISO:</span>
                {{ photo.exifData.exposureData.iso }}
              </p>
              <p>
                <span class="font-medium">Lunghezza focale:</span>
                {{ photo.exifData.exposureData.focalLength }}
              </p>
              <p>
                <span class="font-medium">Modalità:</span>
                {{ photo.exifData.exposureData.exposureMode }}
              </p>
              <p>
                <span class="font-medium">Bilanciamento bianco:</span>
                {{ photo.exifData.exposureData.whiteBalance }}
              </p>
            </div>
          </div>

          <!-- Coordinate GPS -->
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">Posizione</h3>
            <div class="space-y-2 text-sm">
              <p>
                <span class="font-medium">Località:</span>
                {{ photo.exifData.gpsCoordinates.location }}
              </p>
              <p>
                <span class="font-medium">Latitudine:</span>
                {{ photo.exifData.gpsCoordinates.latitude }}°
              </p>
              <p>
                <span class="font-medium">Longitudine:</span>
                {{ photo.exifData.gpsCoordinates.longitude }}°
              </p>
              <p>
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
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "PhotoDetail",
  setup() {
    const store = useStore();
    const route = useRoute();

    const photos = computed(() => store.getters.getPhotos);
    const photo = computed(() => {
      const photoId = route.params.id;
      return photos.value.find((p) => p.id === photoId);
    });

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      try {
        // Formato EXIF: "2023:08:15 14:32:18"
        // Convertiamo in formato ISO: "2023-08-15T14:32:18"
        const isoString = dateString.replace(
          /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
          "$1-$2-$3T$4:$5:$6"
        );

        const date = new Date(isoString);

        if (isNaN(date.getTime())) {
          return dateString; // Ritorna la stringa originale se la conversione fallisce
        }

        return date.toLocaleDateString("it-IT", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (error) {
        return dateString; // Ritorna la stringa originale in caso di errore
      }
    };

    return {
      photo,
      formatDate,
    };
  },
};
</script>
