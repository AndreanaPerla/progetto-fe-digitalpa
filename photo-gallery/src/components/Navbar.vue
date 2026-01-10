<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="route in navbarRoutes"
        :key="route.name"
        :to="route.path"
        @click="handleRouteClick(route)"
        class="sidebar-link mb-2"
        :class="{ active: isRouteActive(route.path) }"
      >
        <span class="material-icons link-icon">{{ route.icon }}</span>
        <div class="link-text mt-2">{{ route.displayName }}</div>
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const isRouteActive = (routePath) => {
      // if the current route matches the given path
      if (route.path === routePath) {
        return true;
      }
      // if the current route has as parent route the path we are checking
      if (route.meta?.parentRoute === routePath) {
        return true;
      }
      return false;
    };

    const navbarRoutes = computed(() => {
      return router
        .getRoutes()
        .filter((route) => route.meta?.showInNavbar === true)
        .map((route) => ({
          name: route.name,
          path: route.path,
          displayName: route.name,
          icon: route.meta?.icon || "description",
        }));
    });

    const handleRouteClick = (route) => {
      router.push(route.path);
      store.commit("SET_SIDEBAR_OPEN", true);
    };

    return {
      navbarRoutes,
      handleRouteClick,
      isRouteActive,
    };
  },
};
</script>
