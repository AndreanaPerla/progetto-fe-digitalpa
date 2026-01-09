<template>
  <div id="app-main">
    <div class="app-top"></div>
    <Navbar />
    <main class="main-content">
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
