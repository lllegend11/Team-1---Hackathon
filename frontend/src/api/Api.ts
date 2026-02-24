import type { Todo } from "@/models/Todo";

export const test = () => fetch('/api/todos')
	.then(response => response.json() as Promise<Todo[]>)
