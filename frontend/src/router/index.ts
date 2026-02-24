import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/pages/Home.vue')
		},
		{
			path: '/initiate-exchange',
			component: () => import('@/pages/InitiateExchange.vue')
		},
		{
			path: '/carrier-admin',
			component: () => import('@/pages/carrier/CarrierAdmin.vue')
		},
		{
			path: '/carrier-admin/:carrier',
			component: () => import('@/pages/carrier/CarrierAdmin.vue')
		}
	],
})

export default router
