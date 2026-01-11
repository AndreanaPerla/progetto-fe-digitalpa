<template>
  <div class="container mx-auto">
    <div class="text-center mb-8">
      <p class="title">Seleziona le tue foto da caricare nella galleria.</p>
    </div>

    <!-- form -->
    <div class="upload-form-container mb-8">
      <div class="upload-form">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileSelect"
          multiple
          accept="image/*"
          class="hidden"
          id="imageUpload"
        />
        <label for="imageUpload" class="cursor-pointer">
          <div class="upload-instructions">
            <span class="material-icons mx-auto text-6xl"> cloud_upload </span>
            <p class="font-medium">Clicca per selezionare le immagini</p>
            <p class="mt-2">o trascina i file qui</p>
            <p class="mt-3">Formati supportati: JPG, PNG, SVG, GIF, WEBP</p>
          </div>
        </label>
      </div>

      <div v-if="selectedImages.length > 0" class="mt-4">
        <div class="upload-remove my-2">
          <p>{{ selectedImages.length }} immagini selezionate</p>
          <button @click="clearSelection" class="text-red-600">
            Rimuovi tutte
          </button>
        </div>
      </div>
    </div>

    <!-- grid of selected images -->
    <div v-if="selectedImages.length > 0" class="upload-form-container">
      <h3 class="photo-title mb-4">Anteprima immagini</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(image, index) in selectedImages"
          :key="index"
          class="relative group"
        >
          <img :src="image.url" :alt="image.name" class="upload-photo" />
          <button
            @click="removeImage(index)"
            class="remove-btn bg-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-700"
          >
            ×
          </button>
          <p class="upload-name mt-1">{{ image.name }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <button
          @click="uploadImages"
          class="blue-btn"
          :disabled="isLoading || isUploading"
          :class="{ 'opacity-50 cursor-not-allowed': isLoading || isUploading }"
        >
          <span v-if="isLoading || isUploading" class="flex items-center gap-2">
            <span class="material-icons animate-spin text-base">sync</span>
            Caricamento in corso...
          </span>
          <span v-else> Carica {{ selectedImages.length }} immagini </span>
        </button>
      </div>
    </div>

    <!-- loading overlay durante l'upload -->
    <div v-if="isLoading || isUploading" class="loading-overlay">
      <div class="loading-box">
        <span class="material-icons animate-spin mx-auto mb-4"> sync </span>
        <p class="upload-name font-medium">Caricamento immagini in corso...</p>
        <p class="upload-name mt-1">
          Attendere, sarai reindirizzato alla galleria
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Upload",
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedImages = ref([]);
    const isUploading = ref(false);

    const isLoading = computed(() => store.getters.isLoading);

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files);

      // only keep image files
      const imageFiles = files.filter((file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
          console.warn(`File "${file.name}" non è un'immagine valida`);
        }
        return isImage;
      });

      // create image objects with URL for preview
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImages.value.push({
            file: file,
            name: file.name,
            url: e.target.result,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      });

      // reset the input to allow selecting the same file again
      event.target.value = "";
    };

    const removeImage = (index) => {
      selectedImages.value.splice(index, 1);
    };

    const clearSelection = () => {
      selectedImages.value = [];
    };

    const uploadImages = async () => {
      if (selectedImages.value.length === 0) return;

      isUploading.value = true;

      try {
        // upload images to the store
        await store.dispatch("uploadPhotos", selectedImages.value);

        // reset the selection
        selectedImages.value = [];

        // redirect to the Gallery
        router.push("/");
      } catch (error) {
        console.error("Errore durante l'upload:", error);
        alert("Errore durante il caricamento delle immagini. Riprova.");
      } finally {
        isUploading.value = false;
      }
    };

    return {
      selectedImages,
      isUploading,
      isLoading,
      handleFileSelect,
      removeImage,
      clearSelection,
      uploadImages,
    };
  },
};
</script>
