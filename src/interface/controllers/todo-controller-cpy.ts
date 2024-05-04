import { Todo, TodoId } from "@/entity";
import { TodoRepository } from "../gateways/lowdb";
import { ICreateTodoDto, IDeleteTodoDto, ITodoDto, ITodoPresenterDto, IUpdateTodoDto, TodoDto } from "../presenters";
import { ITodoUsecase, TodoUsecase } from "@/application";

export class TodoController {
	constructor(
		private readonly todoDto: ITodoDto = new TodoDto(),
		private readonly todoUsecase: ITodoUsecase = new TodoUsecase()
	) {}
	public async find(id: TodoId): Promise<ITodoPresenterDto>{
		id.nullValidate()
		const result = await this.todoUsecase.getTodo(id)
		return this.todoDto.todoToITodoPresenterDtoMapper(result)
	}
	public async findAll() {
		const result = await this.todoUsecase.getTodoList()
		return this.todoDto.todoToITodoPresenterDtoArrayMapper(result)
	}
	public async create(todo: Todo): Promise<ITodoPresenterDto> {
		if (todo.id !== null) {
			throw new Error("既に存在するtodoです")
		}
		const result = await this.todoUsecase.createTodo(todo)
		return this.todoDto.todoToITodoPresenterDtoMapper(result)
	}
	public async delete(id: TodoId): Promise<ITodoPresenterDto> {
		id.nullValidate()
		const result = await this.todoUsecase.deleteTodo(id)
		return this.todoDto.todoToITodoPresenterDtoMapper(result);
	}
	public async update(todo: Todo): Promise<ITodoPresenterDto> {
		todo.idObject.nullValidate();
		const result = await this.todoUsecase.updateTodo(todo)
		return this.todoDto.todoToITodoPresenterDtoMapper(result);
	}
}