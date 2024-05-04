import { Todo } from "@/entity"

export interface IActionTodoDto {
	title: string
	description: string
}

export interface ITodoPresenterDto extends IActionTodoDto {
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

export interface ITodoPresenter {
	todoToITodoPresenterDtoMapper(todo: Todo): ITodoPresenterDto;
	todoToITodoPresenterDtoArrayMapper(todos: Todo[]): ITodoPresenterDto[];
}

export class TodoPresenter implements ITodoPresenter {
	constructor(){}
	private todoToITodoMapper(todo: Todo): ITodoPresenterDto {
		return {
			id: todo.id as string,
			title: todo.title,
			description: todo.description
		}
	}
	public todoToITodoPresenterDtoMapper(todo: Todo): ITodoPresenterDto {
		return this.todoToITodoMapper(todo)
	}
	public todoToITodoPresenterDtoArrayMapper(todos: Todo[]): ITodoPresenterDto[] {
		return todos.map(todo => this.todoToITodoMapper(todo))
	}
}