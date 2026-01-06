<template>
  <div id="app">
    <Navbar />
    <main class="container mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
