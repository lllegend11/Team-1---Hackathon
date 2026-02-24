import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ContractStatus, type ContractRecord } from '@/models/ContractRecord'
import { useLoaderStore } from '@/stores/useLoaderStore'

export const useContractResultsStore = defineStore('contractResults', () => {
	const searchContracts = ref<ContractRecord[]>([])
	const dtccContractResults = ref<ContractRecord[]>([])
	const carrierContractResults = ref<ContractRecord[]>([])

	function resetSearchContracts() {
		searchContracts.value = []
	}

	function resetDtccContractResults() {
		dtccContractResults.value = []
	}

	function resetCarrierContractResults() {
		carrierContractResults.value = []
	}

	function resetAll() {
		resetSearchContracts()
		resetDtccContractResults()
		resetCarrierContractResults()
	}

	function createEmptyContract(): ContractRecord {
		return {
			id: crypto.randomUUID(),
			carrierName: '',
			productName: '',
			contractNumber: '',
			cusipNumber: '',
			ownership: '',
			trailing: false,
			withdrawalProgram: false,
			contractStatus: ContractStatus.Active
		}
	}

	function addSearchContract() {
		searchContracts.value.push(createEmptyContract())
	}

	function removeSearchContract(id: string | number) {
		if (searchContracts.value.length < 2) return
		searchContracts.value = searchContracts.value.filter(c => c.id !== id)
	}

	async function initiateDtccSearch(): Promise<void> {
		const loaderStore = useLoaderStore()
		loaderStore.open('Searching DTCC contracts...')

		// Mock API call - replace with actual API call later
		await new Promise(resolve => setTimeout(resolve, 1000))

		dtccContractResults.value = [
			{
				id: 1,
				carrierName: 'Prudential',
				productName: 'Variable Annuity Plus',
				contractNumber: 'PRU-2024-001234',
				cusipNumber: '743315AC5',
				ownership: 'Individual',
				trailing: true,
				withdrawalProgram: true,
				contractStatus: ContractStatus.Active,
				dtccResolved: true
			},
			{
				id: 2,
				carrierName: 'Lincoln Financial',
				productName: 'ChoicePlus Assurance',
				contractNumber: 'LNC-2023-005678',
				cusipNumber: '534187BK2',
				ownership: 'Joint',
				trailing: false,
				withdrawalProgram: true,
				contractStatus: ContractStatus.ActiveRestricted,
				dtccResolved: false
			},
			{
				id: 3,
				carrierName: '',
				productName: '',
				contractNumber: 'JNL-2022-009012',
				cusipNumber: '',
				ownership: '',
				trailing: true,
				withdrawalProgram: true,
				contractStatus: ContractStatus.Inactive,
				dtccResolved: false
			}
		]

		loaderStore.close()
	}

	async function initiateCarrierSearch(): Promise<void> {
		const loaderStore = useLoaderStore()
		loaderStore.open('Searching carrier contracts...')

		// Mock API call - replace with actual API call later
		await new Promise(resolve => setTimeout(resolve, 1000))

		carrierContractResults.value = [
			{
				id: 4,
				carrierName: 'Nationwide',
				productName: 'Destination Navigator',
				contractNumber: 'NW-2024-003456',
				cusipNumber: '638671AR4',
				ownership: 'Trust',
				trailing: false,
				withdrawalProgram: false,
				contractStatus: ContractStatus.ProprietaryProduct
			},
			{
				id: 5,
				carrierName: 'Transamerica',
				productName: 'Secure Foundation',
				contractNumber: 'TA-2021-007890',
				cusipNumber: '893574BC1',
				ownership: 'Individual',
				trailing: true,
				withdrawalProgram: true,
				contractStatus: ContractStatus.Active
			}
		]

		loaderStore.close()
	}

	return {
		searchContracts,
		dtccContractResults,
		carrierContractResults,
		resetSearchContracts,
		resetDtccContractResults,
		resetCarrierContractResults,
		resetAll,
		createEmptyContract,
		addSearchContract,
		removeSearchContract,
		initiateDtccSearch,
		initiateCarrierSearch
	}
})
