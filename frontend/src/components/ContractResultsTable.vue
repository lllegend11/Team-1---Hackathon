<script setup lang="ts">
import { ref, computed } from 'vue'
import { FwbCheckbox, FwbBadge, FwbButton } from 'flowbite-vue'
import SortIcon from '@/icons/SortIcon.svg'
import { ContractStatus, type ContractRecord } from '@/models/ContractRecord'

type SortableColumn = keyof Omit<ContractRecord, 'id'>
type SortDirection = 'asc' | 'desc'

const props = defineProps<{
	records: ContractRecord[]
}>()

const selectedRecords = defineModel<ContractRecord[]>('selectedRecords', { default: [] })

const sortColumn = ref<SortableColumn | null>(null)
const sortDirection = ref<SortDirection>('asc')

function toggleSort(column: SortableColumn) {
	if (sortColumn.value === column) {
		sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
	} else {
		sortColumn.value = column
		sortDirection.value = 'asc'
	}
}

const sortedRecords = computed(() => {
	if (!sortColumn.value) return props.records

	return [...props.records].sort((a, b) => {
		const aVal = a[sortColumn.value!]
		const bVal = b[sortColumn.value!]
		const comparison = String(aVal).localeCompare(String(bVal))
		return sortDirection.value === 'asc' ? comparison : -comparison
	})
})

const allSelected = computed(() => {
	return props.records.length > 0 && selectedRecords.value.length === props.records.length
})

const someSelected = computed(() => {
	return selectedRecords.value.length > 0 && selectedRecords.value.length < props.records.length
})

function toggleSelectAll() {
	if (allSelected.value) {
		selectedRecords.value = []
	} else {
		selectedRecords.value = [...props.records]
	}
}

function isSelected(record: ContractRecord) {
	return selectedRecords.value.some(r => r.id === record.id)
}

function toggleSelect(record: ContractRecord) {
	if (isSelected(record)) {
		selectedRecords.value = selectedRecords.value.filter(r => r.id !== record.id)
	} else {
		selectedRecords.value = [...selectedRecords.value, record]
	}
}

function getStatusBadgeType(status: ContractStatus): 'green' | 'yellow' | 'red' {
	if (status === ContractStatus.Active) return 'green'
	if (status === ContractStatus.ActiveRestricted) return 'yellow'
	return 'red'
}
</script>

<template>
	<div class="bg-[#f8f8f8] rounded-xl">
		<p class="justify-center text-gray-900 text-sm font-bold p-4">Contracts</p>

		<div class="relative overflow-x-auto">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t-gray-300 border-t">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							<FwbCheckbox
								:model-value="allSelected"
								:indeterminate="someSelected"
								@update:model-value="toggleSelectAll"
							/>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Carrier Name
								<button type="button" @click="toggleSort('carrierName')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Product Name
								<button type="button" @click="toggleSort('productName')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Contract #
								<button type="button" @click="toggleSort('contractNumber')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Ownership
								<button type="button" @click="toggleSort('ownership')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Trailing?
								<button type="button" @click="toggleSort('trailing')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Withdrawal Program
								<button type="button" @click="toggleSort('withdrawalProgram')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<div class="flex items-center">
								Contract Status
								<button type="button" @click="toggleSort('contractStatus')" class="cursor-pointer">
									<SortIcon class="w-3 h-3 ms-1.5" />
								</button>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(record, index) in sortedRecords"
						:key="record.id"
						:class="[
							'bg-[#f8f8f8]',
							index < sortedRecords.length - 1 ? 'border-b dark:border-gray-700 border-gray-200' : ''
						]"
					>
						<td class="px-6 py-4">
							<FwbCheckbox
								:model-value="isSelected(record)"
								@update:model-value="toggleSelect(record)"
							/>
						</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
							{{ record.carrierName }}
						</th>
						<td class="px-6 py-4">
							{{ record.productName }}
						</td>
						<td class="px-6 py-4">
							{{ record.contractNumber }}
						</td>
						<td class="px-6 py-4">
							{{ record.ownership }}
						</td>
						<td class="px-6 py-4">
							{{ record.trailing ? 'Yes' : 'No' }}
						</td>
						<td class="px-6 py-4">
							{{ record.withdrawalProgram ? 'Yes' : 'No' }}
						</td>
						<td class="px-6 py-4">
							<FwbBadge :type="getStatusBadgeType(record.contractStatus)">
								{{ record.contractStatus }}
							</FwbBadge>
						</td>
						<td class="px-6 py-4 text-right">
							<FwbButton v-if="record.contractStatus === ContractStatus.Unappointed" color="default">
								Complete Training
							</FwbButton>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
