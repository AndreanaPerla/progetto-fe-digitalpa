<template>
  <transition name="submenu-slide">
    <aside v-if="isOpen" class="submenu-sidebar">
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
  </transition>
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
      const currentRoute = router
        .getRoutes()
        .find((r) => r.path === route.path);
      return currentRoute?.meta?.submenu || [];
    });

    const sidebarTitle = computed(() => {
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
