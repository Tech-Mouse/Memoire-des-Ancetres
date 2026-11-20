import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ViewPerson from "@/views/ViewPerson.vue";

const routes = [
  { path: "/", redirect: "/hautier" },
  { path: "/:family_name", component: Home },
  { path: "/person/:person_id", component: ViewPerson, props: true },
];

const router = createRouter({
  history: createWebHistory('/Memoire-des-Ancetres/'),
  routes,
});

export default router;
