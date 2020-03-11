import Vue from "vue";
import VueRouter from "vue-router";
import animationPage from "../views/animationPage";
import helpDocument from "../views/helpDocument";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/animationPage"
  },
  {
    path: "/animationPage",
    name: "animationPage",
    component: animationPage
  },
  {
    path: "/helpDocument",
    name: "helpDocument",
    component: helpDocument
  }
];

const router = new VueRouter({
  routes
});

export default router;
