import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('/src/layout/Layout.vue'),
        children: [
            {
                path: '',
                redirect: '/tab',
            },

            // dynamic route

            {
                path: '/:tab',
                name: 'tab',
                component: () => import('/src/pages/tab.vue'),
            },

            // Below, we can find alternate way of doing this, however then the routes will be tightly coupled with the UI.

            // {
            //     path: 'marketing',
            //     name: 'Marketing',
            //     component: () => import('/src/pages/marketing.vue'),
            // },
            // {
            //     path: 'finance',
            //     name: 'Finance',
            //     component: () => import('/src/pages/finance.vue'),
            // },
            // {
            //     path: 'personnel',
            //     name: 'Personnel',
            //     component: () => import('/src/pages/personnel.vue'),
            // },
            // {
            //     path: '/:pathMatch(.*)*',
            //     name: '404',
            //     redirect: '/marketing',
            // },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    // Navigation Guards. Here not adding any code. In a big project, navigation guards are important.
    // more at https://router.vuejs.org/guide/advanced/navigation-guards.html
    return true
})

export default router
