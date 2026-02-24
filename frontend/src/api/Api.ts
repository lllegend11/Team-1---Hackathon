import type { Todo } from "@/models/Todo";

export const test = () => fetch('/api/todos')
	.then(response => response.json() as Promise<Todo[]>)

export const awsTest = () => fetch('https://zzkvlfofd46tgpmpdpzxy2v2my0crvhs.lambda-url.us-east-1.on.aws/')
	.then(res => res.json())
