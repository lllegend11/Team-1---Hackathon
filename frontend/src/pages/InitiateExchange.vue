<script setup lang="ts">
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue';
import BarcodeIcon from '@/icons/BarcodeIcon.svg'
import UserIcon from '@/icons/UserIcon.svg'
import ProfileCardIcon from '@/icons/ProfileCardIcon.svg'
import { useContractResultsStore } from '@/stores/useContractResultsStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const contractResultsStore = useContractResultsStore()

const { searchContracts } = storeToRefs(contractResultsStore)

if (searchContracts.value.length === 0) {
	contractResultsStore.addSearchContract()
}
</script>

<template>
	<div class="w-full">
		<FwbHeading tag="h1" class="text-center mb-4">Initiate Broker Dealer Exchange</FwbHeading>

		<div class="p-10 bg-[#f8f8f8] rounded-xl mb-4">
			<div class="flex flex-wrap *:p-4 items-center">
				<div class="w-1/3">
					<FwbInput label="First Name">
						<template #prefix>
							<UserIcon />
						</template>
					</FwbInput>
				</div>

				<div class="w-1/3">
					<FwbInput label="First Name">
						<template #prefix>
							<UserIcon />
						</template>
					</FwbInput>
				</div>

				<div class="w-1/3">
					<FwbInput label="First Name">
						<template #prefix>
							<ProfileCardIcon />
						</template>
					</FwbInput>
				</div>

				<div v-for="contract in searchContracts" :key="contract.id" class="w-1/3">
					<FwbInput v-model="contract.contractNumber" label="Contract Number">
						<template #prefix>
							<BarcodeIcon />
						</template>

						<template #suffix>
							<button></button>
						</template>
					</FwbInput>
				</div>

				<div class="w-1/3">
					<FwbButton color="default" @click="contractResultsStore.addSearchContract">Add Additional Contract</FwbButton>
				</div>
			</div>
		</div>
	</div>
</template>
