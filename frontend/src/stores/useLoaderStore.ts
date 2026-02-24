import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
	const isOpen = ref(false)
	const message = ref('')

	function open(loadingMessage: string = 'Loading...') {
		message.value = loadingMessage
		isOpen.value = true
	}

	function close() {
		isOpen.value = false
		message.value = ''
	}

	return {
		isOpen,
		message,
		open,
		close
	}
})
