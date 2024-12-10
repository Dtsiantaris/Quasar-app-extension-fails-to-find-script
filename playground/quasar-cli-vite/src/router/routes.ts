import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    name: "mainLayout",
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "Home Page",
      },
     
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
