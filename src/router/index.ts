import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('/src/layout/Layout.vue'),
        children: [
            {
                path: '',
                redirect: '/marketing',
            },
            {
                path: 'marketing',
                name: 'Marketing',
                component: () => import('/src/pages/marketing.vue'),
            },
            {
                path: 'finance',
                name: 'Finance',
                component: () => import('/src/pages/finance.vue'),
            },
            {
                path: 'personnel',
                name: 'Personnel',
                component: () => import('/src/pages/personnel.vue'),
            },

            {
                path: '/:pathMatch(.*)*',
                name: '404',
                redirect: '/marketing',
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
