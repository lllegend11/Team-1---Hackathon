<script setup lang="ts">
import { FwbButton } from 'flowbite-vue';
import { useRoute } from 'vue-router';
import AppLoader from '@/components/AppLoader.vue';
import { useLoaderStore } from './stores/useLoaderStore';

const route = useRoute()
</script>

<template>
	<AppLoader />
	<div class="flex flex-col h-screen">
		<div class="flex flex-wrap w-full *:p-2 grow overflow-auto p-10">
			<RouterView v-slot="{ Component }">
				<Transition name="fade">
					<component :is="Component"/>
				</Transition>
			</RouterView>
		</div>

		<div class="flex w-full gap-4 justify-center items-center p-5">
			<RouterLink
				v-if="route.meta.previous"
				:to="route.meta.previous"
			>
				<FwbButton
					color="default"
				>Back</FwbButton>
			</RouterLink>

			<RouterLink
				v-if="route.meta.next"
				:to="route.meta.next"
			>
				<FwbButton
					color="default"
				>Next</FwbButton>
			</RouterLink>
		</div>
	</div>
</template>
