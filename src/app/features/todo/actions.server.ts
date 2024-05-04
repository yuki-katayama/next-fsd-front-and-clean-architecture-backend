'use server'

import { Todo, TodoDescription, TodoId, TodoTitle } from '@/entity';
import { IActionTodoDto, ICreateTodoDto, ITodoPresenterDto, TodoController } from '@/interface'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
import { generateClient } from 'aws-amplify/api';
import { TodoRepository } from '@/interface/gateways/lowdb';
import { TodoUsecase } from '@/application';

const todoRepository = new TodoRepository()
const todoUsecase = new TodoUsecase(todoRepository);
const todoController = new TodoController(todoUsecase);


export interface ITodoPresenterDtoAndError {
	data: ITodoPresenterDto[];
	error: null | string | string[];
}

export const findTodo = async (id: string) => {
	try {
		const todo: ITodoPresenterDto = await todoController.find(new TodoId(id))
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
	const title = formData.get("create-todo-title")?.toString() ?? '';
	const description = formData.get("create-todo-description")?.toString() ?? '';
	try {
		const todo = new Todo(new TodoId(null), new TodoTitle(title), new TodoDescription(description));
		const result = await todoController.create(todo)
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
}

export const deleteTodo = async (id: string) => {
	try {
	  // APIリクエストを想定
	// const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
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
	const result = await todoController.findAll();
	return {
		error: null,
		data: result
	}
	} catch (err: any) {
		if(Array.isArray(err.message)) {
			return {
				error: err.message.map((message: {message: string}) => message.message) as string[],
				data: null
			}
		}
		return {
			error: err.message as string,
			data: null
		}
	}
  };

  export const updateTodo = async (_: any, formData: FormData) => {
	const id = formData.get("update-todo-id") as string;
	const title = formData.get("update-todo-title") as string;
	const description = formData.get("update-todo-description") as string;
	try {
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