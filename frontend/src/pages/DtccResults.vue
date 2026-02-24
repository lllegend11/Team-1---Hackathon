<script setup lang="ts">
import { FwbHeading } from 'flowbite-vue';
import ContractResultsTable from '@/components/ContractResultsTable.vue';
import { useContractResultsStore } from '@/stores/useContractResultsStore';

const contractResultsStore = useContractResultsStore()

</script>

<template>
	<div class="w-full">
		<FwbHeading tag="h1" class="text-center mb-4">DTCC Results</FwbHeading>
		<ContractResultsTable :records="contractResultsStore.dtccContractResults" />
	</div>
</template>

