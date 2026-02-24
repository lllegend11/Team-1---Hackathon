<script setup lang="ts">
import { FwbCard, FwbToggle } from 'flowbite-vue'
import { test } from '@/api/Api';
import { ref } from 'vue';
import type { Todo } from '@/models/Todo';
import { useDark, useToggle } from '@vueuse/core'

const todos = ref<Todo[]>([])
test().then(res => todos.value = res)

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
	<div class="flex flex-col h-screen">
		<div class="flex items-center justify-center w-full p-4">
			<h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
				Todos
			</h5>
		</div>
		<div class="flex items-center justify-center w-full p-4">
			<FwbToggle label="Toggle Dark Mode" :model-value="isDark" @update:model-value="toggleDark"/>
		</div>
		<div class="flex flex-wrap w-full *:p-2 grow overflow-auto">
			<div
				v-for="todo in todos"
				:key="todo.id"
				class="w-1/4"
			>
				<FwbCard>
					<div class="p-5">
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{{ todo.title }}
						</h5>
						<p class="font-normal text-gray-700 dark:text-gray-400">
							{{ todo.title }}
						</p>
					</div>
				</FwbCard>
			</div>
		</div>
	</div>
</template>
