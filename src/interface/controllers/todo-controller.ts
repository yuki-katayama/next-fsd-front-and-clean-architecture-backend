import { Todo, TodoId } from "@/entity";
import { TodoRepository } from "../gateways/lowdb";
import { ICreateTodoDto, IDeleteTodoDto, ITodoDto, ITodoResponseDto, IUpdateTodoDto, TodoDto } from "../presenters";
import { ITodoUsecase, TodoUsecase } from "@/application";

export class TodoController {
	constructor(
		private readonly todoDto: ITodoDto = new TodoDto(),
		private readonly todoUsecase: ITodoUsecase = new TodoUsecase(new TodoRepository())
	) {}
	public async find(id: TodoId): Promise<ITodoResponseDto>{
		id.nullValidate()
		const result = await this.todoUsecase.getTodo(id)
		return this.todoDto.todoToITodoResponseDtoMapper(result)
	}
	public async findAll() {
		const result = await this.todoUsecase.getTodoList()
		return this.todoDto.todoToITodoResponseDtoArrayMapper(result)
	}
	public async create(todo: Todo): Promise<ITodoResponseDto> {
		if (todo.id !== null) {
			throw new Error("既に存在するtodoです")
		}
		const result = await this.todoUsecase.createTodo(todo)
		return this.todoDto.todoToITodoResponseDtoMapper(result)
	}
	public async delete(id: TodoId): Promise<ITodoResponseDto> {
		id.nullValidate()
		const result = await this.todoUsecase.deleteTodo(id)
		return this.todoDto.todoToITodoResponseDtoMapper(result);
	}
	public async update(todo: Todo): Promise<ITodoResponseDto> {
		todo.idObject.nullValidate();
		const result = await this.todoUsecase.updateTodo(todo)
		return this.todoDto.todoToITodoResponseDtoMapper(result);
	}
}