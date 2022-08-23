import { createRouter, createWebHistory } from "vue-router";
import Game from "../views/Game.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Game",
      component: Game,
    },
    {
      path: "/developer",
      name: "developer",
      children: [
        {
          path: "dialogue",
          name: "developer.dialogue",
          component: () => import("@/views/Developer/Developer.vue"),
        }
      ]
    }
  ],
});

export default router;
