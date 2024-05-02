'use server'

import { Todo, TodoDescription, TodoId, TodoTitle } from '@/entity';
import { ICreateTodoDto, IGetTodoDto, TodoController } from '@/interface'
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
	const title = formData.get("todo-title") as string;
	const description = formData.get("todo-description") as string;
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
	const id = formData.get("todo-id") as string;
	const title = formData.get("todo-title") as string;
	const description = formData.get("todo-description") as string;
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

// export const getTodo = async (prevState: any, formData: FormData) => {
// //   const validation = z
// //     .string()
// //     .min(1, '1文字以上入力してください')
// //     .max(30, '30文字以下で入力してください')
// //     .regex(/^[a-zA-Z0-9_-]*$/, '半角英数字と-_のみ使えます')
// //   const schema = z.object({
// //     productName: validation,
// //     projectName: validation,
// //   })

// //   const todoTitle = formData.get('todo-title')

//   try {
//     const parsed = schema.parse({ todoTitle })
// 	const controller = new TodoController()
// 	const todo: IGetTodoDto  = controller.get()
//   } catch (e) {
//     if (e instanceof z.ZodError) {
//       return {
//         errors: {
//           ...e.formErrors.fieldErrors,
//         },
//       }
//     }

//     return {
//       errors: e instanceof Error ? [e.message] : [],
//     }
//   }

//   redirect(`/employees`)
// }
