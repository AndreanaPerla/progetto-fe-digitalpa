<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="route in navbarRoutes"
        :key="route.name"
        :to="route.path"
        class="sidebar-link mb-2"
        :class="{ active: $route.path === route.path }"
      >
        <span class="material-icons link-icon">{{ route.icon }}</span>
        <div class="link-text mt-2">{{ route.displayName }}</div>
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();

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

    return {
      navbarRoutes,
    };
  },
};
</script>
