<template>
  <div class="page-header" :class="{ 'with-sidebar': isSidebarOpen }">
    <div class="header-content">
      <div class="title-section">
        <div class="title-row">
          <button
            v-if="showSidebarToggle"
            @click="toggleSidebar"
            class="sidebar-toggle-btn"
            :class="{ active: isSidebarOpen }"
          >
            <span class="material-icons">{{
              isSidebarOpen
                ? "keyboard_double_arrow_left"
                : "keyboard_double_arrow_right"
            }}</span>
          </button>
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <nav class="breadcrumb" v-if="breadcrumbItems.length > 0">
          <!-- clock as first element -->
          <span class="breadcrumb-item">
            <span class="material-icons breadcrumb-clock">schedule</span>
            <span class="breadcrumb-separator mx-1">
              <span class="material-icons">chevron_right</span>
            </span>
          </span>

          <!-- rest of breadcrumb items -->
          <span
            class="breadcrumb-item"
            v-for="(item, index) in breadcrumbItems"
            :key="index"
          >
            <router-link
              v-if="item.path && index < breadcrumbItems.length - 1"
              :to="item.path"
              class="breadcrumb-link"
            >
              {{ item.name }}
            </router-link>
            <span v-else class="breadcrumb-current">{{ item.name }}</span>
            <span
              v-if="index < breadcrumbItems.length - 1"
              class="breadcrumb-separator mx-1"
            >
              <span class="material-icons">chevron_right</span>
            </span>
          </span>
        </nav>
      </div>

      <!-- btn -->
      <div class="header-actions">
        <button @click="handleNewClick" class="new-btn">
          <span class="material-icons">add</span>
          Nuovo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "PageHeader",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const isSidebarOpen = computed(() => store.state.sidebarOpen);

    const showSidebarToggle = computed(() => {
      // Nascondi il bottone sidebar per route che non hanno submenu
      return route.name !== 'PhotoDetail';
    });

    const toggleSidebar = () => {
      store.commit("SET_SIDEBAR_OPEN", !store.state.sidebarOpen);
    };

    const handleNewClick = () => {
      console.log("Bottone + Nuovo cliccato!");
    };

    const pageTitle = computed(() => {
      return route.name || "Pagina";
    });

    const breadcrumbItems = computed(() => {
      const items = [];

      // if we have a parentRoute, add it first
      if (route.meta?.parentRoute) {
        const parentRoute = router
          .getRoutes()
          .find((r) => r.path === route.meta.parentRoute);
        if (parentRoute) {
          items.push({
            name: parentRoute.name,
            path: parentRoute.path,
          });
        }
      }

      // always add the current route as the last item
      items.push({
        name: route.name,
        path: null, // null to indicate that it is the current page
      });

      return items;
    });

    return {
      pageTitle,
      breadcrumbItems,
      isSidebarOpen,
      showSidebarToggle,
      toggleSidebar,
      handleNewClick,
    };
  },
};
</script>
