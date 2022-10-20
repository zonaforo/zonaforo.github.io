import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Thread from "../views/Thread.vue"
import Users from "../views/Users.vue"

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
  },{
    path: "/users",
    name: "Usuarios",
    component: Users
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;