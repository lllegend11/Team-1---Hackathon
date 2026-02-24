<script setup lang="ts">
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue';
import BarcodeIcon from '@/icons/BarcodeIcon.svg'
import UserIcon from '@/icons/UserIcon.svg'
import ProfileCardIcon from '@/icons/ProfileCardIcon.svg'

</script>

<template>
	<div class="w-full">
		<FwbHeading tag="h1" class="text-center mb-4">Initiate Broker Dealer Exchange</FwbHeading>

		<div class="p-10 bg-[#f8f8f8] rounded-xl">
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

				<div class="w-1/3">
					<FwbInput label="Contract Number">
						<template #prefix>
							<BarcodeIcon />
						</template>
					</FwbInput>
				</div>

				<div class="w-1/3">
					<FwbButton color="default">Add Additional Contract</FwbButton>
				</div>
			</div>
		</div>
	</div>
</template>
