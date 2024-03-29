import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Thread from "../views/Thread.vue"
import Users from "../views/Users.vue"
import User from "../views/User.vue"

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
  },
  {
    path: "/users",
    name: "Usuarios",
    component: Users
  },
  {
    path: "/user/:user",
    name: "Usuario",
    component: User
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;