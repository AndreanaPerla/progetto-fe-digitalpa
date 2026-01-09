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
      icon: "photo_library",
      submenu: [
        {
          id: "all-photos",
          title: "Tutte le foto",
          path: "/",
        },
        {
          id: "recent",
          title: "Recenti",
          path: "/recent",
        },
        {
          id: "favorites",
          title: "Preferite",
          path: "/favorites",
        },
        {
          id: "albums",
          title: "Album",
          path: "/albums",
        },
        {
          id: "search",
          title: "Cerca",
          path: "/search",
        },
      ],
    },
  },
  {
    path: "/upload",
    name: "Carica Foto",
    component: Upload,
    meta: {
      showInNavbar: true,
      icon: "cloud_upload",
      submenu: [
        {
          id: "upload-single",
          title: "Una o più foto",
          path: "/upload",
        },
        {
          id: "from-camera",
          title: "Da fotocamera",
          path: "/upload/camera",
        },
        {
          id: "from-url",
          title: "Da URL",
          path: "/upload/url",
        },
        {
          id: "bulk-import",
          title: "Importazione bulk",
          path: "/upload/bulk",
        },
      ],
    },
  },
  {
    path: "/recent",
    name: "Recenti",
    component: ComingSoon,
  },
  {
    path: "/favorites",
    name: "Preferite",
    component: ComingSoon,
  },
  {
    path: "/albums",
    name: "Album",
    component: ComingSoon,
  },
  {
    path: "/search",
    name: "Cerca",
    component: ComingSoon,
  },
  {
    path: "/upload/camera",
    name: "Da fotocamera",
    component: ComingSoon,
  },
  {
    path: "/upload/url",
    name: "Da URL",
    component: ComingSoon,
  },
  {
    path: "/upload/bulk",
    name: "Importazione bulk",
    component: ComingSoon,
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
