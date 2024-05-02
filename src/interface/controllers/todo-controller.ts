import { ITodoRepository, Todo, TodoDescription, TodoId, TodoTitle } from "@/entity";
import { TodoRepository } from "../gateways/lowdb";
import { ICreateTodoDto, IDeleteTodoDto, IGetTodoDto, ITodoDto, IUpdateTodoDto, TodoDto } from "../presenters";
import { dbFileExists } from "@/infrastructure";
import { ITodoUsecase, TodoUsecase } from "@/application";

export class TodoController {
	constructor(
		private readonly todoDto: ITodoDto = new TodoDto(),
		private readonly todoUsecase: ITodoUsecase = new TodoUsecase(new TodoRepository())
	) {}
	public async find(id: TodoId): Promise<IGetTodoDto>{
		id.nullValidate()
		const result = await this.todoUsecase.getTodo(id)
		return this.todoDto.todoToIGetTodoDtoMapper(result)
	}
	public async findAll() {
		const result = await this.todoUsecase.getTodoList()
		return this.todoDto.todosToIGetTodoDtoArrayMapper(result)
	}
	public async create(todo: Todo): Promise<ICreateTodoDto> {
		const result = await this.todoUsecase.createTodo(todo)
		return this.todoDto.todoToICreateTodoDtoMapper(result)
	}
	public async delete(id: TodoId): Promise<IDeleteTodoDto> {
		const result = await this.todoUsecase.deleteTodo(id)
		return this.todoDto.todoToIDeleteTodoDtoMapper(result);
	}
	public async update(todo: Todo): Promise<IUpdateTodoDto> {
		todo.idObject.nullValidate();
		const result = await this.todoUsecase.updateTodo(todo)
		return this.todoDto.todoToIUpdateTodoDtoMapper(result);
	}
}