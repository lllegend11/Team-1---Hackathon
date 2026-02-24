<script setup lang="ts">


</script>

<template>
	<div class="flex flex-col h-screen">
		<!-- <div class="flex items-center justify-center w-full p-4">
			<FwbToggle label="Toggle Dark Mode" :model-value="isDark" @update:model-value="toggleDark"/>
		</div> -->
		<div class="flex flex-wrap w-full *:p-2 grow overflow-auto p-10">
			<RouterView v-slot="{ Component }">
				<Transition name="fade">
					<component :is="Component"/>
				</Transition>
			</RouterView>
		</div>
	</div>
</template>
