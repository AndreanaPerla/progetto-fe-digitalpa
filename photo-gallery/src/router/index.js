import { createRouter, createWebHistory } from "vue-router";
import Gallery from "../views/Gallery.vue";
import Upload from "../views/Upload.vue";
import PhotoDetail from "../views/PhotoDetail.vue";
import ComingSoon from "../views/ComingSoon.vue";

const routes = [
  {
    path: "/",
    name: "Galleria",
    component: Gallery,
    meta: {
      showInNavbar: true,
      showInSidebar: true,
      icon: "photo_library",
    },
  },
  {
    path: "/upload",
    name: "Carica Foto",
    component: Upload,
    meta: {
      showInNavbar: true,
      showInSidebar: true,
      icon: "cloud_upload",
    },
  },
  {
    path: "/recent",
    name: "Recenti",
    component: ComingSoon,
    meta: {
      parentRoute: "/",
      showInSidebar: true,
    },
  },
  {
    path: "/favorites",
    name: "Preferite",
    component: ComingSoon,
    meta: {
      parentRoute: "/",
      showInSidebar: true,
    },
  },
  {
    path: "/albums",
    name: "Album",
    component: ComingSoon,
    meta: {
      parentRoute: "/",
      showInSidebar: true,
    },
  },
  {
    path: "/search",
    name: "Cerca",
    component: ComingSoon,
    meta: {
      parentRoute: "/",
      showInSidebar: true,
    },
  },
  {
    path: "/upload/camera",
    name: "Da fotocamera",
    component: ComingSoon,
    meta: {
      parentRoute: "/upload",
      showInSidebar: true,
    },
  },
  {
    path: "/upload/url",
    name: "Da URL",
    component: ComingSoon,
    meta: {
      parentRoute: "/upload",
      showInSidebar: true,
    },
  },
  {
    path: "/upload/bulk",
    name: "Importazione bulk",
    component: ComingSoon,
    meta: {
      parentRoute: "/upload",
      showInSidebar: true,
    },
  },
  {
    path: "/photo/:id",
    name: "PhotoDetail",
    component: PhotoDetail,
    meta: {
      showInNavbar: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
