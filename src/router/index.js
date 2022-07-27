import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/SingIn.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/SingUp.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/room/:id",
    name: "room",
    component: () => import("../views/room/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
