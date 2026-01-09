import { createRouter, createWebHistory } from "vue-router";
import Gallery from "../views/Gallery.vue";
import Upload from "../views/Upload.vue";
import PhotoDetail from "../views/PhotoDetail.vue";

const routes = [
  {
    path: "/",
    name: "Galleria",
    component: Gallery,
    meta: {
      showInNavbar: true,
      icon: "photo_library",
    },
  },
  {
    path: "/upload",
    name: "Carica Foto",
    component: Upload,
    meta: {
      showInNavbar: true,
      icon: "cloud_upload",
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
