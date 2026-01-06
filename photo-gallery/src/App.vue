<template>
  <div id="app">
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Photo Gallery</h1>
        <div class="space-x-4">
          <router-link to="/" class="hover:text-blue-200">Home</router-link>
          <router-link to="/upload" class="hover:text-blue-200"
            >Carica Foto</router-link
          >
        </div>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
