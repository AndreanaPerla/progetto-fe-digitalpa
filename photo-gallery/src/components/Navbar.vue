<template>
  <nav class="bg-blue-600 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Photo Gallery</h1>
      <div class="space-x-4">
        <router-link
          v-for="route in navbarRoutes"
          :key="route.name"
          :to="route.path"
          class="hover:text-blue-200"
        >
          {{ route.displayName }}
        </router-link>
      </div>
    </div>
  </nav>
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
        }));
    });

    return {
      navbarRoutes,
    };
  },
};
</script>
