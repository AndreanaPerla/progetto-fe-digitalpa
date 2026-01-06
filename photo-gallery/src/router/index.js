import { createRouter, createWebHistory } from "vue-router";
import Gallery from "../views/Gallery.vue";
import Upload from "../views/Upload.vue";
import PhotoDetail from "../views/PhotoDetail.vue";

const routes = [
  {
    path: "/",
    name: "Gallery",
    component: Gallery,
    meta: {
      showInNavbar: true,
    },
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      showInNavbar: true,
    },
  },
  {
    path: "/photo/:id",
    name: "PhotoDetail",
    component: PhotoDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
