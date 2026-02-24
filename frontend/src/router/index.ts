import { createRouter, createWebHistory } from 'vue-router'
import { useContractResultsStore } from '@/stores/useContractResultsStore'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/pages/Home.vue')
		},
		{
			path: '/initiate-exchange',
			component: () => import('@/pages/InitiateExchange.vue'),
			meta: {
				next: '/dtcc-results'
			}
		},
		{
			path: '/dtcc-results',
			component: () => import('@/pages/DtccResults.vue'),
			meta: {
				next: '/carrier-results',
				previous: '/initiate-exchange'
			},
			beforeEnter: async () => {
				const contractResultsStore = useContractResultsStore()
				await contractResultsStore.initiateDtccSearch()
			}
		},
		{
			path: '/carrier-results',
			component: () => import('@/pages/CarrierResults.vue'),
			meta: {
				previous: '/dtcc-results'
			},
			beforeEnter: async () => {
				const contractResultsStore = useContractResultsStore()
				await contractResultsStore.initiateCarrierSearch()
			}
		}
	],
})

export default router
