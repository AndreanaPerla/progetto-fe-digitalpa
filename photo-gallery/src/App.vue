<template>
  <div id="app-main">
    <div class="app-top"></div>
    <Navbar />
    <main class="main-content" :class="{ 'with-submenu': isSubmenuOpen }">
      <RouterView />
    </main>
    <LateralSidebar />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Navbar from "./components/Navbar.vue";
import LateralSidebar from "./components/LateralSidebar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    LateralSidebar,
  },
  setup() {
    const store = useStore();

    const isSubmenuOpen = computed(() => store.state.sidebarOpen);

    return {
      isSubmenuOpen,
    };
  },
};
</script>
