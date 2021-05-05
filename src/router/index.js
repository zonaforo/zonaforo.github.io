import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Thread from "../views/Thread.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/thread/:thread/:page",
    name: "Hilo",
    component: Thread
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;