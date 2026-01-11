<template>
  <aside class="submenu-sidebar" :class="{ 'is-open': isOpen }">
    <div class="submenu-header">
      <h3 class="submenu-title mb-1">{{ sidebarTitle }}</h3>
    </div>
    <nav class="submenu-nav">
      <router-link
        v-for="item in sidebarItems"
        :key="item.id"
        :to="item.path"
        @click="closeSidebar"
        class="submenu-link"
        :class="{ active: $route.path === item.path }"
      >
        <span class="submenu-text">{{ item.title }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "LateralSidebar",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isOpen = computed(() => store.state.sidebarOpen);

    const sidebarItems = computed(() => {
      let targetPath;

      // check if the current route has a parentRoute meta field
      if (route.meta?.parentRoute) {
        targetPath = route.meta.parentRoute;
      } else {
        targetPath = route.path;
      }

      // get all routes
      const allRoutes = router.getRoutes();

      // first add the main route if it has showInSidebar
      const mainRoute = allRoutes.find((r) => r.path === targetPath);
      const items = [];

      if (mainRoute?.meta?.showInSidebar) {
        items.push({
          id: `main-${mainRoute.path.replace("/", "") || "home"}`,
          title: mainRoute.name,
          path: mainRoute.path,
        });
      }

      // then add all child routes that have this path as parent
      const childRoutes = allRoutes
        .filter(
          (r) => r.meta?.parentRoute === targetPath && r.meta?.showInSidebar
        )
        .map((r) => ({
          id: r.path.replace(/\//g, "-") || r.name,
          title: r.name,
          path: r.path,
        }));

      return [...items, ...childRoutes];
    });

    const sidebarTitle = computed(() => {
      // if the current route has a parent, show the parent route name
      if (route.meta?.parentRoute) {
        const parentRoute = router
          .getRoutes()
          .find((r) => r.path === route.meta.parentRoute);
        return parentRoute?.name || route.name;
      }

      // otherwise show the current route name
      return route.name;
    });

    const closeSidebar = () => {
      store.commit("SET_SIDEBAR_OPEN", false);
    };

    const handleItemClick = (item) => {
      if (item.action) {
        item.action();
      }
    };

    return {
      isOpen,
      sidebarItems,
      sidebarTitle,
      closeSidebar,
      handleItemClick,
    };
  },
};
</script>
