import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import ViewPerson from '@/views/ViewPerson.vue'
import About from "@/views/About.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/person/:person_id', 
        component: ViewPerson, 
        props: true,
    },
    {path: '/about', component: About}
]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router