<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">
      Benvenuto nella Photo Gallery
    </h1>
    <p class="text-lg text-gray-600 mb-8">
      Esplora la nostra collezione di fotografie straordinarie
    </p>
    <router-link
      to="/gallery"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
    >
      Visualizza Gallery
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
  setup() {
    return {};
  },
};
</script>
