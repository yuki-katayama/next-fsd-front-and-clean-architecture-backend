import { Todo } from "@/entity"

export interface IActionTodoDto {
	title: string
	description: string
}

export interface ITodoResponseDto extends IActionTodoDto {
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
	todoToITodoResponseDtoMapper(todo: Todo): ITodoResponseDto;
	todoToITodoResponseDtoArrayMapper(todos: Todo[]): ITodoResponseDto[];
	todoToICreateTodoDtoMapper(todo: Todo): ICreateTodoDto;
	todoToIDeleteTodoDtoMapper(todo: Todo): IDeleteTodoDto;
	todoToIUpdateTodoDtoMapper(todo: Todo): IUpdateTodoDto;
}

export class TodoDto implements ITodoDto {
	constructor(){}
	private todoResponse(todo: Todo): ITodoResponseDto {
		return {
			id: todo.id as string,
			title: todo.title,
			description: todo.description
		}
	}
	public todoToITodoResponseDtoMapper(todo: Todo): ITodoResponseDto {
		return this.todoResponse(todo)
	}
	public todoToITodoResponseDtoArrayMapper(todos: Todo[]): ITodoResponseDto[] {
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