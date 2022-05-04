import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('/src/layout/Layout.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('/src/views/home.vue'),
            },
            {
                path: 'marketing',
                name: 'Marketing',
                component: () => import('/src/views/marketing.vue'),
            },
            {
                path: 'finance',
                name: 'Finance',
                component: () => import('/src/views/finance.vue'),
            },
            // {
            //   path: "",
            //   redirect: "/planning/visual-planner",
            // },
            //   {
            //     path: "/unauthorized/403",
            //     name: "unauthorized",
            //     component: () =>
            //       import(
            //         /*webpackChunkName: "Unauthorized" */ "@/views/Common/Unauthorized.vue"
            //       ),
            //   },
        ],
    },
    {
        path: '/home',
        component: () => import('/src/views/home.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
