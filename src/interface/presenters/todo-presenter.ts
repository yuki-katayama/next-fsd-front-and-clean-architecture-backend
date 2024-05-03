import { Todo } from "@/entity"

export interface IActionTodoDto {
	title: string
	description: string
}
export interface IGetTodoDto extends IActionTodoDto {
	id: string
}

export interface ICreateTodoDto extends IActionTodoDto {
	id: string | null
}

export interface IDeleteTodoDto extends IActionTodoDto {
	id: string
}

export interface IUpdateTodoDto extends IActionTodoDto {
	id: string
}

export interface ITodoDto {
	todoToIGetTodoDtoMapper(todo: Todo): IGetTodoDto;
	todosToIGetTodoDtoArrayMapper(todos: Todo[]): IGetTodoDto[];
	todoToICreateTodoDtoMapper(todo: Todo): ICreateTodoDto;
	todoToIDeleteTodoDtoMapper(todo: Todo): IDeleteTodoDto;
	todoToIUpdateTodoDtoMapper(todo: Todo): IUpdateTodoDto;
}

export class TodoDto implements ITodoDto {
	constructor(){}
	private todoResponse(todo: Todo): IGetTodoDto {
		return {
			id: todo.id as string,
			title: todo.title,
			description: todo.description
		}
	}
	public todoToIGetTodoDtoMapper(todo: Todo): IGetTodoDto {
		return this.todoResponse(todo)
	}
	public todosToIGetTodoDtoArrayMapper(todos: Todo[]): IGetTodoDto[] {
		return todos.map(todo => this.todoResponse(todo))
	}
	public todoToICreateTodoDtoMapper(todo: Todo): ICreateTodoDto {
		return {
			id: todo.id,
			title: todo.title,
			description: todo.description,
		}
	}
	public todoToIDeleteTodoDtoMapper(todo: Todo): IDeleteTodoDto {
		return this.todoResponse(todo)
	}
	public todoToIUpdateTodoDtoMapper(todo: Todo): IUpdateTodoDto {
		return this.todoResponse(todo)
	}
}