'use server'

import { Todo, TodoDescription, TodoId, TodoTitle } from '@/entity';
import { IActionTodoDto, ICreateTodoDto, IGetTodoDto, TodoController, TodoDto } from '@/interface'
// import { InitScenario, InitWebCommand } from '@panda-project/use-case'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
// import { z } from 'zod'

export const findTodo = async (id: string) => {
	const todoController = new TodoController();
	try {
		const todo: IGetTodoDto = await todoController.find(new TodoId(id))
		return {
			error: null,
			data: todo,
		}
	} catch (err: any) {
		return {
			error: err.message as string,
			data: null
		}
	}
}

export const createTodo = async (_: any, formData: FormData) => {
	const title = formData.get("create-todo-title") as string;
	const description = formData.get("create-todo-description") as string;
	try {
		const todoController = new TodoController();
		const todo = new Todo(new TodoId(null), new TodoTitle(title), new TodoDescription(description));
		const result = await todoController.create(todo)
		// revalidatePath("/")
		return {
			error: null,
			data: result
		}
	} catch (err: any) {
		console.error(`todoTitle: ${title}, todoDescription: ${description}`)
		console.error(err) // クライアント側のバリデーションなので、実際は必要ない
		return {
			error: err.message as string,
			data: null,
		}
	}
}

export const deleteTodo = async (id: string) => {
	try {
	  // APIリクエストを想定
	// const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
	const todoController = new TodoController();
	const result = await todoController.delete(new TodoId(id))
	  return {
		error: null,
		data: result
	  };
	} catch (err: any) {
		return {
			error: err.message as string,
			data: null
		}
	}
  };

  export const findAllTodo = async () => {
	try {
	  // APIリクエストを想定
	//   const response = await fetch('/api/todos');
	const todoController = new TodoController();
	const result = await todoController.findAll();
	return {
		error: null,
		data: result
	}
	} catch (err: any) {
		return {
			error: err.message as string,
			data: null
		}
	}
  };

  export const updateTodo = async (_: any, formData: FormData) => {
	console.log(formData)
	const id = formData.get("update-todo-id") as string;
	const title = formData.get("update-todo-title") as string;
	const description = formData.get("update-todo-description") as string;
	console.log(id, title, description)
	try {
		const todoController = new TodoController();
		const todo = new Todo(new TodoId(id), new TodoTitle(title), new TodoDescription(description));
		const result = await todoController.update(todo)
		// revalidatePath("/")
		return {
			error: null,
			data: result
		}
	} catch (err: any) {
		console.error(err) // クライアント側のバリデーションなので、実際は必要ない
		return {
			error: err.message as string,
			data: null,
		}
	}
  };