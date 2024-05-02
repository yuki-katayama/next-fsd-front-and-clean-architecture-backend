'use server'

import { Todo, TodoDescription, TodoId, TodoTitle } from '@/entity';
import { ICreateTodoDto, IGetTodoDto, TodoController } from '@/interface'
// import { InitScenario, InitWebCommand } from '@panda-project/use-case'
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";
// import { z } from 'zod'

export const getTodo = async () => {
	const todoController = new TodoController();
	const todo: IGetTodoDto = await todoController.get()
	return todo
}

export const createTodo = async (_: any, formData: FormData) => {
	const title = formData.get("todo-title");
	const description = formData.get("todo-description");
	try {
		const todoController = new TodoController();
		const todo = new Todo(new TodoId(null), new TodoTitle(title), new TodoDescription(description));
		const result = await todoController.create(todo)
		revalidatePath("/")
		return {
			errors: null,
			data: result
		}
	} catch (err) {
		return {
			errors: err,
			data: null,
		}
	}
}

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
